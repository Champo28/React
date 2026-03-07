export const getPawnValidMoves = (board, row, col) => {
    let moves = []
    const pawn = board[row][col]

    if (pawn.color === "white") {
        if (col !== 0) {
            if (board[row - 1][col - 1] !== null && board[row - 1][col - 1].color !== pawn.color) moves.push({ x: row - 1, y: col - 1 })
        }
        
        if (col !== 7) {
            if (board[row - 1][col + 1] !== null && board[row - 1][col + 1].color !== pawn.color) moves.push({ x: row - 1, y: col + 1 })
        }
        
        if (pawn.firstMove && board[row - 2][col] === null) moves.push({ x: row - 2, y: col })
        if (board[row - 1][col] === null) moves.push({ x: row - 1, y: col })
    }
    
    else {
        if (col !== 7) {
            if (board[row + 1][col + 1] !== null && board[row + 1][col + 1].color !== pawn.color) moves.push({ x: row + 1, y: col + 1 })
        }
        
        if (col !== 0) {
            if (board[row + 1][col - 1] !== null && board[row + 1][col - 1].color !== pawn.color) moves.push({ x: row + 1, y: col - 1 })
        }
        
        if (pawn.firstMove && board[row + 2][col] === null) moves.push({ x: row + 2, y: col })
        if (board[row + 1][col] === null) moves.push({ x: row + 1, y: col })
    }
    
    console.log(moves)
    return moves
} 