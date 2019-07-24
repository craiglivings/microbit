export const transform = (direction: number, speed: number): { left: number; right: number } => {
    const slowSpeed = Math.round((1 - Math.abs(direction) / 10) * Math.abs(speed));
    if (direction === 0) {
        return { left: speed, right: speed };
    }
    if (speed === 0) {
        return { left: direction, right: -direction };
    }
    if (direction > 0) {
        return { left: speed, right: speed < 0 && slowSpeed !== 0 ? -slowSpeed : slowSpeed };
    } else {
        return { left: speed < 0 ? -slowSpeed : slowSpeed, right: speed };
    }
};
