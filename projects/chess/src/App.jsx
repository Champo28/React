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

	
	const generatePawnValidMoves = (pawn) => {
		let moves = []
		let row = selected.row, col = selected.col

		if (col !== 0) {
			if (board[row - 1][col - 1] !== null && board[row - 1][col - 1].color !== pawn.color) moves.push({ x: row - 1, y: col - 1 })
		}
		
		if (col !== 7) {
			if (board[row - 1][col + 1] !== null && board[row - 1][col + 1].color !== pawn.color) moves.push({ x: row - 1, y: col + 1 })
		}
		
		if (pawn.firstMove && board[row - 2][col] === null) moves.push({ x: row - 2, y: col })
		if (board[row - 1][col] === null) moves.push({ x: row - 1, y: col })
		
		console.log(moves)
		return moves
	} 

	const pawnLogic = (pawn, target) => {
		const validMoves = generatePawnValidMoves(pawn)
		if (validMoves.some(square => square.x === target.x && square.y === target.y)) {
			pawn.firstMove = false
			return true
		}
		return false
	}

	const generateKnightValidMoves = (knight) => {
		let moves = []
		let row = selected.row, col = selected.col

		if ((row - 2 >= 0 && col + 1 <= 7) && (board[row - 2][col + 1] === null || board[row - 2][col + 1].color !== knight.color)) {
			moves.push({ x: row - 2, y: col + 1 })
		} 

		if ((row - 1 >= 0 && col + 2 <= 7) && (board[row - 1][col + 2] === null || board[row - 1][col + 2].color !== knight.color)) {
			moves.push({ x: row - 1, y: col + 2 })
		}
		 
		if ((row + 1 <= 7 && col + 2 <= 7) && (board[row + 1][col + 2] === null || board[row + 1][col + 2].color !== knight.color)) {
			moves.push({ x: row + 1, y: col + 2 })
		} 

		if ((row + 2 <= 7 && col + 1 <= 7) && (board[row + 2][col + 1] === null || board[row + 2][col + 1].color !== knight.color)) {
			moves.push({ x: row + 2, y: col + 1 })
		}

		if ((row + 2 <= 7 && col - 1 >= 0) && (board[row + 2][col - 1] === null || board[row + 2][col - 1].color !== knight.color)) {
			moves.push({ x: row + 2, y: col - 1 })
		}

		if ((row + 1 <= 7 && col - 2 >= 0) && (board[row + 1][col - 2] === null || board[row + 1][col - 2].color !== knight.color)) {
			moves.push({ x: row + 1, y: col - 2 })
		}

		if ((row - 1 >= 0 && col - 2 >= 0) && (board[row - 1][col - 2] === null || board[row - 1][col - 2].color !== knight.color)) {
			moves.push({ x: row - 1, y: col - 2 })
		} 

		if ((row - 2 >= 0 && col - 1 >= 0) && (board[row - 2][col - 1] === null || board[row - 2][col - 1].color !== knight.color)) {
			moves.push({ x: row - 2, y: col - 1 })
		} 
		console.log(moves)
		return moves
	}

	const knightLogic = (knight, target) => {
		const validMoves = generateKnightValidMoves(knight)
		if (validMoves.some(square => square.x === target.x && square.y === target.y)) {
			knight.firstMove = false
			return true
		}
		return false
	}

	const validateMove = (piece, target) => {
		console.log(target)
		switch (piece.type) {
			case "r": return rockLogic()
			case "n": return knightLogic(piece, target)
			case "b": return bishopLogic()
			case "k": return kingLogic()
			case "q": return queenLogic()
			case "p": return pawnLogic(piece, target)
			default: false
		}
	}

	const handleClick = (x, y) => {
		if (selected === null) setSelected({row: x, col: y})
		// Same square selected
		else if (selected.row === x && selected.col === y) setSelected(null)
		// Two empty squares selected
		else if (board[selected.row][selected.col] === null && board[x][y] === null) setSelected(null)
		// Empty square selected then piece selected
		else if (board[selected.row][selected.col] === null && board[x][y] !== null) setSelected(null)
		else {
			if (validateMove(board[selected.row][selected.col], {x, y})) {
				let newBoard = board.map(row => [...row])
				newBoard[x][y] = newBoard[selected.row][selected.col]
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
