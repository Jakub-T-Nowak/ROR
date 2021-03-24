import RoundedRect from './Rectangle.js';

export default class LifeCycle {

	constructor () {
		const width = 120;
        const height = 120;
        const board = [
            new RoundedRect(0, 0, 520, 520),

            new RoundedRect(40, 40, width, height),
            new RoundedRect(200, 40, width, height),
            new RoundedRect(360, 40, width, height),

            new RoundedRect(40, 200, width, height),
            new RoundedRect(200, 200, width, height),
            new RoundedRect(360, 200, width, height),

            new RoundedRect(40, 360, width, height),
            new RoundedRect(200, 360, width, height),
            new RoundedRect(360, 360, width, height)
        ];

        return board
	}
}