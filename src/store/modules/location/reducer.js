import producer from 'immer';

const INITIAL_STATE = {
    latitude: 0,
    longitude: 0,
};

const location = (state = INITIAL_STATE, action) => {
    return producer(state, draft => {
        switch (action.type) {
            case 'LOCATION_LAT_LNG': {
                const { lat, long } = action.payload;

                draft.latitude = lat;
                draft.longitude = long;

                break;
            }
            default: {
                return draft;
            }
        }
    });
};

export default location;