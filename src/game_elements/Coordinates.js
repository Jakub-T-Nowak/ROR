// x,y
// _____________
// |           | |
// |           | |
// |           | | height
// |           | |
// |___________| |
// _____________
//     width

const rectanglesMemo = [];
const dotsMemo = [];

const dotsCoordinates = () => {
    if (dotsMemo.length !== 0) {
        return dotsMemo;
    }
    const XandY = [20, 180, 340, 500];
    for (var x = 20; x <= 500; x += 20) {
        XandY.forEach((y) => dotsMemo.push({ x, y }));
        if (!XandY.includes(x)) {
            const y = x;
            XandY.forEach((x) => dotsMemo.push({ x, y }));
        }
    }
    return dotsMemo;
};

const rectanglesCoordinates = () => {
    if (rectanglesMemo.length !== 0) {
        return rectanglesMemo;
    }

    const width = 120;
    const height = 120;
    const XandY = [40, 200, 360];
    rectanglesMemo.push({ x: 0, y: 0, width: 520, height: 520 });
    XandY.forEach((x) => {
        XandY.forEach((y) => {
            rectanglesMemo.push({ x, y, width, height });
        });
    });

    return rectanglesMemo;
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
