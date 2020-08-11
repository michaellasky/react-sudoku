import { ACTIONS } from './reducer';

const SymbolSelector = ({symbols, state, dispatch, onSelectSymbol }) => {

    function onClick (symbol) {
        return () => { onSelectSymbol(symbol); };
    }

    return (
        <>
        <div name="symbol selector">
            {symbols.map(
                symbol => {
                    const isSelected = symbol === state.selectedSymbol;
                    const className = isSelected? 'selected': '';
                    
                    return (
                        <a onClick={onClick(symbol)}>
                            <span className={className}>{symbol}</span>
                        </a>
                    )}
            )}
        </div>
        <style jsx>{`
            div {
                width: 100%;
                box-sizing: border-box;
                display: flex;
                justify-content: space-around;
            }

            a {
                cursor: pointer;
            }
            span {
                display: grid;
                justify-items: center;
                align-items: center;
                font-weight: bold;
                width: 2em;
                height: 2em;
                border-radius: 1em;
                background-color: #ffffc0;
                margin-top: 1em;
            }

            span.selected {
                background-color: #ff0000;
            }
        `}</style>
        </>
    );
};

export default SymbolSelector;