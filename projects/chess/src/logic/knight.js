export const getKnightValidMoves = (board, row, col) => {
    let moves = []
    const knight = board[row][col]

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