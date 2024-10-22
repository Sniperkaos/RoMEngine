const { TurnState, SummonType } = require("../../cards/CardEnums");
const EmptyCard = require("../../cards/EmptyCard");
const Vector2 = require("../../classes/Vector2");
const Creature = require("../../cards/Creature")
const $Renderer = require("./Renderer");
class Battle {
    /**
     * 
     * @param {Team} Team1 
     * @param {Team} Team2 
     */
    constructor(Team1, Team2, sizeX, sizeY) {
        this.team1 = Team1;
        this.team2 = Team2;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        this.currentTurn = Team1;
        this.turnAmount = 0;
        this.turnDelay = 8; // seconds
        this.turnSeconds = 0;
        this.post_turn_bullshit = [];
        this.battle = [];
        this.battleState = TurnState.BEGINNING;
        for(let y = 0; y<sizeY; y++) {
            this.battle[y] = new Array(sizeY);
            for(let x=0; x<sizeX; x++) {
                this.battle[y][x] = new EmptyCard();
            }
        }
    }

    get turn() {
        return this.currentTurn;
    }

    begin() {
        console.log("starting battle")
        setInterval(()=>{
            this.turnSeconds+=1;
            if(this.turnSeconds >= this.turnDelay) {
                console.log("rendering screen");
                $Renderer.renderBattle(this, this.battle);
                this.turnSeconds = 0;
                this.advanceTurn();
            }
        }, 1000)

        setTimeout(()=> {
            this.summon(this.team1.getPlayers()[0], "cardSquire")
        }, 2000)

        setTimeout(()=> {
            this.summon(this.team2.getPlayers()[0], "cardSquire", new Vector2(8,1))
        }, 2000)
    }

    summon(summoner, registryValue, at) {
        global.game.cardManager.card(registryValue).instance(this, summoner, at || new Vector2(1, 1), SummonType.NATURAL)
        $Renderer.renderBattle(this, this.battle);
    }

    buildCreature(card, battle, summoner, v2Pos, summonType) {

        let creature = new Creature(card, battle, summoner, v2Pos, summonType);
        if(this.team2.contains(summoner)) {
            console.log("setting move dir to -1")
            creature.setMovementDirection(-1);
        }

        this.battle[v2Pos.Y][v2Pos.X] = creature;
        creature.battlePos = v2Pos;
    }

    tryMove(creature, movePos) {
        var movement = 0;
        console.log("moving");
        for(let x=creature.battlePos.X+(1*creature.movementDirection); x<=movePos.X+(creature.move * creature.movementDirection);x++) {
            let creature_in_spot = this.battle[creature.battlePos.Y][x];
            if (creature_in_spot instanceof EmptyCard) {
                movement += 1;
                continue;
            } else {
                return {movement, creature_in_spot};
            }
        }


        if(!creature.flag_for_death) {
            this.post_turn_bullshit.push(()=>{
                let old_creature = creature;
    
                // make the old place empty
                this.battle[creature.battlePos.Y][creature.battlePos.X] = new EmptyCard();
               
                // exchange the cards
                this.battle[creature.battlePos.Y][(creature.battlePos.X + (movePos.X * old_creature.movementDirection))] = old_creature;
               
                // set the new battlepos
                old_creature.battlePos = new Vector2((creature.battlePos.X + (movePos.X * old_creature.movementDirection)) , creature.battlePos.Y);
        
                $Renderer.renderBattle(this, this.battle);
            })
        }

        return false;
    }

    advanceTurn() {
        console.log("advancing turn");
        this.battleState = TurnState.ENDING;
        for(var y=0; y<this.sizeY; y++) {
            for(var x=0; x<this.sizeX; x++) {
                if(this.battle[y][x] instanceof EmptyCard) continue;
                this.battle[y][x].update(this, this.battleState);
            }
        }

        if(this.currentTurn.isSimilar(this.team1)) {
            this.currentTurn = this.team2;
        } else if(this.currentTurn.isSimilar(this.team2)) {
            this.currentTurn = this.team1;
        }

        this.post_turn_bullshit.forEach(/** @param {function} fn */(fn) => {
            fn.call(this);
        })

        this.post_turn_bullshit = [];

       /* switch(this.currentTurn) {
            case (this.currentTurn.isSimilar(this.Team1)): 
                this.currentTurn = this.Team2;
                break;
            case (this.currentTurn.isSimilar(this.Team2)):
                this.currentTurn = this.Team1;
                break;
            default: 
                throw new Error("CurrentTurn is neither Team1 nor Team2, could not proceed.")
                break;
        }*/
        this.battleState = TurnState.BEGINNING;
    }

    get turnTimer() {
        return this.turnAmount;
    }
}

module.exports = Battle;