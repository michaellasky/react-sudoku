import { useEffect, useReducer, useRef } from "react";
import boardGenerator from './generator';
import { ACTIONS, reducer } from './reducer';
import Square from './square';
import Controls from './controls';
import classNames from 'classnames';
import { useHotkeys } from "react-hotkeys-hook";

const SudokuBoard = ({seed, symbols, decimationFactor}) => {

    const sqrootSize = Math.sqrt(symbols.length);
    const numTiles = Math.pow(symbols.length, 2);
    const symbolKeys = [...symbols.keys()];
    const emptySquares = [...Array(symbols.length).keys()].map(_ => '?');
    const [state, _dispatch] = useReducer(reducer, {});

    const { 
        boardData, 
        config, 
        positionFromLabel, 
        keyFromPosition, 
        boardIsSolved
    } = state;

    useEffect(() => {
        if (typeof seed !== 'undefined') {
            const state = boardGenerator(seed, symbols, decimationFactor);
            dispatch(ACTIONS.SET_STATE, { state });
        }
    }, [seed, decimationFactor]); 

    if (!state.solved && boardIsSolved && boardIsSolved(boardData)) {
        dispatch(ACTIONS.SET_SOLVED);
    }

    useHotkeys('shift+n', () => dispatch(ACTIONS.TOGGLE_NOTES_MODE));
    useHotkeys('shift+e', () => dispatch(ACTIONS.TOGGLE_ERASE_MODE));
    symbols.forEach(s => useHotkeys(s, () => onSelectSymbol(s), [state]));


    function dispatch(type, payload) {
        return _dispatch({type, payload});
    }

    function squareValues (squareIdx) {
        if (!state || !config) { return []; }

        return config.squares[squareIdx]
            .map(positionFromLabel)
            .map(keyFromPosition)
            .map(key => boardData[key]);
    }

    function onSelectTile (key) {
        if (state.selectedTile === key) {
            dispatch(ACTIONS.SET_SELECTED_TILE, { tile: undefined });
        }
    
        if (state.eraseMode) {
            dispatch(ACTIONS.SET_TILE_VALUE, { key, value: undefined });
        }
        else if (state.selectedSymbol) {
            if (state.notesMode) {
                dispatch(ACTIONS.ADD_NOTE, { key, value: state.selectedSymbol });
            } 
            else {
                dispatch(ACTIONS.SET_TILE_VALUE, 
                         { key, value: state.selectedSymbol });    
            }
            dispatch(ACTIONS.SET_SELECTED_TILE, { tile: undefined });
        }
        else {
            dispatch(ACTIONS.SET_SELECTED_TILE, { tile: key });
        }
    }
    
    function onSelectSymbol (symbol) {
        if (state.selectedSymbol === symbol) {
            dispatch(ACTIONS.SET_SELECTED_SYMBOL, { symbol: undefined });
        }
        else if (state.selectedTile) {
            if (state.notesMode) {
                dispatch(ACTIONS.ADD_NOTE,
                         { key: state.selectedTile, value: symbol });
            }
            else {
                dispatch(ACTIONS.SET_TILE_VALUE,
                         { key: state.selectedTile, value: symbol });
            }
            
            dispatch(ACTIONS.SET_SELECTED_SYMBOL, { symbol: undefined });
            dispatch(ACTIONS.SET_SELECTED_TILE,   { tile: undefined   });
        }
        else {
            dispatch(ACTIONS.SET_SELECTED_SYMBOL, { symbol });
        }
        
    }

    const className = classNames({ 
        solved: state.solved,
        notesMode: state.notesMode 
    });

    return (
        <>
        <div name='sudoku container' {...{ className }} >
            {symbolKeys.map(
                (squareIdx) => 
                    <Square {...{
                        key: squareIdx, 
                        state,
                        symbols,
                        values: squareValues(squareIdx) || emptySquares, 
                        squareIdx,
                        onSelectTile }} />)}
        </div>

        <Controls {...{ 
            symbols, state, dispatch, onSelectSymbol }} />
        <style jsx>{`
            
            div[name="sudoku container"] {
                display: grid;
                padding: 1em;
                grid-template-columns: repeat(${sqrootSize}, 1fr);
                grid-template-rows: repeat(${sqrootSize}, 1fr);
                grid-gap: 0.5em;
            }

            div[name="sudoku container"]::before {
                content: '';
                width: 0;
                padding-bottom: 100%;
                grid-row: 1 / 1;
                grid-column: 1 / 1;
                display: none;
            }
            
            div[name="sudoku container"].notesMode {
                background-color: #ffdfa0;
            }

            div[name="sudoku container"]  > *:first-child {
                grid-row: 1 / 1;
                grid-column: 1 / 1;
            }

            div[name="sudoku container"].solved {
                background: linear-gradient(27deg, #1dff00, #c000ff);
                background-size: 400% 400%;
            
                -webkit-animation: AnimationName 15s ease infinite;
                -moz-animation: AnimationName 15s ease infinite;
                animation: AnimationName 15s ease infinite;
            }
            
            @-webkit-keyframes AnimationName {
                0%{background-position:99% 0%}
                50%{background-position:2% 100%}
                100%{background-position:99% 0%}
            }
            @-moz-keyframes AnimationName {
                0%{background-position:99% 0%}
                50%{background-position:2% 100%}
                100%{background-position:99% 0%}
            }
            @keyframes AnimationName {
                0%{background-position:99% 0%}
                50%{background-position:2% 100%}
                100%{background-position:99% 0%}
            }
        `}</style>
        </>
    );
};

export default SudokuBoard;