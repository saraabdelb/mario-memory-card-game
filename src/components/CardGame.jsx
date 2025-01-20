import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";

// Shuffle Function to Randomize the Card Array
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];  
  }
  return arr;
}

// State Variables to Manage Game State
function CardGame() {
  const [cards, setCards] = useState([]);  
  const [flippedCards, setFlippedCards] = useState([]);  
  const [matchedCards, setMatchedCards] = useState([]);  
  const [gameOver, setGameOver] = useState(false); 
  const [moves, setMoves] = useState(0);  
  const [time, setTime] = useState(0);  
  const [hours, setHours] = useState(0); 
  const [minutes, setMinutes] = useState(0);  
  const [seconds, setSeconds] = useState(0);  
  const [difficulty, setDifficulty] = useState(null); 
  const [timer, setTimer] = useState(null);  
  const [showConfetti, setShowConfetti] = useState(false); 
  const [isFlipping, setIsFlipping] = useState(false);

  // Card Images Used in the Game
  const cardImages = [
    'mario', 'monkey', 'yoshi', 'luigi', 'princesspeach', 'mushroom',
    'bowser', 'toad', 'waluigi', 'daisy', 'peach', 'koopa',
  ];

  // Difficulty Levels
  const difficultyLevels = {
    easy: 3,    
    medium: 4,  
    hard: 6,    
  };

  // Effect to Initialize New Game with Difficulty
  useEffect(() => {
    if (!difficulty) return;

    const totalPairs = difficultyLevels[difficulty];
    const selectedCards = shuffleArray(cardImages.slice(0, totalPairs));
    const newCards = shuffleArray([...selectedCards, ...selectedCards]).map(card => ({
      value: card,
      flipped: false,  
    }));

    setCards(newCards);
    setMatchedCards([]);  
    setMoves(0);          
    setTime(0);           
    setGameOver(false);    
    setFlippedCards([]);  
    setShowConfetti(false); 

    // Start the Timer when game starts
    const startTime = Date.now();
    setTime(0);  

    if (timer) {
      clearInterval(timer);
    }

    const newTimer = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      setTime(elapsed); 
    }, 1000);

    setTimer(newTimer);

    return () => clearInterval(newTimer);
  }, [difficulty]);

  // Effect to Convert Time to Hours, Minutes, and Seconds
  useEffect(() => {
    const newHours = Math.floor(time / 3600);
    const newMinutes = Math.floor((time % 3600) / 60);
    const newSeconds = time % 60;

    setHours(newHours);
    setMinutes(newMinutes);
    setSeconds(newSeconds);
  }, [time]);

  // Handle Card Click and Match Logic
  const handleCardClick = (index) => {
    if (flippedCards.length === 2 || flippedCards.includes(index) || gameOver || isFlipping) return;

    setFlippedCards((prev) => {
      const newFlippedCards = [...prev, index];
      if (newFlippedCards.length === 2) {
        const [firstCardIndex, secondCardIndex] = newFlippedCards;

        setIsFlipping(true);

        setCards((prevCards) => {
          const newCards = [...prevCards];
          newCards[firstCardIndex] = { ...newCards[firstCardIndex], flipped: true };
          newCards[secondCardIndex] = { ...newCards[secondCardIndex], flipped: true };
          return newCards;
        });

        setMoves((prevMoves) => prevMoves + 1);  

        if (cards[firstCardIndex].value === cards[secondCardIndex].value) {
          setMatchedCards((prev) => {
            const newMatchedCards = [...prev, cards[firstCardIndex].value];
            return Array.from(new Set(newMatchedCards)); 
          });
        }

        // Reset flipped cards after 500ms
        setTimeout(() => {
          setFlippedCards([]);
          setIsFlipping(false); 
        }, 500); 
      }
      return newFlippedCards;
    });
  };

  // Check if Game is Over (All Pairs Matched)
  useEffect(() => {
    const totalPairs = difficultyLevels[difficulty];
    if (matchedCards.length === totalPairs) {
      setGameOver(true);

      window.scrollTo(0, 0);

      setTimeout(() => {
        setShowConfetti(true);
      }, 500);  

      if (timer) {
        clearInterval(timer);
      }

      setTimeout(() => {
        setShowConfetti(false);
      }, 9000);  
    }
  }, [matchedCards, difficulty, timer]);

  // Restart Game Logic 
  const restartGame = () => {
    if (timer) {
      clearInterval(timer);
    }

    setMatchedCards([]);
    setFlippedCards([]);
    setMoves(0);
    setTime(0);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setGameOver(false);
    setShowConfetti(false);

    // Get the total number of pairs based on the selected difficulty
    const totalPairs = difficultyLevels[difficulty];

    // Select cards and shuffle them
    const selectedCards = shuffleArray(cardImages.slice(0, totalPairs));

    // Create the deck with both pairs and shuffle again
    const newCards = shuffleArray([
      ...selectedCards,
      ...selectedCards,
    ]).map(card => ({
      value: card,
      flipped: false,  
    }));

    setCards(newCards);  

    // Restart the timer
    const startTime = Date.now();
    const newTimer = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      setTime(elapsed);
    }, 1000);

    setTimer(newTimer);
  };

  // Go Back to Difficulty Selection 
  const goBackToDifficultySelection = () => {
    setDifficulty(null);  
    setGameOver(false);    
    setShowConfetti(false); 
    setMatchedCards([]);   
    setFlippedCards([]);   
    setMoves(0);           
    setTime(0);            
    setHours(0);          
    setMinutes(0);       
    setSeconds(0);        
    setCards([]); 
    if (timer) {
      clearInterval(timer);  
    }
  };

  const showLevelSelection = !difficulty;

  return (
    <section className="game">
      <div className="container">
        <div className="messagebox1">
          {showLevelSelection && (
            <div className="level-selection-box">
              <p>Please choose your level of difficulty!</p>
            </div>
          )}

          {/* Difficulty Selector */}
          <div className="difficulty-buttons">
            <button className={`button easy ${difficulty === "easy" ? "active" : ""}`} onClick={() => setDifficulty("easy")}>
              Easy
            </button>
            <button className={`button medium ${difficulty === "medium" ? "active" : ""}`} onClick={() => setDifficulty("medium")}>
              Medium
            </button>
            <button className={`button hard ${difficulty === "hard" ? "active" : ""}`} onClick={() => setDifficulty("hard")}>
              Hard
            </button>
          </div>
        </div>

        {/* Move and Timer counter */}
        <div className="status">
          <p>Moves: {moves}</p>
          <p>Time: {hours}h {minutes}m {seconds}s</p>
        </div>

        {/* Cards grid */}
        <div className="cards-grid cards-grid row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">
          {cards.map((card, index) => (
            <div key={index} className={`card ${flippedCards.includes(index) || matchedCards.includes(card.value) ? "flipped" : ""}`} onClick={() => handleCardClick(index)}>
              <div className="card-back"></div>
              <img src={`./assets/${card.value}.png`} alt={card.value} className="card-img" />
            </div>
          ))}
        </div>

        {/* Show Confetti Effect */}
        {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}

        {/* Game Over and Restart */}
        {gameOver && (
          <div className="game-over">
            <div className="game-over-content">
              <img src="./assets/mario_mushroom.png" alt="Mushroom" />
              <h2 className="mt-4 mb-3">Congratulations, you won!</h2>
              <div className="results-end">
                <p className="time"> Time: {hours}h {minutes}m {seconds}s</p>
                <p className="moves">Attempts: {moves}</p>
              </div>
              <h2 className="mt-3">Would you like to play again?</h2>
              <div className="game-over-buttons">
                <button className="restart-button" onClick={restartGame}>Play Again</button>
                <button className="no-button m-3" onClick={goBackToDifficultySelection}>No</button> {/* No button */}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default CardGame;
