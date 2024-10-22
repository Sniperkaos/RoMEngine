const $Battle = require("./game/Battle");

class Game {
    constructor(cm) {
        this.cardManager = cm;
    }

    startBattle(Team1, Team2) {
        return new $Battle(Team1, Team2, 10, 2);
    }

    getRenderer() {
        return this.renderer;
    }

    get cm() {
        return this.cardManager;
    }
}

module.exports = Game;