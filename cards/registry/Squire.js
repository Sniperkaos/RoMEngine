const $CardStats = require("../CardStats");
const $Card = require("../Card")

class Squire extends $Card {
    constructor() {
        super(null, "Squire", "cardSquire", 
        [

        ], 
        new $CardStats()
            .setATK(3)
            .setHP(10)
        )
    }
}

module.exports = Squire;