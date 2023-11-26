//       first
    //   _____________
    // f |           | s
    // i |           | e
    // r |           | c
    // s |           | o
    // t |___________| n
    //      second     d

    // maybe it's too condense to do all collision controls in one function.
    // but it seams resonable and DRY.
    
    // think about:
    // - collision c. for whole rectangle,
    // - collision c. for single line.

    export const collisionControl = (
        movingElementPosition,
        movingElementSpeed,
        movingElementRadius,
        rect,
        rectangleType,
        axisType,
    ) => {
        const { axis, secondAxis } = axisCheck(axisType);

        const { borderFactorCourse, borderFactorSecondAxis } =
            borderCheck(rectangleType);

        const { axisFirst, axisSecond, secondAxisFirst, secondAxisSecond } =
        helperFunction(axisType, rectangleType, rect, movingElementRadius);

        // axis check
        const firstAxisCollision = movingElementPosition[axis] === axisFirst;
        const secondAxisdCollision = movingElementPosition[axis] === axisSecond;

        // speed check
        const onCollisionCourseFirst = movingElementSpeed * borderFactorCourse > 0;
        const onCollisionCourseSecond = movingElementSpeed * borderFactorCourse < 0;

        // second axis check
        const anotherAxisCollisinanTop = movingElementPosition[secondAxis] > secondAxisFirst;
        const anotherAxisCollisinanDown = movingElementPosition[secondAxis] < secondAxisSecond;
        const anotherAxisCollisinan = anotherAxisCollisinanTop && anotherAxisCollisinanDown;

        // final collision checks
        const isFirstCollision =
            firstAxisCollision &&
            anotherAxisCollisinan &&
            onCollisionCourseFirst;
        const isSecondCollision =
            secondAxisdCollision &&
            anotherAxisCollisinan &&
            onCollisionCourseSecond;
        const isCollision = isFirstCollision || isSecondCollision;

        return isCollision;
    }

    const helperFunction = (axisType, rectangleType, rect, movingElementRadius) => {
        const objectRadius = movingElementRadius;
        const { axis, secondAxis } = axisCheck(axisType);
        const { dimension, secondDimension } = dimensionCheck(axisType);
        const { borderFactorCourse, borderFactorSecondAxis } = borderCheck(rectangleType);
        return {
            axisFirst: rect[axis] - objectRadius * borderFactorCourse,
            axisSecond: rect[axis] + rect[dimension] + objectRadius * borderFactorCourse,
            secondAxisFirst: rect[secondAxis] - objectRadius * borderFactorCourse - borderFactorSecondAxis,
            secondAxisSecond: rect[secondAxis] + rect[secondDimension] + objectRadius * borderFactorCourse + borderFactorSecondAxis,
        };
    }

    const borderCheck = (rectangleType) => {
        // We know that in board array 0 is always game border rectangle.
        // Thats why we can do that check.
        // (propably in fututre it will be replaced with more self-descriptive mechanism)
        if (rectangleType === 0) {
            // border
            return { borderFactorCourse: -1, borderFactorSecondAxis: 1 };
        } else {
            // rectangle
            return { borderFactorCourse: 1, borderFactorSecondAxis: 0 };
        }
    }

    const axisCheck = (axisType) => {
        if (axisType === "x") {
            return { axis: "x", secondAxis: "y" };
        } else {
            return { axis: "y", secondAxis: "x" };
        }
    }

    const dimensionCheck = (axisType) => {
        if (axisType === "x") {
            return { dimension: "width", secondDimension: "height" };
        } else {
            return { dimension: "height", secondDimension: "width" };
        }
    }