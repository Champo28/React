import { getBishopValidMoves } from "./bishop"
import { getRookValidMoves } from "./rook"

export const getQueenValidMoves = (board, row, col) => {
    let moves = getBishopValidMoves(board, row, col)
    moves.push(...getRookValidMoves(board, row, col))
    console.log(moves)
    return moves
}