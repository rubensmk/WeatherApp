export function addSearch(city, state, country) {
    return {
        type: 'ADD_SEARCH',
        payload: {
            city, state, country
        },
    };
}
