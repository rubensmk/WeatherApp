import producer from 'immer';

const INITIAL_STATE = {
    items: []
};

const searches = (state = INITIAL_STATE, action) => {
    return producer(state, draft => {
        switch (action.type) {
            case 'ADD_SEARCH': {
                const { city, state, country } = action.payload;

                draft.items.push({ city, state, country })

                break;
            }
            default: {
                return draft;
            }
        }
    });
};

export default searches;