const {DamageType} = require("./CardEnums")

class CardStats {
    constructor() {
        this.HP = 3;
        this.ATTACKS = 1;
        this.ATTACK = 1;
        this.MOVEMENT = 2;
        this.ATTACK_RANGE = 2
        this.DAMAGE_TYPE = DamageType.PHYSICAL
    }

    get hp() {
        return this.HP;
    }

    setHP(hp) {
        this.HP = hp;
        return this;
    }

    setAttacks(attacks) {
        this.ATTACKS = attacks;
        return this;
    }

    setATK(atk) {
        this.ATTACK = atk;
        return this;
    }

    setMovement(move) {
        this.MOVEMENT = move;
        return this;
    }

    setATKRange(range) {
        this.ATTACK_RANGE = range;
        return this;
    }

    setDamageType(type) {
        this.DAMAGE_TYPE = type;
        return this;
    }

    get attacks() {
        return this.ATTACKS;
    }

    get dmgType() {
        return this.DAMAGE_TYPE;
    }

    get atk() {
        return this.ATTACK;
    }

    get move() {
        return this.MOVEMENT;
    }

    get range() {
        return this.ATTACK_RANGE;
    }
}

module.exports = CardStats;