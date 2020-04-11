function board (symbols = [1,2,3,4,5,6,7,8,9]) {
    const rowLabels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
    const numSymbols = symbols.length;
    const squareLength = Math.sqrt(numSymbols);
    const boardSize = Math.pow(numSymbols, 2);
    const symbolKeys = [...symbols.keys()];
    const boardData = symbols.map(row => Array(numSymbols));

    if (!Number.isInteger(squareLength)) {
        throw "Number of symbols must be a perfect square"
    }

    function getLabel (row, col) {
        return rowLabels[row] + (col + 1);
    }

    function getPosition (label) {
        const [row, col] = label.split('');
        return [rowLabels.indexOf(row), col - 1];
    }

    function generateUnits () {

        function generateSquares () {
            
            function col (squareIdx, colIdx) {
                const offset = squareIdx * squareLength;
                return ((colIdx % squareLength) + offset) % numSymbols;
            }
        
            function row (squareIdx, colIdx) {
                const rowOffset = ~~(squareIdx / squareLength) * squareLength;
                return rowOffset + ~~(colIdx / squareLength);
            }
        
            return symbolKeys.map(squareIdx => 
                symbolKeys.map(colIdx => 
                    getLabel(row(squareIdx, colIdx), col(squareIdx, colIdx))
            ));
        }
        
        function generateRows () {
            return symbolKeys.map(
                rowIdx => symbolKeys.map(
                    colIdx => getLabel(rowIdx, colIdx)
            ));
        }

        function generateColumns () {
            return symbolKeys.map(
                colIdx => symbolKeys.map(
                    rowIdx => getLabel(rowIdx, colIdx)
            ));
        }
        
        const squares = generateSquares(squareLength);
        const rows = generateRows(squareLength);
        const cols = generateColumns(squareLength);

        return symbolKeys.map(row => 
            symbolKeys.map(col => {
                console.log(row, col, squares);
                return new Set(
                    squares[~~(row / squareLength)][col / squareLength].concat(rows[row].concat(cols[col])))
        }));
    }

    const units = generateUnits(squareLength);

    function possibileValues(pos, board) {
        const [row, col] = getPosition(pos);

        const usedSymbols = Array
            .from(units[row][col])                      // Array of labels
            .map(label => getPosition(label))           // Array of positions
            .map(([row, col]) => typeof board[row] === 'undefined'? undefined:  board[row][col])   // Array of values
            .filter(val => typeof val !== 'undefined'); 

        return symbols.filter(s => !usedSymbols.includes(s));
    }

    function randomPossibility (pos, board) {
        const pVals = possibileValues(pos, board);
        const rndIdx = ~~(Math.random() * 100 % pVals.length);
        return pVals[rndIdx];
    }

    function createRandomArray (size) {
        const sorted = [...Array(size).keys()];
        return sorted.reduce((acc, key) => {
            const randomIdx = ~~(Math.random() * 10 % (size - 1));
            const val = acc[key];
            acc[key] = acc[randomIdx];
            acc[randomIdx] = val;
            
            return acc;
        }, sorted);
    }

    function createRandomBoard () {
        console.log(boardSize);
        return [...Array(boardSize).keys()].reduce((board, key) => {
            const colIdx = key % numSymbols;
            const rowIdx = ~~(key / numSymbols);
            
            if (typeof board[rowIdx] === 'undefined') { board[rowIdx] = []; }
            board[rowIdx][colIdx] = randomPossibility(getLabel(rowIdx, colIdx), board);
            return board;
        
        }, []);
    }

    return ({
        possibileValues,
        getPosition,
        getLabel,
        createRandomBoard
    });
}