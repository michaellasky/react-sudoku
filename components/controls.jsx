import SymbolSelector from './symbolSelector';
import { ACTIONS } from './reducer';
import classNames from 'classnames'; 
import Switch from 'react-switch';

const Controls = ({symbols, state, dispatch, onSelectSymbol}) => {
    function toggleNotes () {
        dispatch({ type: ACTIONS.TOGGLE_NOTES_MODE });
    }

    function newGame () {
        location.href = '/';
    }

    const className = classNames({
        'notes-mode': state.notesMode
    });

    return (
        <>
        <div name='controls'>
            <SymbolSelector {...{symbols, state, dispatch, onSelectSymbol }} />
            <fieldset name="button container">
                <span>
                    <Switch 
                        id='notes-switch' 
                        onChange={toggleNotes} 
                        checked={state.notesMode} />
                    <label className={className} htmlFor='notes-switch'>
                        Notes
                    </label>
                </span>
                <span>
                    <button onClick={newGame}>New Game</button>
                </span>
            </fieldset>

        </div>
        <style jsx>{`
            div {
                background-color: #ff0000;
                background-color: #555;
                border: 1px solid #555;
                width: 100%;
                text-align: center;
            }

            fieldset[name="button container"] {
                margin: 1em;
                padding: 0;
                border: 0;
                display: grid;
                grid-template-columns: 1fr 1fr;
                align-items: space-around;
            }

            fieldset[name="button container"] > span {
                display: inline-block;
            }

            label {
                display: block;
                font-size: 80%;
                color: #c0c0c0;
            }

            label.notes-mode {
                text-shadow: 0 0 3px #f8ffad;
            }



        `}</style>
        </>
    );
}

export default Controls;