import seedrandom from 'seedrandom';

function boardGenerator (
    gameSeed, 
    symbols = [1,2,3,4,5,6,7,8,9], 
    decimationFactor = 0.7) {

    const numSymbols = symbols.length;
    const squareLength = Math.sqrt(numSymbols);
    const boardSize = Math.pow(numSymbols, 2);
    const symbolKeys = [...symbols.keys()];
    const config = createBoardConfig();
    const random = seedrandom(gameSeed);

    if (!Number.isInteger(squareLength)) {
        throw "Number of symbols must be a perfect square"
    }
    
    function labelFromPosition (x, y) {
        return `${y}${x}`;
    }
    
    function positionFromLabel (label) {
        const [y, x] = label.split('').map(n => Number.parseInt(n));
        return [x, y];
    }
    
    function keyFromPosition ([x, y]) {
        return y * numSymbols + x;
    }
    
    function positionFromKey (key) {
        return [key % numSymbols, ~~(key / numSymbols)];
    }
    
    function squareFromPosition (x, y, squares) {
        const rowOffset = ~~(x / squareLength) * squareLength;
        const colOffset = ~~(y / squareLength);
        return squares[rowOffset + colOffset];
    }

    function createBoardConfig () {

        function generateSquares () {3
            
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
                    labelFromPosition(
                        row(squareIdx, colIdx), 
                        col(squareIdx, colIdx))
            ));
        }
        
        function generateRows () {
            return symbolKeys.map(
                x => symbolKeys.map(
                    y => labelFromPosition(x, y)));
        }

        function generateColumns () {
            return symbolKeys.map(
                y => symbolKeys.map(
                    x => labelFromPosition(x, y)));
        }

        const squares = generateSquares(squareLength);
        const rows = generateRows(squareLength);
        const cols = generateColumns(squareLength);
        const units = symbolKeys.map(
            x => symbolKeys.map(
                y => new Set(
                    squareFromPosition(x, y, squares)
                            .concat(rows[x]
                                .concat(cols[y])))
        ));

        return { squares, rows, cols, units };
    }

    function possibileValues (label, board) {
        const [x, y] = positionFromLabel(label);

        const usedSymbols = Array
            .from(config.units[x][y]) 
            .map(positionFromLabel)
            .map(keyFromPosition)
            .map(key => board[key]) 
            .filter(value => typeof value !== 'undefined') 
            .map(tileData => tileData.value);

        return symbols.filter(s => !usedSymbols.includes(s));
    }

    function randomPossibility (pVals) {
        const rndIdx = ~~(random() * 100 % pVals.length);
        return pVals[rndIdx];
    }

    function randomIndices (num, max) {
        let result = []; 
        while (result.length !== num - 1) {
            const rnd = ~~(random() * (max * 10) % max);
            if (!result.includes(rnd)) { result = [...result, rnd]; }
        }

        return result;
    }

    function generateBoard (board = [], startIdx = 0, tried = []) {
        
        if (typeof board[startIdx] === 'undefined') { board[startIdx] = {}; }
        
        const [x, y] = positionFromKey(startIdx);
        const label = labelFromPosition(x, y);
        const pVals = possibileValues(label, board);
        const untriedVals = pVals.filter(val => !tried.includes(val));
        const value = randomPossibility(untriedVals);
        const square = squareFromPosition(x, y, config.squares);
        const fixed = true;

        board[startIdx] = { value, label, square, x, y, key: startIdx, fixed };

        if (typeof value === 'undefined') {
            return false;
        }
        else if (startIdx === boardSize - 1) {
            return board;
        }
        else {
            return generateBoard(board, startIdx + 1,) || 
                   generateBoard(board, startIdx, [...tried, value]);
        }
    }

    function boardIsSolved (board) {
        function containsAllSymbols(labels) {
            const values = labels
                .map(positionFromLabel)
                .map(keyFromPosition)
                .map(i => board[i].value);

            return symbols.reduce((acc, s) => acc && values.includes(s), true);
        }
        
        return [...config.rows, ...config.cols, ...config.squares].reduce(
            (acc, collection) => acc && containsAllSymbols(collection), true);
    }

    function decimateBoard (board, factor) {
        const numToDestroy = ~~(boardSize * factor);
        const indicesToRemove = randomIndices(numToDestroy, boardSize - 1);
        
        return board.map((tileData, idx) => ({ 
            ...tileData, 
            value: indicesToRemove.includes(idx) ? undefined : tileData.value ,
            fixed: !indicesToRemove.includes(idx)
        }));
    }

    return ({ 
        boardData: decimateBoard(generateBoard(), decimationFactor), 
        config, 
        labelFromPosition,
        positionFromKey,
        positionFromLabel,
        keyFromPosition,
        boardIsSolved,
        solved: false,
        seed: gameSeed,
        decimationFactor: decimationFactor
    });
}

export default boardGenerator;