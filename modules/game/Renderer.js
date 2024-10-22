class Renderer {
    constructor() {}

    render(layer, object) {
        console.log("rendering at layer ", layer, " object ", object);
    }

    renderBattle(battle, lane) {
        let battle_str_renderer = ""
        for(var y=0; y<battle.sizeY; y++) {
            battle_str_renderer = battle_str_renderer.concat("Player");
            for(var x=0; x<battle.sizeX; x++) {
                battle_str_renderer = battle_str_renderer.concat(" ").concat("[").concat(lane[y][x].displayName).concat("]")
            }
            battle_str_renderer = battle_str_renderer.concat(" Player");
            battle_str_renderer = battle_str_renderer.concat("\n")
            console.log(battle_str_renderer)
        }
        console.log(battle_str_renderer);
    }

}

module.exports = new Renderer();