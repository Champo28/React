import { useState } from 'react'
import './App.css'

class Piece {
	constructor(type, color, firstMove = false) {
		this.type = type
		this.color = color
		this.firstMove = firstMove
	}
}

const initializeBoard = () => {
	let board = []
	for(let i = 0; i < 8; i++) {
		board[i] = [];
		for(let j = 0; j < 8; j++) {
			board[i][j] = null;
		}
	}
	// Black pieces
	board[0][0] = new Piece("r", "black", true);
	board[0][1] = new Piece("n", "black", true);
	board[0][2] = new Piece("b", "black", true);
	board[0][3] = new Piece("q", "black", true);
	board[0][4] = new Piece("k", "black", true);
	board[0][5] = new Piece("b", "black", true);
	board[0][6] = new Piece("n", "black", true);
	board[0][7] = new Piece("r", "black", true);

	for (let i = 0; i < 8; i++) {
		board[1][i] = new Piece("p", "black", true);
	}
	
	// White pieces
	board[7][0] = new Piece("r", "white", true);
	board[7][1] = new Piece("n", "white", true);
	board[7][2] = new Piece("b", "white", true);
	board[7][3] = new Piece("q", "white", true);
	board[7][4] = new Piece("k", "white", true);
	board[7][5] = new Piece("b", "white", true);
	board[7][6] = new Piece("n", "white", true);
	board[7][7] = new Piece("r", "white", true);

	for (let i = 0; i < 8; i++) {
		board[6][i] = new Piece("p", "white", true);
	}

	return board
}

const mapPieces = (piece) => {
	switch (piece.type) {
		case "r": return piece.color === "black" ? "♜" : "♖";
		case "n": return piece.color === "black" ? "♞" : "♘";
		case "b": return piece.color === "black" ? "♝" : "♗";
		case "q": return piece.color === "black" ? "♛" : "♕";
		case "k": return piece.color === "black" ? "♚" : "♔";
		case "p": return piece.color === "black" ? "♟" : "♙";
		default: ""
	}
}

function App() {

	const [board, setBoard] = useState(initializeBoard())
	const [selected, setSelected] = useState(null)

	const handleClick = (x, y) => {
		if (selected == null) setSelected({row: x, col: y})
		else if (selected.row === x && selected.col === y) setSelected(null)
		else {
			let newBoard = board.map(row => [...row])
			newBoard[x][y] = newBoard[selected.row][selected.col]
			newBoard[selected.row][selected.col] = null
			setBoard(newBoard)
			setSelected(null) 
		}
	}

	return (
		<>
			<div className='board'>
				{board.map((row, rowIndex) => row.map((piece, colIndex) => {
					return <div key={`${rowIndex}-${colIndex}`} 
							className={`square ${(rowIndex + colIndex) % 2 === 0 ? ' light' : ' dark'}`} 
							onClick={() => handleClick(rowIndex, colIndex)}
							>
								{piece && mapPieces(piece)}
						</div>
				}))}
			</div>
		</>
	)
}

export default App
