export const ACTIONS = {
    SET_STATE: 0,
    SET_TILE_VALUE: 1,
    SET_SELECTED_SYMBOL: 2,
    SET_SELECTED_TILE: 3,
    TOGGLE_NOTES_MODE: 4,
    SET_SOLVED: 5,
    ADD_NOTE: 6,
    REMOVE_NOTE: 7
};

export const reducer = (state, {type, payload}) => {
    switch (type) {
        case ACTIONS.SET_STATE:
            return payload.state;

        case ACTIONS.SET_TILE_VALUE:
            state.boardData[payload.key].value = payload.value;
            return state;

        case ACTIONS.SET_SELECTED_SYMBOL:
            return { ...state, selectedSymbol: payload.symbol };
        
        case ACTIONS.SET_SELECTED_TILE:
            return { ...state, selectedTile: payload.tile };
        
        case ACTIONS.TOGGLE_NOTES_MODE:
            return { ...state, notesMode: !state.notesMode }

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
    }
};
