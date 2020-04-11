import { useState } from "react";

const SudokuTile = ({row, col}) => {
    return (
        <div>{row},{col}</div>
    );
};

const SudokuBoard = ({board = Array(9)}) => {
    const size = board.length;
    const keys = [...Array(size).keys()];
    const [boardState, setBoard] = useState(board);
    console.log(`${keys.map(k => '1fr ')}`)
    return (
        <>
        <div className='sudoku-container'>
            {keys.map(row => {
                keys.map(col => {
                    <SudokuTile {...{row, col}} />
                });
            })}
        </div>
        <style jsx>{`
            .sudoku-container {
                display: grid;
                grid-template-columns: ${keys.map(k => '1fr ')};
            }
        `}</style>
        </>
    );
};

export default SudokuBoard;