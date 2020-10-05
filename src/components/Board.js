import React, {useState,useEffect} from 'react';
import Modal from '@material-ui/core/Modal';

function Board() {
    const [board, setBoard] = useState([[]]); 
    const [winner, setWinner] = useState();

    function emptyBoard(){
        const gameBoard = [];
        for(let i = 0; i < 7; i++){
            gameBoard[i] = [];
/*           for(Your Code Here){
                // Your Code Here
            }  */
        };
        setBoard(gameBoard);
        setWinner(false);
    }

    useEffect(() => {
        emptyBoard();
    }, [])

  return (
      <>
    <div className="Board">
        {
            board.map((column, i) => {
                return <>
                {i===0&& <div className="divider" />} {/* the red column separating each column */}
                <div className="Column" id={`column${i}`}>
                <span>{i}</span> {/* should remove once you understand the concept */}
                {
                    /* 
                        here you should have your squares implemented, each with a className 'Square' and an id of - square0 -> square1 -> square2
                    */
                }
                </div>
                <div className="divider" /> {/* the red column separating each column */}
                </>
            })
        }
    </div>

            <Modal open={winner? true : false} onClose={()=> {emptyBoard();}}>
                <div className ='winModal'>
                    <h2>Game Finished !</h2>
                    <h2>{winner ==='tie'? 'A Tie !':`Winner is: player ${winner}`}</h2>
                </div>
            </Modal>
        </>

  );
}


export default Board;
