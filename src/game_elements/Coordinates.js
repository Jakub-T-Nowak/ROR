// x,y
// _____________
// |           | |
// |           | |
// |           | | height
// |           | |
// |___________| |
// _____________
//     width

const mainAxis = [20, 180, 340, 500];

const rectanglesMemo = [];
const dotsMemo = [];

const dotsCoordinates = () => {
    if (dotsMemo.length !== 0) {
        return dotsMemo;
    }

    const XandY = mainAxis;

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

    let XandY = mainAxis.map((val) => val + 20);
    XandY.pop();

    rectanglesMemo.push({ x: 0, y: 0, width: 520, height: 520 });
    XandY.forEach((x) => {
        XandY.forEach((y) => {
            rectanglesMemo.push({ x, y, width, height });
        });
    });

    return rectanglesMemo;
};

export { dotsCoordinates, rectanglesCoordinates, mainAxis };
