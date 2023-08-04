export default class KeyEvent {
    #navigationRules;

    constructor() {
        window.addEventListener("keydown", (e) => {
            this.#keys(e.code);
        });
    }

    set rules(rules) {
        this.#navigationRules = rules;
    }

    #keys(keyCode) {
        this.#check(this.#navigationRules[keyCode])
    }

    #check (keyFunction) {
        if (keyFunction) {
            keyFunction();
        }
    }
}
