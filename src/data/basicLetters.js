const levels = [
    {
      id: 1,
      title: "Basic Vowels - Part 1",
      content: [
        { question_id: 1, question: "Draw a Tamil letter with transliteration 'a'", answer: "அ" },
        { question_id: 2, question: "Draw a Tamil letter with transliteration 'aa'", answer: "ஆ" },
        { question_id: 3, question: "Draw a Tamil letter with transliteration 'i'", answer: "இ" },
        { question_id: 4, question: "Draw a Tamil letter with transliteration 'u'", answer: "உ" },
        { question_id: 5, question: "Draw a Tamil letter with transliteration 'oo'", answer: "ஊ" },
        { question_id: 6, question: "Draw a Tamil letter with transliteration 'e'", answer: "எ" },
        { question_id: 7, question: "Draw a Tamil letter with transliteration 'ae'", answer: "ஏ" },
        { question_id: 8, question: "Draw a Tamil letter with transliteration 'ai'", answer: "ஐ" },
        { question_id: 9, question: "Draw a Tamil letter with transliteration 'o'", answer: "ஒ" }, 

      ]
    },
    {
      id: 2,
      title: "Basic Vowels - Part 2 & Consonant க",
      content: [
        { question_id: 1, question: "Draw a Tamil letter with transliteration 'oa'", answer: "ஓ" },
        { question_id: 2, question: "Draw a Tamil letter with transliteration 'au'", answer: "ஔ" },
        { question_id: 3, question: "Draw a Tamil letter with transliteration 'koo'", answer: "கூ" },
        { question_id: 4, question: "Draw a Tamil letter with transliteration 'k'", answer: "க்" },
        { question_id: 5, question: "Draw a Tamil letter with transliteration 'ka'", answer: "க" },
        { question_id: 6, question: "Draw a Tamil letter with transliteration 'kaa'", answer: "கா" },
        { question_id: 7, question: "Draw a Tamil letter with transliteration 'ki'", answer: "கி" },
        { question_id: 8, question: "Draw a Tamil letter with transliteration 'kee'", answer: "கீ" },
        { question_id: 9, question: "Draw a Tamil letter with transliteration 'ku'", answer: "கு" },
        { question_id: 10, question: "Draw a Tamil letter with transliteration 'koo'", answer: "கூ" }
      ]
    },
    {
      id: 3,
      title: "Consonant க variations & ங consonant",
      content: [
        { question_id: 1, question: "Draw a Tamil letter with transliteration 'ke'", answer: "கெ" },
        { question_id: 2, question: "Draw a Tamil letter with transliteration 'kae'", answer: "கே" },
        { question_id: 3, question: "Draw a Tamil letter with transliteration 'kai'", answer: "கை" },
        { question_id: 4, question: "Draw a Tamil letter with transliteration 'ko'", answer: "கொ" },
        { question_id: 5, question: "Draw a Tamil letter with transliteration 'koa'", answer: "கோ" },
        { question_id: 6, question: "Draw a Tamil letter with transliteration 'ng'", answer: "ங்" },
        { question_id: 7, question: "Draw a Tamil letter with transliteration 'nga'", answer: "ங" },
        { question_id: 8, question: "Draw a Tamil letter with transliteration 'ngaa'", answer: "ஙா" },
        { question_id: 9, question: "Draw a Tamil letter with transliteration 'ngi'", answer: "ஙி" },
        { question_id: 10, question: "Draw a Tamil letter with transliteration 'ngee'", answer: "ஙீ" }
      ]
    },
    {
      id: 4,
      title: "Consonant ங variations & ச consonant",
      content: [
        { question_id: 1, question: "Draw a Tamil letter with transliteration 'ngu'", answer: "ஙு" },
        { question_id: 2, question: "Draw a Tamil letter with transliteration 'ngoo'", answer: "ஙூ" },
        { question_id: 3, question: "Draw a Tamil letter with transliteration 'nge'", answer: "ஙெ" },
        { question_id: 4, question: "Draw a Tamil letter with transliteration 'ngae'", answer: "ஙே" },
        { question_id: 5, question: "Draw a Tamil letter with transliteration 'ngai'", answer: "ஙை" },
        { question_id: 6, question: "Draw a Tamil letter with transliteration 'ch'", answer: "ச்" },
        { question_id: 7, question: "Draw a Tamil letter with transliteration 'cha'", answer: "ச" },
        { question_id: 8, question: "Draw a Tamil letter with transliteration 'chaa'", answer: "சா" },
        { question_id: 9, question: "Draw a Tamil letter with transliteration 'chi'", answer: "சி" },
        { question_id: 10, question: "Draw a Tamil letter with transliteration 'chee'", answer: "சீ" }
      ]
    },
    {
      id: 5,
      title: "Consonant ச variations & ஞ consonant",
      content: [
        { question_id: 1, question: "Draw a Tamil letter with transliteration 'chu'", answer: "சு" },
        { question_id: 2, question: "Draw a Tamil letter with transliteration 'choo'", answer: "சூ" },
        { question_id: 3, question: "Draw a Tamil letter with transliteration 'che'", answer: "செ" },
        { question_id: 4, question: "Draw a Tamil letter with transliteration 'chae'", answer: "சே" },
        { question_id: 5, question: "Draw a Tamil letter with transliteration 'chai'", answer: "சை" },
        { question_id: 6, question: "Draw a Tamil letter with transliteration 'nj'", answer: "ஞ்" },
        { question_id: 7, question: "Draw a Tamil letter with transliteration 'nja'", answer: "ஞ" },
        { question_id: 8, question: "Draw a Tamil letter with transliteration 'njaa'", answer: "ஞா" },
        { question_id: 9, question: "Draw a Tamil letter with transliteration 'nji'", answer: "ஞி" },
        { question_id: 10, question: "Draw a Tamil letter with transliteration 'njee'", answer: "ஞீ" }
      ]
    },
    {
      id: 6,
      title: "Consonants ட and ண",
      content: [
        { question_id: 1, question: "Draw a Tamil letter with transliteration 't'", answer: "ட்" },
        { question_id: 2, question: "Draw a Tamil letter with transliteration 'ta'", answer: "ட" },
        { question_id: 3, question: "Draw a Tamil letter with transliteration 'taa'", answer: "டா" },
        { question_id: 4, question: "Draw a Tamil letter with transliteration 'ti'", answer: "டி" },
        { question_id: 5, question: "Draw a Tamil letter with transliteration 'tee'", answer: "டீ" },
        { question_id: 6, question: "Draw a Tamil letter with transliteration 'N'", answer: "ண்" },
        { question_id: 7, question: "Draw a Tamil letter with transliteration 'Na'", answer: "ண" },
        { question_id: 8, question: "Draw a Tamil letter with transliteration 'Naa'", answer: "ணா" },
        { question_id: 9, question: "Draw a Tamil letter with transliteration 'Ni'", answer: "ணி" },
        { question_id: 10, question: "Draw a Tamil letter with transliteration 'Nee'", answer: "ணீ" }
      ]
    },
    {
      id: 7,
      title: "Consonants த and ந",
      content: [
        { question_id: 1, question: "Draw a Tamil letter with transliteration 'th'", answer: "த்" },
        { question_id: 2, question: "Draw a Tamil letter with transliteration 'tha'", answer: "த" },
        { question_id: 3, question: "Draw a Tamil letter with transliteration 'thaa'", answer: "தா" },
        { question_id: 4, question: "Draw a Tamil letter with transliteration 'thi'", answer: "தி" },
        { question_id: 5, question: "Draw a Tamil letter with transliteration 'thee'", answer: "தீ" },
        { question_id: 6, question: "Draw a Tamil letter with transliteration 'w'", answer: "ந்" },
        { question_id: 7, question: "Draw a Tamil letter with transliteration 'wa'", answer: "ந" },
        { question_id: 8, question: "Draw a Tamil letter with transliteration 'waa'", answer: "நா" },
        { question_id: 9, question: "Draw a Tamil letter with transliteration 'wi'", answer: "நி" },
        { question_id: 10, question: "Draw a Tamil letter with transliteration 'wee'", answer: "நீ" }
      ]
    },
    {
      id: 8,
      title: "Consonants ப and ம",
      content: [
        { question_id: 1, question: "Draw a Tamil letter with transliteration 'p'", answer: "ப்" },
        { question_id: 2, question: "Draw a Tamil letter with transliteration 'pa'", answer: "ப" },
        { question_id: 3, question: "Draw a Tamil letter with transliteration 'paa'", answer: "பா" },
        { question_id: 4, question: "Draw a Tamil letter with transliteration 'pi'", answer: "பி" },
        { question_id: 5, question: "Draw a Tamil letter with transliteration 'pee'", answer: "பீ" },
        { question_id: 6, question: "Draw a Tamil letter with transliteration 'm'", answer: "ம்" },
        { question_id: 7, question: "Draw a Tamil letter with transliteration 'ma'", answer: "ம" },
        { question_id: 8, question: "Draw a Tamil letter with transliteration 'maa'", answer: "மா" },
        { question_id: 9, question: "Draw a Tamil letter with transliteration 'mi'", answer: "மி" },
        { question_id: 10, question: "Draw a Tamil letter with transliteration 'mee'", answer: "மீ" }
      ]
    },
    {
      id: 9,
      title: "Consonants ய and ர",
      content: [
        { question_id: 1, question: "Draw a Tamil letter with transliteration 'y'", answer: "ய்" },
        { question_id: 2, question: "Draw a Tamil letter with transliteration 'ya'", answer: "ய" },
        { question_id: 3, question: "Draw a Tamil letter with transliteration 'yaa'", answer: "யா" },
        { question_id: 4, question: "Draw a Tamil letter with transliteration 'yi'", answer: "யி" },
        { question_id: 5, question: "Draw a Tamil letter with transliteration 'yee'", answer: "யீ" },
        { question_id: 6, question: "Draw a Tamil letter with transliteration 'r'", answer: "ர்" },
        { question_id: 7, question: "Draw a Tamil letter with transliteration 'ra'", answer: "ர" },
        { question_id: 8, question: "Draw a Tamil letter with transliteration 'raa'", answer: "ரா" },
        { question_id: 9, question: "Draw a Tamil letter with transliteration 'ri'", answer: "ரி" },
        { question_id: 10, question: "Draw a Tamil letter with transliteration 'ree'", answer: "ரீ" }
      ]
    },
    {
      id: 10,
      title: "Consonants ல and வ",
      content: [
        { question_id: 1, question: "Draw a Tamil letter with transliteration 'l'", answer: "ல்" },
        { question_id: 2, question: "Draw a Tamil letter with transliteration 'la'", answer: "ல" },
        { question_id: 3, question: "Draw a Tamil letter with transliteration 'laa'", answer: "லா" },
        { question_id: 4, question: "Draw a Tamil letter with transliteration 'li'", answer: "லி" },
        { question_id: 5, question: "Draw a Tamil letter with transliteration 'lee'", answer: "லீ" },
        { question_id: 6, question: "Draw a Tamil letter with transliteration 'v'", answer: "வ்" },
        { question_id: 7, question: "Draw a Tamil letter with transliteration 'va'", answer: "வ" },
        { question_id: 8, question: "Draw a Tamil letter with transliteration 'vaa'", answer: "வா" },
        { question_id: 9, question: "Draw a Tamil letter with transliteration 'vi'", answer: "வி" },
        { question_id: 10, question: "Draw a Tamil letter with transliteration 'vee'", answer: "வீ" }
      ]
    },
    {
      id: 11,
      title: "Consonants ழ, ள, ற, ன",
      content: [
        { question_id: 1, question: "Draw a Tamil letter with transliteration 'zh'", answer: "ழ்" },
        { question_id: 2, question: "Draw a Tamil letter with transliteration 'zha'", answer: "ழ" },
        { question_id: 3, question: "Draw a Tamil letter with transliteration 'zhaa'", answer: "ழா" },
        { question_id: 4, question: "Draw a Tamil letter with transliteration 'L'", answer: "ள்" },
        { question_id: 5, question: "Draw a Tamil letter with transliteration 'La'", answer: "ள" },
        { question_id: 6, question: "Draw a Tamil letter with transliteration 'R'", answer: "ற்" },
        { question_id: 7, question: "Draw a Tamil letter with transliteration 'Ra'", answer: "ற" },
        { question_id: 8, question: "Draw a Tamil letter with transliteration 'n'", answer: "ன்" },
        { question_id: 9, question: "Draw a Tamil letter with transliteration 'na'", answer: "ன" },
        { question_id: 10, question: "Draw a Tamil letter with transliteration 'naa'", answer: "னா" }
      ]
    },
    {
      id: 12,
      title: "Special Characters & Additional Letters",
      content: [
        { question_id: 1, question: "Draw a Tamil letter with transliteration 'j'", answer: "ஜ்" },
        { question_id: 2, question: "Draw a Tamil letter with transliteration 'ja'", answer: "ஜ" },
        { question_id: 3, question: "Draw a Tamil letter with transliteration 'jaa'", answer: "ஜா" },
        { question_id: 4, question: "Draw a Tamil letter with transliteration 'sh'", answer: "ஷ்" },
        { question_id: 5, question: "Draw a Tamil letter with transliteration 'sha'", answer: "ஷ" },
        { question_id: 6, question: "Draw a Tamil letter with transliteration 'S'", answer: "ஸ்" },
        { question_id: 7, question: "Draw a Tamil letter with transliteration 'Sa'", answer: "ஸ" },
        { question_id: 8, question: "Draw a Tamil letter with transliteration 'h'", answer: "ஹ்" },
        { question_id: 9, question: "Draw a Tamil letter with transliteration 'ha'", answer: "ஹ" },
        { question_id: 10, question: "Draw a Tamil letter with transliteration 'sri'", answer: "ஸ்ரீ" }
      ]
    }
  ];
  
  export default levels;