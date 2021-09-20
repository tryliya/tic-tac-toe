import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Board from '../Board';
import { ACTION_TYPES} from "../../constants";


import './style.css';

function Game() {

    const dispatch = useDispatch();

    const board = useSelector((state) => {return state.board});
    const xIsNext = useSelector((state) => {return state.xIsNext});

    const winner = calculateWinner(board);


    const onChangeBoard= (board) => {
        
        const changeBoardAction = {
        type: ACTION_TYPES.CHANGE_BOARD,
        payload: board
        }
    
        dispatch(changeBoardAction);
    }

    const onChangexIsNext = (xIsNext) => {
       
        const changexIsNextAction = {
          type: ACTION_TYPES.CHANGE_X_IS_NEXT,
          payload: xIsNext
        }
      
        dispatch(changexIsNextAction);
      }

    const handleClick = (index) => {
        const boardCopy = [...board]
       
        if (winner || boardCopy[index]) return
        
        boardCopy[index] = xIsNext ? 'X' : 'O'
        
        onChangeBoard(boardCopy)
        onChangexIsNext(!xIsNext)
    }

    const getEmptySquares = (board) => {
        return board
          .map((val, idx) => [val, idx])
          .filter(item => item[0] === null);
    }

    const maybeToe = () => {
        if (getEmptySquares(board).length > 0) {
            return 'It is '  +  ( xIsNext ? 'X' : 'O')  +  ' turn'
        } else {
            return 'It is toe'
        }
    }

    const startNewGame = () => {
        return (
            <button className="start__btn" onClick={() => onChangeBoard(Array(9).fill(null))}> New game </button>
        )
    }

    function calculateWinner(squares) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i]
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a]
            }
        }
        return null
    }


    return (
        <div className="wrapper">
            { startNewGame() }
            <Board squares={board} click={handleClick} />
            <p className="game__info">
               { winner ? 'Winner is ' + winner : maybeToe()}
            </p>
        </div>
    )
}

export default Game;