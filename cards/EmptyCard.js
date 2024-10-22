const Enums = require("../modules/constants.json");
const Card = require("./Card");

class EmptyCard extends Card {
    constructor() {
        super(null, "Empty", [], null);
    }

    update() {
        return true;
    }

    canBeAttacked() {
        return false;
    }

    zoneIsEmpty() {
        return true;
    }

    getRenderFriendlyName() {
        return "Empty";
    }
}


module.exports = EmptyCard;