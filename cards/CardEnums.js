const Enum = (state) => {
    return Object.create({
        toString: () => { 
            return state;
        },
        isEqual: (compare_state) => {
            return state == compare_state;
        },
        equals: (compare_state) => {
            return state == compare_state;
        }
    });
}

// PreAttack, Attack, PostAttack, PreMovement, Movement, PostMovement, TurnEnd, PostTurnEnd

const CardState = {
    MOVEMENT: Enum("CardState.MOVEMENT"),
    PRE_ATTACK: Enum("CardState.PRE_ATTACK"),
    ATTACK: Enum("CardState.ATTACK"),
    POST_ATTACK: Enum("CardState.POST_ATTACK"),
    PRE_MOVEMENT: Enum("CardState.PRE_MOVEMENT"),
    POST_MOVEMENT: Enum("CardState.POST_MOVEMENT"),
    TURN_END: Enum("CardState.POST_MOVEMENT"),
    BEING_DAMAGED: Enum("CardState.BEING_DAMAGED")
}

const TurnState = {
    BEGINNING: Enum("TurnState.BEGINNING"),
    ENDING: Enum("TurnState.ENDING")
}

const SummonType = {
    NATURAL: Enum("SummonType.NATURAL"),
    CARD_SUMMON: Enum("SummonType.CARD_SUMMON")
}

const DamageType = {
    TRUE: Enum("DamageType.TRUE"),
    PHYSICAL: Enum("DamageType.PHYSICAL")
}

module.exports = {CardState:CardState, SummonType:SummonType, DamageType:DamageType, TurnState:TurnState};