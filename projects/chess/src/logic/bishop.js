export const getBishopValidMoves = (board, row, col) => {
    let moves = []
    const bishop = board[row][col]

    let i = row - 1, j = col - 1
    
    while (i >= 0 && j >= 0) {
        if (board[i][j] === null) moves.push({ x: i, y: j })
        else {
            if (board[i][j].color !== bishop.color) moves.push({ x: i, y: j })
            break
        }
        i--
        j--
    }

    i = row + 1, j = col - 1

    while (i <= 7 && j >= 0) {
        if (board[i][j] === null) moves.push({ x: i, y: j })
        else {
            if (board[i][j].color !== bishop.color) moves.push({ x: i, y: j })
            break
        }
        i++
        j--
    }

    i = row + 1, j = col + 1

    while (i <= 7 && j <= 7) {
        if (board[i][j] === null) moves.push({ x: i, y: j })
        else {
            if (board[i][j].color !== bishop.color) moves.push({ x: i, y: j })
            break
        }
        i++
        j++
    }

    i = row - 1, j = col + 1

    while (i >= 0 && j <= 7) {
        if (board[i][j] === null) moves.push({ x: i, y: j })
        else {
            if (board[i][j].color !== bishop.color) moves.push({ x: i, y: j })
            break
        }
        i--
        j++
    }

    console.log(moves)
    return moves
}