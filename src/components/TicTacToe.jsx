import React, { useState, useEffect } from 'react';

const TicTacToe = ({ onClose }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (i) => {
    if (winner || board[i] || !isXNext) return; // Only allow clicks if it's Player X's turn
    const newBoard = board.slice();
    newBoard[i] = 'X';
    setBoard(newBoard);
    setIsXNext(false);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  useEffect(() => {
    const win = calculateWinner(board);
    if (win) {
      setWinner(win);
    } else if (!board.includes(null)) {
      setWinner('Draw');
    }
  }, [board]);

  // Computer Opponent (O) - Minimax for "Accurate" (Smart) moves
  useEffect(() => {
    if (!isXNext && !winner) {
      const timer = setTimeout(() => {
        const bestMove = getBestMove(board);
        if (bestMove !== -1) {
          const newBoard = board.slice();
          newBoard[bestMove] = 'O';
          setBoard(newBoard);
          setIsXNext(true);
        }
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isXNext, winner, board]);

  const getBestMove = (currentBoard) => {
    let bestScore = -Infinity;
    let move = -1;
    for (let i = 0; i < 9; i++) {
      if (currentBoard[i] === null) {
        currentBoard[i] = 'O';
        let score = minimax(currentBoard, 0, false);
        currentBoard[i] = null;
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }
    return move;
  };

  const scores = { 'O': 10, 'X': -10, 'Draw': 0 };

  const minimax = (currentBoard, depth, isMaximizing) => {
    const result = calculateWinner(currentBoard);
    if (result !== null) return scores[result];
    if (!currentBoard.includes(null)) return scores['Draw'];

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (currentBoard[i] === null) {
          currentBoard[i] = 'O';
          let score = minimax(currentBoard, depth + 1, false);
          currentBoard[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (currentBoard[i] === null) {
          currentBoard[i] = 'X';
          let score = minimax(currentBoard, depth + 1, true);
          currentBoard[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.8)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(5px)'
    }}>
      <div style={{
        background: 'var(--bg-secondary)',
        padding: '2rem',
        borderRadius: '16px',
        border: '1px solid var(--border-color)',
        textAlign: 'center',
        boxShadow: '0 0 30px rgba(0,0,0,0.5)',
        width: '350px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ margin: 0, color: 'var(--brand-primary)' }}>OX Game</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-primary)', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '1.5rem' }}>
          {board.map((square, i) => (
            <button
              key={i}
              onClick={() => handleClick(i)}
              style={{
                width: '90px',
                height: '90px',
                fontSize: '2rem',
                fontWeight: 'bold',
                color: square === 'X' ? 'var(--brand-primary)' : 'var(--status-error)',
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {square}
            </button>
          ))}
        </div>

        <div style={{ marginBottom: '1rem', height: '2rem', fontSize: '1.2rem', fontWeight: 'bold' }}>
          {winner ? (winner === 'Draw' ? "It's a Draw!" : `Winner: ${winner}`) : `Next: ${isXNext ? 'X' : 'O'}`}
        </div>

        <button 
          onClick={resetGame}
          className="action-button"
          style={{ width: '100%', padding: '0.8rem' }}
        >
          Reset Game
        </button>
      </div>
    </div>
  );
};

export default TicTacToe;
