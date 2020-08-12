import { useState } from "react";

const Menu = () => {

    const [difficulty, setDifficulty] = useState(70);

    function onChangeDifficulty (e) {
        setDifficulty(e.target.value);
    }

    function onClickNewGame () {
        location.href = `/sudoku?difficulty=${difficulty}`
    }

    return (
        <>
        <div>
            <button onClick={onClickNewGame}>New Game</button>
            <input 
                type='range' 
                value={difficulty} 
                id='game-difficulty' 
                onChange={onChangeDifficulty}
                min={10} max={90} />
            <label htmlFor='game-difficulty'>Difficulty</label>
        </div>

        <style jsx>{`
            div {
                width: 100%;
                display: grid;
                grid-template-columns: 1fr;
                justify-items: center;
            }

            button {
                width: 12em;
            }

            label {
                color: #fc7303;
                font-size: 80%;
            }
        `}</style>
        </>
    );
}

export default Menu;