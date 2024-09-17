export const interp = (val: any) => (min: any, max: any) => {
    return val.interpolate({
        inputRange: [0, 1],
        outputRange: [min, max]
    })
}

export const rInterp = (delta: any, min: any, max: any, percent = false) => {
    'worklet';
    const range = max - min
    return (min + range * delta) + (percent ? '%' : 0)
}