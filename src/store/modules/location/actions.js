export function setLocationRedux(lat, long) {
    return {
        type: 'LOCATION_LAT_LNG',
        payload: {
            lat,
            long
        },
    };
}
