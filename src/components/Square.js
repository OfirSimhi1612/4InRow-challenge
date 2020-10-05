import React from 'react'


function Square({ column, ...props }) {


    return (
        <div className='Square' id={`square${props.index}`} onClick={() => props.move(column)}>
            {props.player &&
                <div className={`player${props.player}`}></div>
            }
        </div>
    );
}

export default Square