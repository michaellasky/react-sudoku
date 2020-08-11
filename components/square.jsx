import Tile from './tile';

const Square = ({
    values = [], 
    state, 
    symbols, 
    squareIdx, 
    onSelectTile }) => {

    const numVals = values.length;
    const numCols = Math.sqrt(numVals);
    
    return (
        <>
        <div tabIndex={squareIdx} className="sudoku-square">
            {values.map((tileData, key) => 
                <Tile {...{ 
                    tileData, 
                    symbols, 
                    key, 
                    state,  
                    onSelectTile }} />)
            }
        </div>
        <style jsx>{`
            .sudoku-square {
                padding: 0.05em;
                display: grid;
                grid-gap: 0.25em;  
                grid-template-columns: repeat(${numCols}, minmax(1em, 1fr));
                grid-template-rows: repeat(${numCols}, minmax(1em, 1fr));
            }

            .sudoku-square::before {
                content: '';
                width: 0;
                padding-bottom: 100%;
                grid-row: 1 / 1;
                grid-column: 1 / 1;
                display: none;
            }

            .sudoku-square > *:first-child {
                grid-row: 1 / 1;
                grid-column: 1 / 1;
            }
        `}</style>
        </>
    );
}

export default Square;