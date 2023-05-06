export interface Locations {
    a: {
        lat: number;
        lon: number;
    };
    b: {
        lat: number;
        lon: number;
    };
};
const hamilton = {
    lat: 39.41,
    lon: -84.62,
}
const fortMitchell = {
    lat: 39.03,
    lon: -84.57
}

export const locations = [hamilton, fortMitchell];

const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI / 180; // φ, λ in radians
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // in metres
}

// get distance between two points in miles
export const getDistanceMiles = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    return getDistance(lat1, lon1, lat2, lon2) * 0.000621371;
}


