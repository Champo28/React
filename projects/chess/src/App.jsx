import { useState } from 'react'
import './App.css'
import { getPawnValidMoves } from './logic/pawn'
import { getKnightValidMoves } from './logic/knight'
import { getBishopValidMoves } from './logic/bishop'
import { getRookValidMoves } from './logic/rook'
import { getQueenValidMoves } from './logic/queen'
import { getKingValidMoves } from './logic/king'

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
	board[0][0] = new Piece("r", "black", true)
	board[0][1] = new Piece("n", "black", true)
	board[0][2] = new Piece("b", "black", true)
	board[0][3] = new Piece("q", "black", true)
	board[0][4] = new Piece("k", "black", true)
	board[0][5] = new Piece("b", "black", true)
	board[0][6] = new Piece("n", "black", true)
	board[0][7] = new Piece("r", "black", true)

	for (let i = 0; i < 8; i++) {
		board[1][i] = new Piece("p", "black", true)
	}
	
	// White pieces
	board[7][0] = new Piece("r", "white", true)
	board[7][1] = new Piece("n", "white", true)
	board[7][2] = new Piece("b", "white", true)
	board[7][3] = new Piece("q", "white", true)
	board[7][4] = new Piece("k", "white", true)
	board[7][5] = new Piece("b", "white", true)
	board[7][6] = new Piece("n", "white", true)
	board[7][7] = new Piece("r", "white", true)

	for (let i = 0; i < 8; i++) {
		board[6][i] = new Piece("p", "white", true)
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

	const validateMove = (board, row, col, target) => {
		const validMoves = getValidMoves(board, row, col)
		return validMoves.some(square => square.x == target.x && square.y == target.y)
	}

	const getValidMoves = (board, row, col) => {
		const piece = board[row][col]

		if (!piece) return []

		switch (piece.type) {
			case "r": return getRookValidMoves(board, row, col)
			case "n": return getKnightValidMoves(board, row, col)
			case "b": return getBishopValidMoves(board, row, col)
			case "k": return getKingValidMoves(board, row, col)
			case "q": return getQueenValidMoves(board, row, col)
			case "p": return getPawnValidMoves(board, row, col)
			default: []
		}
	}

	const handleClick = (x, y) => {
		if (selected === null) setSelected({ row: x, col: y })
		// Same square selected
		else if (selected.row === x && selected.col === y) setSelected(null)
		// Two empty squares selected
		else if (board[selected.row][selected.col] === null && board[x][y] === null) setSelected(null)
		// Empty square selected then piece selected
		else if (board[selected.row][selected.col] === null && board[x][y] !== null) setSelected(null)
		else {
			if (validateMove(board, selected.row, selected.col, { x, y })) {
				let newBoard = board.map(row => [...row])
				newBoard[x][y] = newBoard[selected.row][selected.col]
				newBoard[x][y].firstMove = false
				newBoard[selected.row][selected.col] = null
				setBoard(newBoard)
			}
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
