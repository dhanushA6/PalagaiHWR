import React, { useRef, useState, useEffect } from 'react';
import './style.css';
import basicLetters from '../data/basicLetters';
import definitionLetters from '../data/definitionLetters';
import penIcon from '../images/pen.png';
import eraserIcon from '../images/eraser.png';
import clearIcon from '../images/clear.png';
import submitIcon from '../images/submit.png';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrash, faRotateLeft } from '@fortawesome/free-solid-svg-icons';

const TamilDrawingApp = () => {
  const [canvasData, setCanvasData] = useState({ dataURL: null, prediction: null });
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [gameState, setGameState] = useState({
    currentQuestionIndex: 0,
    score: 0,
    attempts: 0,
    questionScores: []
  });
  const canvasRef = useRef(null);
  const [showPredictionOverlay, setShowPredictionOverlay] = useState(false);
  const [currentTool, setCurrentTool] = useState('pen');

  // Tamil letters
  const letters = [
    { transliteration: "a", tamil: "அ" },
    { transliteration: "aa", tamil: "ஆ" },
    { transliteration: "ai", tamil: "ஐ" },
    { transliteration: "o", tamil: "ஒ" },
    { transliteration: "oo", tamil: "ஓ" },
    { transliteration: "u", tamil: "உ" },
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
  ];

  // Get available levels based on selected category
  const getAvailableLevels = () => {
    if (!selectedCategory) return [];
    const levels = selectedCategory === 'basic' ? basicLetters : definitionLetters;
    return Array.isArray(levels) ? levels : [];
  };

  // Initialize game when category and level are selected
  const startGame = () => {
    if (!selectedCategory || !selectedLevel) return;

    const levels = selectedCategory === 'basic' ? basicLetters : definitionLetters;
    const selectedLevelData = levels.find(level => 
      level.id.toString() === selectedLevel.toString()
    );

    if (!selectedLevelData?.content) return;

    setCurrentQuestion(selectedLevelData.content[0]);
    setGameState({
      currentQuestionIndex: 0,
      score: 0,
      attempts: 0,
      questionScores: []
    });
    setGameStarted(true);
    setGameCompleted(false);
    
    // Reset canvas
    setCanvasData({ dataURL: null, prediction: null });
    setFeedback(null);
  };

  // Initialize letters
  useEffect(() => {
    // Remove shuffling, just set the first question
    setCurrentQuestion(letters[0]);
    
    // Reset canvas
    setCanvasData({ dataURL: null, prediction: null });
    setFeedback(null);
  }, []);

  // Set up canvas
  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (canvasElement) {
      const ctx = canvasElement.getContext('2d');
      
      // Set canvas styling
      ctx.lineWidth = currentTool === 'pen' ? 3 : 20;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = currentTool === 'pen' ? '#ffffff' : '#000000';
      
      // Set black background
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvasElement.width, canvasElement.height);
      
      // Restore drawing if dataURL exists
      if (canvasData.dataURL) {
        const img = new Image();
        img.onload = () => {
          ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
          ctx.fillStyle = '#000000';
          ctx.fillRect(0, 0, canvasElement.width, canvasElement.height);
          ctx.drawImage(img, 0, 0);
        };
        img.src = canvasData.dataURL;
      } else {
        ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvasElement.width, canvasElement.height);
      }
    }
  }, [canvasData, currentTool]);

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

  const startDrawing = (e) => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;
    
    const ctx = canvasElement.getContext('2d');
    ctx.strokeStyle = currentTool === 'pen' ? '#ffffff' : '#000000';
    ctx.lineWidth = currentTool === 'pen' ? 3 : 20;
    
    const coords = getCanvasCoordinates(e, canvasElement);
    setIsDrawing(true);
    setLastPosition(coords);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    
    const canvasElement = canvasRef.current;
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
      const canvasElement = canvasRef.current;
      if (canvasElement) {
        const dataURL = canvasElement.toDataURL('image/png');
        setCanvasData(prev => ({ ...prev, dataURL }));
      }
      setIsDrawing(false);
    }
  };

  // Touch event handlers
  const handleTouchStart = (e) => {
    e.preventDefault();
    startDrawing(e);
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    draw(e);
  };

  // Clear canvas
  const clearCanvas = () => {
    const canvasElement = canvasRef.current;
    if (canvasElement) {
      const ctx = canvasElement.getContext('2d');
      ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvasElement.width, canvasElement.height);
      setCanvasData({ dataURL: null, prediction: null });
    }
  };

  // Predict drawing
  const predictDrawing = async () => {
    setIsLoading(true);
    
    try {
      const canvasElement = canvasRef.current;
      if (!canvasElement || !canvasData.dataURL) {
        throw new Error('No drawing to predict');
      }

      // Create a temporary canvas to invert colors
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = canvasElement.width;
      tempCanvas.height = canvasElement.height;
      const tempCtx = tempCanvas.getContext('2d');

      // Draw the original canvas to temp canvas
      tempCtx.drawImage(canvasElement, 0, 0);

      // Get the image data
      const imageData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
      const pixelData = imageData.data;

      // Invert colors
      for (let i = 0; i < pixelData.length; i += 4) {
        pixelData[i] = 255 - pixelData[i];     // red
        pixelData[i + 1] = 255 - pixelData[i + 1]; // green
        pixelData[i + 2] = 255 - pixelData[i + 2]; // blue
      }

      // Put the inverted image data back
      tempCtx.putImageData(imageData, 0, 0);

      // Get the inverted image data URL
      const invertedDataURL = tempCanvas.toDataURL('image/png');

      const response = await fetch('https://fast-api-palagai-5.onrender.com/recognize_words', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ images: [invertedDataURL] })
      });
      
      const responseData = await response.json();
      
      if (responseData.error) {
        throw new Error(responseData.error);
      }
      
      setCanvasData(prev => ({
        ...prev,
        prediction: {
          word: responseData.predictions[0].word,
          confidence: responseData.predictions[0].confidence
        }
      }));
      
      // Show prediction overlay
      setShowPredictionOverlay(true);
      
    } catch (error) {
      console.error('Error during prediction:', error);
      setFeedback({
        error: true,
        message: error.message || 'Error predicting drawing'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Add function to check if prediction matches the answer
  const checkPrediction = () => {
    try {
      if (!canvasData.prediction || !currentQuestion) return false;
      
      const predictedWord = canvasData.prediction.word.toLowerCase().trim();
      
      // Handle both single answer and multiple answers
      if (selectedCategory === 'basic') {
        // For basic letters, check against single answer
        const correctAnswer = currentQuestion.answer.toLowerCase().trim();
        
        // Normalize ஔ and ஒள for comparison
        const normalizedPredicted = predictedWord.replace(/ஔ/g, 'ஒள').replace(/ஒள/g, 'ஔ');
        const normalizedCorrect = correctAnswer.replace(/ஔ/g, 'ஒள').replace(/ஒள/g, 'ஔ');
        
        return normalizedPredicted === normalizedCorrect || predictedWord === correctAnswer;
      } else {
        // For definition-based questions, check against multiple possible answers
        const possibleAnswers = Array.isArray(currentQuestion.answer) 
          ? currentQuestion.answer 
          : [currentQuestion.answer];
        
        // Normalize all possible answers
        const normalizedAnswers = possibleAnswers.map(answer => {
          const normalized = answer.toLowerCase().trim()
            .replace(/ஔ/g, 'ஒள')
            .replace(/ஒள/g, 'ஔ');
          return normalized;
        });
        
        // Check both normalized and original prediction
        return normalizedAnswers.some(answer => 
          answer === predictedWord.replace(/ஔ/g, 'ஒள').replace(/ஒள/g, 'ஔ') ||
          answer === predictedWord
        );
      }
    } catch (error) {
      console.error('Error checking prediction:', error);
      return false;
    }
  };

  // Update handlePredictionResponse to handle skipping
  const handlePredictionResponse = (isCorrect) => {
    try {
      if (isCorrect) {
        // Calculate score based on attempts (100% for first try, decreasing by 20% each attempt)
        const score = Math.max(100 - (gameState.attempts * 20), 20);
        
        setGameState(prev => ({
          ...prev,
          score: prev.score + score,
          attempts: 0,
          questionScores: [...prev.questionScores, {
            question: currentQuestion.question,
            score: score,
            maxScore: 100
          }]
        }));
        
        setFeedback({
          correct: true,
          message: `Great job! You scored ${score}% on this question!`
        });
        
        setTimeout(() => {
          moveToNextQuestion();
        }, 200);
      } else {
        setGameState(prev => ({
          ...prev,
          attempts: prev.attempts + 1
        }));
        
        setFeedback({
          correct: false,
          message: 'Try again! Make sure your drawing has no overlaps'
        });
      }
      setShowPredictionOverlay(false);
    } catch (error) {
      console.error('Error handling prediction response:', error);
      setFeedback({
        error: true,
        message: 'An error occurred. Please try again.'
      });
    }
  };

  // Add function to handle skipping question
  const handleSkipQuestion = () => {
    setGameState(prev => ({
      ...prev,
      questionScores: [...prev.questionScores, {
        question: currentQuestion.question,
        score: 0,
        maxScore: 100
      }]
    }));
    
    setFeedback({
      correct: false,
      message: 'Question skipped. Moving to next question...'
    });
    
    setShowPredictionOverlay(false);
    setTimeout(() => {
      moveToNextQuestion();
    }, 1500);
  };

  // Calculate final score as percentage
  const calculateFinalScore = () => {
    const totalQuestions = gameState.questionScores.length;
    if (totalQuestions === 0) return 0;

    const totalScore = gameState.questionScores.reduce((sum, q) => sum + q.score, 0);
    return Math.round(totalScore / totalQuestions);
  };

  // Update the prediction overlay to show possible answers for definition-based questions
  const renderPredictionFeedback = () => {
    if (!canvasData.prediction || !currentQuestion) return null;

    const isCorrect = checkPrediction();
    
    return (
      <div className={`prediction-feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
        <div className="feedback-icon">{isCorrect ? '✓' : '✗'}</div>
        <div className="feedback-message">
          {isCorrect ? (
            'Correct! Moving to next question...'
          ) : (
            <div>
              <div>Try again! Make sure your drawing has no overlaps</div>
              {selectedCategory === 'definition' && (
                <div className="possible-answers">
                  Possible answers: {Array.isArray(currentQuestion.answer) 
                    ? currentQuestion.answer.join(', ') 
                    : currentQuestion.answer}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Move to next question
  const moveToNextQuestion = () => {
    const levels = selectedCategory === 'basic' ? basicLetters : definitionLetters;
    const selectedLevelData = levels.find(level => 
      level.id.toString() === selectedLevel.toString()
    );

    const nextIndex = gameState.currentQuestionIndex + 1;
    
    if (nextIndex < selectedLevelData.content.length) {
      setCurrentQuestion(selectedLevelData.content[nextIndex]);
      setGameState(prev => ({
        ...prev,
        currentQuestionIndex: nextIndex,
        attempts: 0
      }));
      
      // Reset canvas
      clearCanvas();
      setFeedback(null);
    } else {
      // Game completed
      setGameCompleted(true);
      setFeedback({
        correct: true,
        message: 'Game completed! Great job!'
      });
    }
  };

  return (
    <div className="tamil-app-container">
      {!gameStarted ? (
        <div className="main-card">
          <div className="game-setup">
            <div className="setup-item">
              <label>Select Category:</label>
              <select 
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setSelectedLevel(''); // Reset level when category changes
                }}
                className="category-selector"
              >
                <option value="">Select Category</option>
                <option value="basic">Basic Letters</option>
                <option value="definition">Definition Based</option>
              </select>
            </div>
            
            <div className="setup-item">
              <label>Select Level:</label>
              <select 
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="level-selector"
                disabled={!selectedCategory}
              >
                <option value="">Select Level</option>
                {getAvailableLevels().map((level) => (
                  <option key={level.id} value={level.id}>
                    {level.title}
                  </option>
                ))}
              </select>
            </div>
            
            <button 
              onClick={startGame}
              className="start-game-btn"
              disabled={!selectedCategory || !selectedLevel}
            >
              Start Game
            </button>
          </div>
        </div>
      ) : gameCompleted ? (
        <div className="main-card">
          <div className="game-results">
            <h2>Final Results</h2>
            <div className="results-summary">
              <div className="final-score">
                <div className="score-circle">
                  <span className="score-value">{calculateFinalScore()}%</span>
                </div>
                <div className="score-label">Final Score</div>
              </div>
              <div className="result-item">
                <span>Questions Completed:</span>
                <span>{gameState.questionScores.length}</span>
              </div>
            </div>
            <div className="results-actions">
              <button 
                onClick={() => setGameStarted(false)}
                className="restart-btn"
              >
                Play Again
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="main-card">
          <div className="game-content">
            <div className="drawing-area">
              {/* Navbar with buttons */}
              <div className="drawing-navbar">
                <div className="tool-selector">
                  <button 
                    onClick={() => setCurrentTool('pen')} 
                    className={`tool-btn ${currentTool === 'pen' ? 'active' : ''}`}
                    title="Pen Tool"
                  >
                    <img src={penIcon} alt="Pen" className="tool-icon" />
                  </button>
                  <button 
                    onClick={() => setCurrentTool('eraser')} 
                    className={`tool-btn ${currentTool === 'eraser' ? 'active' : ''}`}
                    title="Eraser Tool"
                  >
                    <img src={eraserIcon} alt="Eraser" className="tool-icon" />
                  </button>
                </div>
                <div className="action-buttons">
                  <button 
                    onClick={predictDrawing} 
                    className="btn btn-predict"
                    disabled={isLoading}
                    title="Predict Drawing"
                  >
                    <img src={submitIcon} alt="Submit" className="btn-icon" />
                  </button>
                  <button 
                    onClick={clearCanvas} 
                    className="btn btn-clear"
                    title="Clear Canvas"
                  >
                    <img src={clearIcon} alt="Clear" className="btn-icon" />
                  </button>
                </div>
              </div>

              {/* Prompt */}
              <div className="prompt-card">
                <div className="prompt-text">
                  {selectedCategory === 'basic' 
                    ? `${currentQuestion.question}`
                    : currentQuestion.question}
                </div>
              </div>
              
              {/* Single Canvas */}
              <div className="canvas-container">
                <canvas
                  ref={canvasRef}
                  width={500}
                  height={200}
                  className="drawing-canvas"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={stopDrawing}
                />
              </div> 
              <div className=''>
              </div>
            </div>
          </div>

          {/* Prediction Overlay */}
          {showPredictionOverlay && canvasData.prediction && (
            <div className="prediction-overlay">
              <div className="prediction-overlay-content">
                <div className="prediction-overlay-header">
                  <h3 className="prediction-overlay-title">Prediction Result</h3>
                  <button 
                    className="close-overlay-btn"
                    onClick={() => setShowPredictionOverlay(false)}
                  >
                    ×
                  </button>
                </div>
                <div className="prediction-overlay-body">
                  <div className="prediction-result">
                    <div className="prediction-label">Your Drawing:</div>
                    <div className="prediction-overlay-value">
                      {canvasData.prediction.word}
                    </div>
                    <div className="confidence-value">
                      Confidence: {canvasData.prediction.confidence}%
                    </div>
                  </div>
                  {renderPredictionFeedback()}
                </div>
                <div className="prediction-overlay-buttons">
                  {checkPrediction() ? (
                    <button 
                      className="prediction-overlay-btn next"
                      onClick={() => handlePredictionResponse(true)}
                    >
                      Next Question
                    </button>
                  ) : (
                    <div className="button-group">
                      <button 
                        className="prediction-overlay-btn try-again"
                        onClick={() => setShowPredictionOverlay(false)}
                      >
                        Try Again
                      </button>
                      <button 
                        className="prediction-overlay-btn skip"
                        onClick={handleSkipQuestion}
                      >
                        Skip Question
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Feedback Message */}
          {feedback && (
            <div className={`feedback-message ${feedback.correct ? 'correct' : 'incorrect'}`}>
              {feedback.message}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TamilDrawingApp;