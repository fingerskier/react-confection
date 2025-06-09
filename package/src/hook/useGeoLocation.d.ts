declare const useGeolocation: () => {
    position: {
        timestamp: Date;
        latitude: number;
        longitude: number;
        accuracy: number;
        altitude: number;
        altitudeAccuracy: number;
        heading: number | null;
        speed: number | null;
    } | undefined;
    error: string | null;
};
export default useGeolocation;
