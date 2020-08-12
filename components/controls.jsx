import SymbolSelector from './symbolSelector';
import { ACTIONS } from './reducer';
import classNames from 'classnames'; 
import Switch from 'react-switch';
import Modal from 'react-modal';
import { useState } from 'react';

const Controls = ({
    symbols, 
    state, 
    dispatch, 
    onSelectSymbol}) => {
    
    Modal.setAppElement('#page-container');

    const [newGameModalOpen, setNewGameModalOpen] = useState(false);

    const notesClass = classNames({
        'notes-mode': state.notesMode
    });

    const eraseClass = classNames({
        'erase-mode': state.eraseMode
    });

    const modalStyle = {
        overlay: {
            backgroundColor: '#333333'
        },
        content : {
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)'
        }
      };

    return (
        <>
        <div name='controls'>
            <SymbolSelector {...{symbols, state, onSelectSymbol }} />
            <fieldset name="button container">
                <span>
                    <button onClick={() => setNewGameModalOpen(true)}>
                        Main Menu
                    </button>
                </span>
                <span>
                    <Switch 
                        id='notes-switch' 
                        onChange={() => dispatch(ACTIONS.TOGGLE_NOTES_MODE)} 
                        checked={!!state.notesMode} />
                    <label className={notesClass} htmlFor='notes-switch'>
                        Notes
                    </label>
                </span>
                <span>
                    <Switch 
                        id='erase-switch' 
                        onChange={() => dispatch(ACTIONS.TOGGLE_ERASE_MODE) } 
                        checked={!!state.eraseMode} />
                    <label className={eraseClass} htmlFor='erase-switch'>
                        Erase
                    </label>
                </span>
                <span>
                    <h3>Hotkeys</h3>
                    <p>shift + n - Toggle Notes Mode</p>
                    <p>shift + e - Toggle Erase Mode</p>
                    <p>{symbols[0]} - {symbols[symbols.length - 1]} - Select Symbol</p>
                </span>
            </fieldset>

        </div>
        <Modal 
            isOpen={newGameModalOpen} 
            style={modalStyle}
            onRequestClose={() => setNewGameModalOpen(false)}>
            <h2>Are you sure you want to exit this game?</h2>
            <p>All progress on your current game will be lost.</p>
            <span className='modal-buttons'>
                <button onClick={() => setNewGameModalOpen(false)}>Cancel</button>
                <button onClick={() => location.href='/'}>Yes</button>
            </span>
        </Modal>
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
                grid-template-columns: repeat(4, 1fr);
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

            label.notes-mode, label.erase-mode {
                text-shadow: 0 0 3px #f8ffad;
            }

            .modal-buttons {
                display: grid;
                grid-template-columns: 1fr 1fr;
                align-items: space-around;
                justify-items: space-around;
                grid-gap: 1em;
            }

            input[type="range"] {
                display: block;
            }

            h3 {
                font-size: 70%;
                margin: 0.25em;
            }

            fieldset[name="button container"] p {
                font-size: 45%;
                margin: 0;
                padding: 0;
            }

        `}</style>
        </>
    );
}

export default Controls;