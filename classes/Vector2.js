class Vector2 {
    constructor(vX, vY) {
        this.x = vX;
        this.y = vY;
    }

    get X() {
        return this.x;
    }
    get Y() {
        return this.y;
    }

    /**
     * @param {Vector2} addV2
     */
    add(addV2) {
        return new Vector2(this.X() + addV2.X(), this.Y() + addV2.Y());
    }
    /**
     * @param {Vector2} subtractV2
     */
    subtract(subtractV2) {
        return new Vector2(this.X() - addV2.X(), this.Y() - addV2.Y());
    }
    
}


module.exports = Vector2;