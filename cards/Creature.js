const $CardManager = global.$CardManager;
const Main = global.Main;
const $Vector2 = require("../classes/Vector2");
const {SummonType, CardState, TurnState} = require("./CardEnums");
const Card = require("./Card.js");
const Vector2 = require("../classes/Vector2");
const ExtraMath = require("../classes/ExtraMath.js");
const EmptyCard = require("./EmptyCard.js");


class Creature extends Card {

        /**
     * 
     * @param {Card} card
     * @param {Battle} battle
     * @param {BattleSummoner} summoner
     * @param {Vector2} v2Pos 
     * @param {SummonType} summonType
     * @param {string} registryName
     */

    constructor(
        card, battle, summoner, v2Pos, summonType
    ) {
        super(card.art, card.displayName, card.registryName, card.abilities, card.stats);

        this.battlePos = v2Pos;
        this.battle = battle;
        this.summoner = summoner;
        this.summonType = summonType;


        console.log(this.stats);
        // stats
        this.damage_type = this.stats.dmgType;
        this.atk = this.stats.atk;
        this.hp = this.stats.hp;
        this.move = this.stats.move;
        this.attacks = this.stats.attacks;
        this.flag_for_death = false;
        this.range = this.stats.range;
        this.movementDirection = 1;
    }

    setMovementDirection(dir) {
        this.movementDirection = ExtraMath.clamp(dir, -1, 1);
    }
    /**
     * @param {Battle} battle
     * @param {TurnState} state 
     */

    update = (battle, state) => {
        if(state.equals(TurnState.ENDING)) {
            let interrupt = battle.tryMove(this, new Vector2(this.move, 0))
            if (interrupt) {
                let {movement, creature_in_spot} = interrupt;
                if(movement > 0) {
                    battle.tryMove(new Vector2(movement,0))
                }
                if(creature_in_spot) {
                    this.attack(creature_in_spot);
                }
            }
        }
    }

    /**
     * @param {Creature} creature 
     */
    attack(creature) {
        for(let attacks = 0; attacks < this.attacks; attacks++) {
          //  Main.renderer.render.apply(this, 'attack')
            this.tryAbility(CardState.PRE_ATTACK, this);
            this.tryAbility(CardState.ATTACK, this, creature);
            let result = creature.tryDoDamage(this.atk, this.damage_type, this);
            this.tryAbility(CardState.POST_ATTACK, this, result);
        }
    }

    /**
     * 
     * @param {int} damage 
     * @param {DamageType} damage_type 
     * @param {Creature} context 
     */
    tryDoDamage = (damage, damage_type, context) => {
        let result = this.tryAbility(CardState.BEING_DAMAGED, {
            damage : damage,
            damage_type : damage_type,
            context: context
        });

        // if it gets past this point I might need cancer 
        if(result) {
            this.hp -= ExtraMath.clamp(result.damage, 0, 1337);
        } else {
            this.hp -= ExtraMath.clamp(damage, 0, 1337);
        }

        console.log(this.displayName, " has been attacked! New HP: ", this.hp);

        if(this.hp <= 0) {
            this.kill(context.battle);
        }


        return result;
    }

    kill(battle) {
        console.log(this.displayName, " has been slain!")
        this.flag_for_death = true;
        battle[this.battlePos.Y][this.battlePos.X] = new EmptyCard();
    }
}

module.exports = Creature;