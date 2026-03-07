export const getRookValidMoves = (board, row, col) => {
    let moves = []
    const rook = board[row][col]

    for (let i = row + 1; i <= 7; i++) { 
        if (board[i][col] === null) moves.push({ x: i, y: col })
        else {
            if (board[i][col].color !== rook.color) moves.push({ x: i, y: col })
            break
        }
    }

    for (let i = row - 1; i >= 0; i--) { 
        if (board[i][col] === null) moves.push({ x: i, y: col })
        else {
            if (board[i][col].color !== rook.color) moves.push({ x: i, y: col })
            break
        }
    }

    for (let i = col + 1; i <= 7; i++) { 
        if (board[row][i] === null) moves.push({ x: row, y: i })
        else {
            if (board[row][i].color !== rook.color) moves.push({ x: row, y: i })
            break
        }
    }

    for (let i = col - 1; i >= 0; i--) { 
        if (board[row][i] === null) moves.push({ x: row, y: i })
        else {
            if (board[row][i].color !== rook.color) moves.push({ x: row, y: i })
            break
        }
    }

    console.log(moves)
    return moves
}