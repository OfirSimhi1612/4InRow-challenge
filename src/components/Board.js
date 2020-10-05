import React, { useState, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import Square from './Square'
// import './Board.css'

function Board() {
    const [board, setBoard] = useState([[]]);
    const [winner, setWinner] = useState();
    const [player, setPlayer] = useState(1)

    function emptyBoard() {
        const gameBoard = [];
        for (let i = 0; i < 7; i++) {
            gameBoard[i] = [];
            for (let j = 0; j < 6; j++) {
                gameBoard[i][j] = null;
            };
        };
        // console.log(gameBoard)
        setBoard(gameBoard);
        setWinner(false);
        setPlayer(1)
    }

    function playerMove(y) {

        const tempBoard = [...board]

        const index = tempBoard[y].findIndex(square => square === null)

        if (index !== -1) {
            tempBoard[y][index] = player
            let emptySqure = true
            for (let i = 0; i < 7; i++) {
                for (let x = 0; x < 6; x++) {
                    if (tempBoard[i][x] === null) {
                        emptySqure = false
                    }
                }
            }
            if (emptySqure) {
                setWinner('tie')
            }
            checkWinner(tempBoard)
            setBoard(tempBoard)
            setPlayer(player === 1 ? 2 : 1)

        } else {
            return
        }

    }

    const checkWinner = (board) => { // check for winner

        const horizontal = (x, y, count, player) => {


            if (x > 6 || board[y][x] !== player) {
                return false
            }

            count = count + 1
            if (count === 4) {

                return true
            } else {
                return horizontal(x + 1, y, count, player)
            }

        }

        const vertical = (x, y, count, player) => {

            if (y > 6 || board[y][x] !== player) {
                return false
            }

            count = count + 1
            console.log(count)
            if (count === 4) {
                return true
            } else {
                return vertical(x, y + 1, count, player)
            }
        }

        const plusDiagonal = (x, y, count, player) => {

            if (y > 5 || x > 6 || board[y][x] !== player) {
                return false
            }

            count = count + 1
            if (count === 4) {
                return true
            } else {
                return plusDiagonal(x + 1, y + 1, count, player)
            }
        }

        const minusDiagonal = (x, y, count, player) => {

            if (y < 0 || x > 6 || board[y][x] !== player) {
                return false
            }

            count = count + 1
            console.log(count)
            if (count === 4) {
                return true
            } else {
                return minusDiagonal(x + 1, y - 1, count, player)
            }
        }



        for (let x = 0; x < 7; x++) {
            for (let y = 0; y < 6; y++) {
                // if (board[y][x] === null) {
                //     continue
                // }
                if (x < 4) {
                    if (horizontal(x, y, 0, player)) {
                        setWinner(player)
                    }
                }
                if (y < 3) {
                    if (vertical(x, y, 0, player)) {
                        setWinner(player)
                    }
                }
                if (x < 4 && y < 3) {
                    if (plusDiagonal(x, y, 0, player)) {
                        setWinner(player)
                    }
                }
                if (x < 4 && y > 3) {
                    if (minusDiagonal(x, y, 0, player)) {
                        setWinner(player)
                    }
                }
            }
        }
    }



    useEffect(() => {
        emptyBoard();
    }, [])

    return (
        <>
            <div className="Board">
                {board.map((column, i) => {
                    return <>
                        {i === 0 && <div className="divider" />}

                        <div className="Column" id={`column${i}`}>
                            {column.map((square, index) => {
                                return <Square
                                    player={square}
                                    move={playerMove}
                                    column={i}
                                    index={index}
                                />
                            })}
                        </div>
                        <div className="divider" /> {/* the red column separating each column */}
                    </>
                })}
            </div>

            <Modal open={winner ? true : false} onClose={() => { emptyBoard(); }}>
                <div className='winModal'>
                    <h2>Game Finished !</h2>
                    <h2>{winner === 'tie' ? 'A Tie !' : `Winner is: player ${winner}`}</h2>
                </div>
            </Modal>
        </>

    );
}


export default Board;
