import React, { useRef, useState, useEffect } from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faRotateLeft } from '@fortawesome/free-solid-svg-icons';
const TamilDrawingApp = () => {
  const [canvases, setCanvases] = useState([
    { id: 1, active: true, dataURL: null, prediction: null }
  ]);
  const [activeCanvasId, setActiveCanvasId] = useState(1);
  const [nextCanvasId, setNextCanvasId] = useState(2);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
  const [combinedPrediction, setCombinedPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [currentLetter, setCurrentLetter] = useState({ transliteration: "a", tamil: "அ" });
  const [gameState, setGameState] = useState({
    score: 0,
    attempts: 0,
    questionIndex: 0,
    totalQuestions: 0
  });
  const [currentLevel, setCurrentLevel] = useState(1);
  const scrollContainerRef = useRef(null);
  const canvasRefs = useRef({});

  // Tamil letters by level
  const levels = [
    {
      name: "Tamil Vowels",
      letters: [
        { transliteration: "a", tamil: "அ" },
        { transliteration: "aa", tamil: "ஆ" },
        { transliteration: "ai", tamil: "ஐ" },
        { transliteration: "o", tamil: "ஒ" },
        { transliteration: "oo", tamil: "ஓ" },
        { transliteration: "au", tamil: "ஔ" }
      ]
    },
    {
      name: "Tamil Consonants",
      letters: [
        { transliteration: "ka", tamil: "க" },
        { transliteration: "nga", tamil: "ங" },
        { transliteration: "cha", tamil: "ச" },
        { transliteration: "nya", tamil: "ஞ" },
        { transliteration: "ṭa", tamil: "ட" },
        { transliteration: "dha", tamil: "த" },
        { transliteration: "pa", tamil: "ப" },
        { transliteration: "ma", tamil: "ம" },
        { transliteration: "ya", tamil: "ய" },
        { transliteration: "va", tamil: "வ" }
      ]
    }
  ];

  // Initialize or change level
  useEffect(() => {
    const levelLetters = [...levels[currentLevel - 1].letters];
    const shuffledLetters = shuffleArray(levelLetters);
    
    setCurrentLetter(shuffledLetters[0]);
    setGameState({
      score: 0,
      attempts: 0,
      questionIndex: 0,
      totalQuestions: shuffledLetters.length
    });
    
    // Reset canvases
    setCanvases([{ id: 1, active: true, dataURL: null, prediction: null }]);
    setActiveCanvasId(1);
    setNextCanvasId(2);
    
    setCombinedPrediction(null);
    setFeedback(null);
  }, [currentLevel]);

  // Function to shuffle an array
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Set up canvas when a new canvas is added
  useEffect(() => {
    canvases.forEach(canvas => {
      const canvasElement = canvasRefs.current[canvas.id];
      if (canvasElement) {
        const ctx = canvasElement.getContext('2d');
        
        // Set canvas styling
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        // Set stroke color based on prediction confidence
        if (canvas.prediction && canvas.prediction.confidence < 20) {
          ctx.strokeStyle = '#ff6b35';
        } else {
          ctx.strokeStyle = '#2c3e50';
        }
        
        // Restore drawing if dataURL exists
        if (canvas.dataURL) {
          const img = new Image();
          img.onload = () => {
            ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
            ctx.drawImage(img, 0, 0);
          };
          img.src = canvas.dataURL;
        } else {
          ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        }
      }
    });
  }, [canvases]);

  // Scroll to make active canvas visible
  useEffect(() => {
    if (scrollContainerRef.current) {
      const activeCanvas = document.querySelector(`.canvas-item[data-id="${activeCanvasId}"]`);
      if (activeCanvas) {
        scrollContainerRef.current.scrollLeft = activeCanvas.offsetLeft - 20;
      }
    }
  }, [activeCanvasId]);

  // Drawing functions
  const getCanvasCoordinates = (e, canvasElement) => {
    const rect = canvasElement.getBoundingClientRect();
    const scaleX = canvasElement.width / rect.width;
    const scaleY = canvasElement.height / rect.height;
    
    let clientX, clientY;
    if (e.touches) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  const startDrawing = (e, canvasId) => {
    if (canvasId !== activeCanvasId) return;
    
    const canvasElement = canvasRefs.current[canvasId];
    if (!canvasElement) return;
    
    const ctx = canvasElement.getContext('2d');
    ctx.strokeStyle = '#2c3e50'; // Reset to default color when starting new drawing
    
    const coords = getCanvasCoordinates(e, canvasElement);
    setIsDrawing(true);
    setLastPosition(coords);
  };

  const draw = (e, canvasId) => {
    if (!isDrawing || canvasId !== activeCanvasId) return;
    
    const canvasElement = canvasRefs.current[canvasId];
    if (!canvasElement) return;
    
    const ctx = canvasElement.getContext('2d');
    const coords = getCanvasCoordinates(e, canvasElement);
    
    // Draw line
    ctx.beginPath();
    ctx.moveTo(lastPosition.x, lastPosition.y);
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
    
    // Update last position
    setLastPosition(coords);
  };

  const stopDrawing = () => {
    if (isDrawing) {
      // Save the canvas data
      const activeCanvas = canvasRefs.current[activeCanvasId];
      if (activeCanvas) {
        const dataURL = activeCanvas.toDataURL('image/png');
        setCanvases(prevCanvases => 
          prevCanvases.map(canvas => 
            canvas.id === activeCanvasId ? { ...canvas, dataURL } : canvas
          )
        );
      }
      setIsDrawing(false);
    }
  };

  // Touch event handlers
  const handleTouchStart = (e, canvasId) => {
    e.preventDefault();
    startDrawing(e, canvasId);
  };

  const handleTouchMove = (e, canvasId) => {
    e.preventDefault();
    draw(e, canvasId);
  };

  // Clear active canvas
  const clearCanvas = (canvasId) => {
    const canvasElement = canvasRefs.current[canvasId];
    if (canvasElement) {
      const ctx = canvasElement.getContext('2d');
      ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
      
      // Update canvas data
      setCanvases(prevCanvases => 
        prevCanvases.map(canvas => 
          canvas.id === canvasId ? { ...canvas, dataURL: null, prediction: null } : canvas
        )
      );
    }
    
    // Clear combined prediction if clearing any canvas
    setCombinedPrediction(null);
  };

  // Add new canvas
  const addCanvas = () => {
    const newCanvas = {
      id: nextCanvasId,
      active: true,
      dataURL: null,
      prediction: null
    };
    
    // Deactivate current active canvas
    setCanvases(prevCanvases => 
      prevCanvases.map(canvas => ({
        ...canvas,
        active: false
      })).concat(newCanvas)
    );
    
    // Set new active canvas ID
    setActiveCanvasId(nextCanvasId);
    setNextCanvasId(nextCanvasId + 1);
  };

  // Delete canvas
  const deleteCanvas = (canvasId) => {
    let newActiveId = activeCanvasId;
    
    // If deleting active canvas, activate previous or next canvas
    if (canvasId === activeCanvasId) {
      const canvasIndex = canvases.findIndex(c => c.id === canvasId);
      if (canvasIndex > 0) {
        newActiveId = canvases[canvasIndex - 1].id;
      } else if (canvases.length > 1) {
        newActiveId = canvases[1].id;
      }
    }
    
    // We can't delete the last canvas
    if (canvases.length <= 1) return;
    
    // Remove canvas and set new active canvas
    setCanvases(prevCanvases => {
      const filteredCanvases = prevCanvases.filter(canvas => canvas.id !== canvasId);
      // Renumber remaining canvases
      return filteredCanvases.map((canvas, index) => ({
        ...canvas,
        id: index + 1,
        active: canvas.id === newActiveId
      }));
    });
    
    // Update nextCanvasId to be one more than the highest existing canvas ID
    setNextCanvasId(canvases.length);
    setActiveCanvasId(newActiveId);
    
    // Clear combined prediction
    setCombinedPrediction(null);
  };

  // Set active canvas
  const setActiveCanvas = (canvasId) => {
    if (canvasId === activeCanvasId) return;
    
    setCanvases(prevCanvases => 
      prevCanvases.map(canvas => ({
        ...canvas,
        active: canvas.id === canvasId
      }))
    );
    
    setActiveCanvasId(canvasId);
  };

  // Predict drawings from all canvases
  const predictAllDrawings = async () => {
    setIsLoading(true);
    setCombinedPrediction(null);
    
    try {
      const images = [];
      const updatedCanvases = [...canvases];
      
      // Collect all canvas data
      for (let i = 0; i < updatedCanvases.length; i++) {
        const canvas = updatedCanvases[i];
        const canvasElement = canvasRefs.current[canvas.id];
        
        if (canvasElement && canvas.dataURL) {
          images.push(canvas.dataURL);
        }
      }
      console.log(images);
      if (images.length === 0) {
        setCombinedPrediction({
          error: true,
          message: 'No drawings to predict'
        });
        return;
      }

      // Make single API call with all images
      const response = await fetch('https://fast-api-palagai-5.onrender.com/recognize_words', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ images })
      });
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      // Update canvases with predictions
      const predictions = data.predictions;
      for (let i = 0; i < updatedCanvases.length; i++) {
        if (predictions[i]) {
          updatedCanvases[i] = {
            ...updatedCanvases[i],
            prediction: {
              word: predictions[i].word,
              confidence: predictions[i].confidence,
              characters: predictions[i].characters || []
            }
          };
        }
      }
      
      // Update canvases state
      setCanvases(updatedCanvases);
      
      // Set combined prediction
      setCombinedPrediction({
        word: data.combined_word,
        canvasPredictions: updatedCanvases.map(c => c.prediction)
      });
      
    } catch (error) {
      console.error('Error during prediction:', error);
      setCombinedPrediction({
        error: true,
        message: error.message || 'Error predicting drawings'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Submit drawing for the game
  const submitDrawing = async () => {
    // First predict if no prediction exists
    if (!combinedPrediction) {
      await predictAllDrawings();
    }
    
    setIsLoading(true);
    setGameState(prev => ({
      ...prev,
      attempts: prev.attempts + 1
    }));
    
    try {
      // Check if prediction matches current letter
      const predictedText = combinedPrediction?.word || '';
      const isCorrect = predictedText.includes(currentLetter.tamil) || 
                        combinedPrediction?.canvasPredictions?.some(pred => 
                          pred?.characters?.some(char => 
                            char.char === currentLetter.tamil && char.confidence > 70
                          )
                        );
      
      if (isCorrect) {
        // Correct answer
        setGameState(prev => ({
          ...prev,
          score: prev.score + 1
        }));
        
        setFeedback({
          correct: true,
          message: 'Correct! Great job!'
        });
        
        // Move to next question after delay
        setTimeout(() => {
          moveToNextQuestion();
        }, 1500);
      } else {
        // Incorrect answer
        setFeedback({
          correct: false,
          message: `Not quite right. Try again! (System read: ${predictedText})`
        });
      }
      
    } catch (error) {
      console.error('Error during submission:', error);
      setFeedback({
        correct: false,
        message: 'Error checking your answer. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Move to next question
  const moveToNextQuestion = () => {
    const nextIndex = gameState.questionIndex + 1;
    
    if (nextIndex < levels[currentLevel - 1].letters.length) {
      setCurrentLetter(levels[currentLevel - 1].letters[nextIndex]);
      setGameState(prev => ({
        ...prev,
        questionIndex: nextIndex
      }));
      
      // Reset canvases with new numbering starting from 1
      setCanvases([{ id: 1, active: true, dataURL: null, prediction: null }]);
      setActiveCanvasId(1);
      setNextCanvasId(2);
      
      setFeedback(null);
      setCombinedPrediction(null);
    } else {
      // Level completed
      setFeedback({
        correct: true,
        message: 'Level completed! Great job!'
      });
    }
  };

  // Handle level change
  const handleLevelChange = (e) => {
    setCurrentLevel(parseInt(e.target.value, 10));
  };

  return (
    <div className="tamil-app-container">
      <h1 className="app-title">Tamil Letter Drawing App</h1>
      
      <div className="main-card">
        {/* Game header */}
        <div className="game-header">
          <select 
            value={currentLevel}
            onChange={handleLevelChange}
            className="level-selector"
          >
            {levels.map((level, index) => (
              <option key={index} value={index + 1}>
                Level {index + 1}: {level.name}
              </option>
            ))}
          </select>
          
          <div className="stats-container">
            <div className="stat-card">
              <div className="stat-label">QUESTION</div>
              <div className="stat-value">{gameState.questionIndex + 1}/{gameState.totalQuestions}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">SCORE</div>
              <div className="stat-value">{gameState.score}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">ATTEMPTS</div>
              <div className="stat-value">{gameState.attempts}</div>
            </div>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="progress-container">
          <div 
            className="progress-bar" 
            style={{ width: `${(gameState.questionIndex / gameState.totalQuestions) * 100}%` }}
          ></div>
        </div>
        
        {/* Game content */}
        <div className="game-content">
          {/* Drawing area */}
          <div className="drawing-area">
            {/* Prompt */}
            <div className="prompt-card">
              <div className="prompt-text">
                Draw the Tamil letter with transliteration: <strong>{currentLetter.transliteration}</strong>
              </div>
              <div className="tamil-letter">{currentLetter.tamil}</div>
            </div>
            
            {/* Multiple Canvas Container */}
            <div className="multi-canvas-container">
              <div className="canvas-scroll-container" ref={scrollContainerRef}>
                {canvases.map((canvas) => (
                  <div 
                    key={canvas.id}
                    className={`canvas-item ${canvas.active ? 'active' : ''}`}
                    data-id={canvas.id}
                    onClick={() => setActiveCanvas(canvas.id)}
                  >
                    <canvas
                      ref={el => canvasRefs.current[canvas.id] = el}
                      width={500}
                      height={300}
                      className="drawing-canvas"
                      onMouseDown={(e) => startDrawing(e, canvas.id)}
                      onMouseMove={(e) => draw(e, canvas.id)}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                      onTouchStart={(e) => handleTouchStart(e, canvas.id)}
                      onTouchMove={(e) => handleTouchMove(e, canvas.id)}
                      onTouchEnd={stopDrawing}
                    />
                    <div className="canvas-controls">
                      <div className="canvas-number">{canvas.id}</div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          clearCanvas(canvas.id);
                        }}
                        className="canvas-btn clear-btn"
                        title="Clear Canvas"
                      >
                        <FontAwesomeIcon icon={faRotateLeft} style={{color: "#2c3e50"}} />
                      </button>
                      {canvases.length > 1 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteCanvas(canvas.id);
                          }}
                          className="canvas-btn delete-btn"
                          title="Delete Canvas"
                        >
                          <FontAwesomeIcon icon={faTrash} style={{color: "#e40707"}} />
                        </button>
                      )}
                    </div>
                    {canvas.prediction && !canvas.prediction.error && (
                      <div className="mini-prediction">
                        <span style={{ 
                          color: canvas.prediction.confidence < 20 ? '#ff6b35' : 'inherit'
                        }}>
                          {canvas.prediction.word}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Add new canvas button */}
              <button 
                onClick={addCanvas}
                className="add-canvas-btn"
                title="Add New Canvas"
                style={{
                  position: 'absolute',
                  right: '-50px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#2c3e50',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                  transition: 'all 0.2s ease',
                  zIndex: 10
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#34495e';
                  e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#2c3e50';
                  e.currentTarget.style.transform = 'translateY(-50%)';
                }}
              >
                <span>+</span>
              </button>
            </div>
            
            {/* Button group */}
            <div className="buttons-container">
              <button 
                onClick={() => clearCanvas(activeCanvasId)} 
                className="btn btn-clear"
              >
                Clear Active
              </button>
              <button 
                onClick={predictAllDrawings} 
                className="btn btn-predict"
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : 'Predict All'}
              </button>
              <button 
                onClick={submitDrawing} 
                className="btn btn-submit"
                disabled={isLoading}
              >
                Submit
              </button>
            </div>
          </div>
          
          {/* Result area */}
          <div className="result-area">
            {/* Combined Prediction */}
            {combinedPrediction && !combinedPrediction.error && (
              <div className="prediction-card">
                <h3 className="prediction-title">Combined Prediction:</h3>
                <div className="prediction-value">{combinedPrediction.word}</div>
                
                {combinedPrediction.canvasPredictions && combinedPrediction.canvasPredictions.filter(Boolean).length > 0 && (
                  <div className="character-breakdown">
                    <h4 className="breakdown-title">Individual Predictions:</h4>
                    <ul className="characters-list">
                      {combinedPrediction.canvasPredictions.filter(Boolean).map((prediction, index) => (
                        <li key={index} className="character-item">
                          <span>Canvas {index + 1}: <span style={{ 
                            color: prediction.confidence < 20 ? '#ff6b35' : 'inherit'
                          }}>{prediction.word}</span></span>
                          <span>{prediction.confidence}%</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
            
            {/* Error */}
            {combinedPrediction && combinedPrediction.error && (
              <div className="error-card">
                <h3 className="font-medium">Error:</h3>
                <p>{combinedPrediction.message}</p>
              </div>
            )}
            
            {/* Feedback */}
            {feedback && (
              <div className={`feedback-card ${feedback.correct ? 'feedback-correct' : 'feedback-incorrect'}`}>
                {feedback.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TamilDrawingApp;