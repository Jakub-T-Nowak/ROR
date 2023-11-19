const dotsCoordinates = () => {
    const XandY = [20, 180, 340, 500];
    const coordinates = [];
    for (var x = 20; x <= 500; x += 20) {
        XandY.forEach((y) => coordinates.push({x, y}));
        if (!XandY.includes(x)) {
            const y = x;
            XandY.forEach((x) => coordinates.push({x, y}));
        }
    }
    return coordinates;
};

const rectanglesCoordinates = () => {
    const width = 120;
    const height = 120;
    const XandY = [40, 200, 360];
    const coordinates = [];
    coordinates.push({ x: 0, y: 0, width: 520, height: 520 });
    XandY.forEach((x) => {
        XandY.forEach((y) => {
            coordinates.push({ x, y, width, height });
        });
    });

    return coordinates;
};

// const rectanglesCoordinates = () => {
//     const width = 80;
//     const height = 80;
//     const XandY = [40, 160, 280, 400];
//     const coordinates = [];
//     coordinates.push([0, 0, 520, 520]);
//     XandY.forEach((x) => {
//         XandY.forEach((y) => {
//             coordinates.push([x, y, width, height]);
//         });
//     });

//     return coordinates;
// };

export { dotsCoordinates, rectanglesCoordinates };
