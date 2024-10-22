
const $Card = require("../../cards/Card");
const GameManager = require("./GameManager")

class CardManager extends GameManager {
    constructor() {
        super()
        this.registry = new Map();
    }

    /**
     * @param {$Card} CardClass 
     */
    registerCard(CardClass) {
        console.log("Registering card ".concat(CardClass))
        this.registry.set(CardClass.registryName, CardClass)
    }

    /**
     * @param {string} registryName
     */
    card(registryName) {
        return this.registry.get(registryName);
    }
}

module.exports = CardManager;