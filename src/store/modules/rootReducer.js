import { combineReducers } from 'redux';

import location from './location/reducer';
import searches from './searches/reducer';

export default combineReducers({
    location,
    searches,
});