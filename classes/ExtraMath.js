class ExtraMath {
    constructor() {

    }

    clamp(num, min, max) {
        return Math.min(Math.max(num, min), max)
    }
}

module.exports = new ExtraMath()