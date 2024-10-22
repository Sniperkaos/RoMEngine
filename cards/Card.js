/**
 * 
 * @description This is the main superclass of all @link {Card} objects.
 * 
 */


/**
 * 
 * Superclass. Do not use unless necessary.
 * 
 * @param {CardArt} CardArt
 * @param {string} CardName
 * @param {CardAbility[]} CardAbilities
 * @param {CardStat} CardStats
 * 
 */

const {SummonType, CardState} = require("./CardEnums");


class Card {

    /**
     * 
     * @param {CardArt} CardArt 
     * @param {string} displayName 
     * @param {string} registryName 
     * @param {CardAbility[]} CardAbilities 
     * @param {CardStats} CardStats 
     */

    constructor(CardArt, displayName, registryName, CardAbilities, CardStats) {

        this.art = CardArt;
        this.registryName = registryName;
        this.displayName = displayName;
        this.abilities = CardAbilities;
        this.stats = CardStats;
        this.turnStatus = null; //-- true if can take turn, false if turn ended, null if card doesn't exist

        this.target = null;
    }


    /**
     * 
     * @param {Battle} battle
     * @param {BattleSummoner} summoner
     * @param {Vector2} v2Pos 
     * @param {SummonType} summonType
     */

    instance(battle, summoner, v2Pos, summonType) {
        // creates an instance of this object and returns it for mapping

        let instance = battle.buildCreature(this, battle, summoner, v2Pos, summonType);
        //Main.renderer.renderAt(v2Pos, this.art);
        if(SummonType.CARD_SUMMON.equals(summonType)) {
            // check for predator
            if(battle.predatorExists(summoner.getTeam().enemy())) {
                instance.kill();
            }
        }

        return instance;
    }

    delete() {
        throw new Error("The default card constructor cannot delete an object, instance it first!")
    }

    /**
     * 
     * @param {Card} Card 
     */

    tryAttack(Card) {
        throw new Error("The default card constructor cannot attack, instance it first!")
    }
    /**
     * 
     * @param {CardState} state 
     */
    tryAbility(state, context) {
        for(let ab = 0; ab < this.abilities.length; i++) {
            if(ab == null) continue;
            if(!ab instanceof CardAbility) continue;
            // get ability state
            let ab_state_requirement = ab.getState();
            if(ab_state_requirement.equals(state)) {
                ab.apply(this, context);
            }
        }
    }

    /**
     * @param {CardState} state;
     */
    update(state) {
        
        switch(state) {

            case CardState.PRE_ATTACK.isEqual(state):
                console.log("pre_attack")
                this.tryAbility(CardState.PRE_ATTACK);
                this.nextState();
                break;

            case CardState.ANIMATE_MOVEMENT.isEqual(state):
                console.log("animating");
                break;
        }

    }

    canBeAttacked() {
        return true;
    }

    zoneIsEmpty() {
        return true;
    } 

    getRenderFriendlyName() {
        return this.displayName;
    }
}


module.exports = Card;