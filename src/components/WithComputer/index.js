import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Board from '../Board';
import { ACTION_TYPES} from "../../constants";

function GameWithComputer() {

    const dispatch = useDispatch();

    const board = useSelector((state) => {return state.board});
    const xIsNext = useSelector((state) => {return state.xIsNext});
    const user = useSelector((state) => {return state.user});
    const winner = calculateWinner(board)
    const computerType = 'X'


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
        
        boardCopy[index] = 'O'
        
        onChangeBoard(boardCopy)
        onChangexIsNext(!xIsNext)

        computerPlay(boardCopy, !xIsNext)
    }
    
    const computerPlay = (board, xIsNext) => {
        
        setTimeout(() => {
            const index = findRandomMove(board)
            if (calculateWinner(board) || board[index]) return 
            board[index] = 'X'
            onChangeBoard(board)
            onChangexIsNext(!xIsNext)
            },
            500
        )
    }

    const startNewGame = () => {
        return (
            <button className="start__btn" onClick={() => onChangeBoard(randomMove(Array(9).fill(null)))}> New game </button>
        )
    }

    let winnerName = (winner) => winner === 'X' ? 'computer' : user.name.first;

    const randomMove = (board) => {
        onChangexIsNext(!xIsNext)
        return replace(board, findRandomMove(board), computerType);
    }
    

    const findRandomMove = (board) => {
        const emptySquares = getEmptySquares(board);
      
        if (emptySquares.length > 0) {
          const randomNum = getRandom(0, emptySquares.length);
          const index = emptySquares[randomNum][1];
      
          return index;
        }
      
        return null;
    }

    const getRandom = (start, end) => {
        return start + Math.floor(Math.random() * (end - start));
    }

    const getEmptySquares = (board) => {
        return board
          .map((val, idx) => [val, idx])
          .filter(item => item[0] === null);
    }

    const replace = (squares, index, value) => {
        return [...squares.slice(0, index), value, ...squares.slice(index + 1, squares.length)];
    }

    const maybeToe = () => {
        if (getEmptySquares(board).length > 0) {
            return 'It is '  +  ( xIsNext ? 'computer' : user.name.first)  +  ' turn'
        } else {
            return 'It is toe'
        }
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
               { winner ? 'Winner is ' + winnerName(winner) : maybeToe()}
              
            </p>
        </div>
    )
}

export default GameWithComputer