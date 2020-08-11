import { useEffect, useReducer, useRef } from "react";
import boardGenerator from './generator';
import { ACTIONS, reducer } from './reducer';
import Square from './square';
import Controls from './controls';
import classNames from 'classnames';
import { GlobalHotKeys } from 'react-hotkeys';
import { useHotkeys } from "react-hotkeys-hook";


const SudokuBoard = ({seed, symbols}) => {

    const squaredSize = Math.sqrt(symbols.length);
    const symbolKeys = [...symbols.keys()];
    const emptySquares = [...Array(symbols.length).keys()].map(_ => '?');
    const [state, dispatch] = useReducer(reducer, {});

    const { 
        boardData, 
        config, 
        positionFromLabel, 
        keyFromPosition, 
        boardIsSolved 
    } = state;
    
    useEffect(() => {
        if (typeof seed !== 'undefined') {
            const state = boardGenerator(seed, symbols);
            dispatch({type: ACTIONS.SET_STATE, payload: { state }});
        }
    }, [seed]);

    if (!state.solved && 
        typeof boardIsSolved === 'function' &&  
        boardIsSolved(boardData)) 
    {
        dispatch({ type: ACTIONS.SET_SOLVED });
    }

    useHotkeys('n', () => dispatch({ type: ACTIONS.TOGGLE_NOTES_MODE }));
    symbols.forEach(s => useHotkeys(s, () => onSelectSymbol(s), [state]));

    function squareValues (squareIdx) {
        if (!state || !config) { return []; }

        return config.squares[squareIdx]
            .map(positionFromLabel)
            .map(keyFromPosition)
            .map(key => boardData[key]);
    }

    function onSelectTile (key) {
        // This tile is already selected, deselect it
        if (state.selectedTile === key) {
            dispatch({
                type: ACTIONS.SET_SELECTED_TILE,
                payload: { tile: undefined }
            });
        }
    
        if (state.selectedSymbol) {
            if (state.notesMode) {
                dispatch({
                    type: ACTIONS.ADD_NOTE,
                    payload: { key, value: state.selectedSymbol }
                });
            } 
            else {
                dispatch({
                    type: ACTIONS.SET_TILE_VALUE, 
                    payload: { key, value: state.selectedSymbol }
                });    
            }
    
            dispatch({
                type: ACTIONS.SET_SELECTED_TILE,
                payload: { tile: undefined }
            });
        }
        else {
            dispatch({type: ACTIONS.SET_SELECTED_TILE, payload: { tile: key }});
        }
    }
    
    function onSelectSymbol (symbol) {
        if (state.selectedSymbol === symbol) {
            dispatch({
                type: ACTIONS.SET_SELECTED_SYMBOL,
                payload: { symbol: undefined }
            });
        }
        else if (state.selectedTile) {
            if (state.notesMode) {
                dispatch({
                    type: ACTIONS.ADD_NOTE,
                    payload: { key: state.selectedTile, value: symbol }
                })
            }
            else {
                dispatch({
                    type: ACTIONS.SET_TILE_VALUE, 
                    payload: { key: state.selectedTile, value: symbol }
                });
            }
            
            dispatch({
                type: ACTIONS.SET_SELECTED_SYMBOL,
                payload: { symbol: undefined }
            });
    
            dispatch({
                type: ACTIONS.SET_SELECTED_TILE,
                payload: { tile: undefined }
            });
        }
        else {
            dispatch({
                type: ACTIONS.SET_SELECTED_SYMBOL, 
                payload: { symbol }
            });
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
                        dispatch,
                        symbols,
                        values: squareValues(squareIdx) || emptySquares, 
                        squareIdx,
                        onSelectTile }} />)}
        </div>

        <Controls {...{ symbols, state, dispatch, onSelectSymbol }} />
        <style jsx>{`
            
            div[name="sudoku container"] {
                display: grid;
                padding: 1em;
                grid-template-columns: repeat(${squaredSize}, 1fr);
                grid-template-rows: repeat(${squaredSize}, 1fr);
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
                background-color: #ff0000;
            }
        `}</style>
        </>
    );
};

export default SudokuBoard;