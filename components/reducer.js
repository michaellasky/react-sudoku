export const ACTIONS = {
    SET_STATE: 0,
    SET_TILE_VALUE: 1,
    SET_SELECTED_SYMBOL: 2,
    SET_SELECTED_TILE: 3,
    TOGGLE_NOTES_MODE: 4,
    TOGGLE_ERASE_MODE: 5,
    SET_SOLVED: 6,
    ADD_NOTE: 7,
    REMOVE_NOTE: 8,
    UPDATE_SEED: 9,
    CHANGE_DIFFICULTY: 10
};

export const reducer = (state, {type, payload}) => {
    switch (type) {
        case ACTIONS.SET_STATE:
            return payload.state;

        case ACTIONS.SET_TILE_VALUE:
            if (!state.boardData[payload.key].fixed) {
                state.boardData[payload.key].value = payload.value;
            }
            return { ...state };

        case ACTIONS.SET_SELECTED_SYMBOL:
            return { ...state, selectedSymbol: payload.symbol };
        
        case ACTIONS.SET_SELECTED_TILE:
            if (payload.tile && payload.tile.fixed) { return state; }

            return { ...state, selectedTile: payload.tile };
        
        case ACTIONS.TOGGLE_NOTES_MODE:
            return { ...state, eraseMode: false, notesMode: !state.notesMode };
        
        case ACTIONS.TOGGLE_ERASE_MODE:
            return { ...state, notesMode: false, eraseMode: !state.eraseMode };

        case ACTIONS.SET_SOLVED:
            return { ...state, solved: true };
        
        case ACTIONS.ADD_NOTE:
            const notes = state.boardData[payload.key].notes || new Set();
            
            if (notes.has(payload.value)) { notes.delete(payload.value); }
            else                          { notes.add(payload.value);    }
            
            state.boardData[payload.key].notes = notes;
            return state;
            
        case ACTIONS.REMOVE_NOTE:
            if (typeof state.boardData[payload.key].notes !== 'undefined') {
                state.boardData[payload.key].notes.delete(payload.value);
            }
            return state;

        case ACTIONS.UPDATE_SEED:
            return {...state, seed: payload.seed };

        case ACTIONS.CHANGE_DIFFICULTY:
            return {...state, difficulty: payload.difficulty };

        default:
            return state;
    }
};
