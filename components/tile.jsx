import classNames from 'classnames';
import { ACTIONS } from './reducer';
import { useContext } from 'react';

const Tile = ({ tileData, symbols, state, onSelectTile }) => {
    
    let { key, value, notes, fixed } = tileData;

    if (typeof notes === 'undefined') { notes = new Set(); } 
    
    const className = classNames({
        selected: state.selectedTile === key,
        notes: !value,
        notesMode: state.notesMode,
        fixed,
        free: !fixed
    });
    
    return (
        <>
        <div onClick={() => onSelectTile(key)} className={className}>
            {value || symbols.map(
                s => <span key={s} className={notes.has(s)? 'active': ''}>
                    {s}
                </span>)}
        </div>

        <style jsx>{`
            div {
                border-radius: 0.25em;
                color: #c0c0c0;
                background-color: #675b70;
                animation-duration: 0.7s;
                animation-name: slidein;
                line-height: 1em;
                font-size: 1em;
                font-weight: 1000;
                display: grid;
                justify-content: space-around;
                align-content: space-around;
            }

            div.fixed {
                background-color: #524755;
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

            div.free:hover {
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