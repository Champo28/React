export const getKingValidMoves = (board, row, col) => {
    let moves = []
    const king = board[row][col]

    if (row - 1 >= 0 && col - 1 >= 0) {
        if (board[row - 1][col - 1] === null || board[row - 1][col - 1].color !== king.color) moves.push({ x: row - 1, y: col - 1})
    }

    if (row - 1 >= 0) {
        if (board[row - 1][col] === null || board[row - 1][col].color !== king.color) moves.push({ x: row - 1, y: col })
    }

    if (row - 1 >= 0 && col + 1 <= 7) {
        if (board[row - 1][col + 1] === null || board[row - 1][col + 1].color !== king.color) moves.push({ x: row - 1, y: col + 1})
    }

    if (col + 1 <= 7) {
        if (board[row][col + 1] === null || board[row][col + 1].color !== king.color) moves.push({ x: row, y: col + 1})
    }

    if (row + 1 <= 7 && col + 1 <= 7) {
        if (board[row + 1][col + 1] === null || board[row + 1][col + 1].color !== king.color) moves.push({ x: row + 1, y: col + 1})
    }

    if (row + 1 <= 7) {
        if (board[row + 1][col] === null || board[row + 1][col].color !== king.color) moves.push({ x: row + 1, y: col })
    }

    if (row + 1 <= 7 && col - 1 >= 0) {
        if (board[row + 1][col - 1] === null || board[row + 1][col - 1].color !== king.color) moves.push({ x: row + 1, y: col - 1})
    }

    if (col - 1 >= 0) {
        if (board[row][col - 1] === null || board[row][col - 1].color !== king.color) moves.push({ x: row, y: col - 1})
    }

    console.log(moves)
    return moves
}