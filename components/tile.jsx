import classNames from 'classnames';
import { ACTIONS } from './reducer';
import { useContext } from 'react';

const Tile = ({ tileData, symbols, state, onSelectTile }) => {
    
    let { key, value, notes } = tileData;

    if (typeof notes === 'undefined') { notes = new Set(); } 
    
    const className = classNames({
        selected: state.selectedTile === key,
        notes: !value,
        notesMode: state.notesMode
    });
    
    function onClick () { onSelectTile(key); }

    return (
        <>
        <div {...{ onClick, className}}>
            {value || symbols.map(
                s => <span className={notes.has(s)? 'active': ''}>{s}</span>)}
        </div>

        <style jsx>{`
            div {
                border-radius: 0.25em;
                background-color: #675b70;
                color: #c0c0c0;
                animation-duration: 0.7s;
                animation-name: slidein;
                line-height: 1em;
                font-size: 1em;
                font-weight: 1000;
                display: grid;
                justify-content: space-around;
                align-content: space-around;
            }

            div.notes {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
            }

            div.notes span {
                color: #ff0000;
                font-size: 60%;
                visibility: hidden;
                text-align: center;
            }
            
            div.notesMode {
                background-color: #cfaf70;
                color: #333333;
            }

            div.notesMode span {
                visibility: visible;
                color: #af8f60;
            }

            div.notes span.active {
                visibility: visible;
                color: #999999;
            }

            div.notesMode span.active {
                color: #666666;
            }

            .selected {
                background-color: #ffffff;
            }

            div:hover {
                background-color: #c0c5c1;
                cursor: pointer;
                color: #333333;
            }

            @keyframes slidein {
                from {
                    opacity: 0%
                }
            
                to {
                    opacity: 100%;
                }
            }  
        `}</style>
        </>
    );
};

export default Tile;