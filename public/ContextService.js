class contextService {
    #context;

    setContext (context) {
        if (this.#context === undefined) {
            this.#context = context;
        } else {
            console.log("Context was already seted, you can't change this property");
        }
    }

    getContext () {
        return this.#context;
    }
}

export default new contextService();