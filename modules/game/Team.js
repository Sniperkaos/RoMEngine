class Team {
    /**
     * 
     * @param {Summoner[]} players 
     */
    constructor(players) {
        this.players = [];
        players.forEach(player => {
            this.players.push(player);
        });
    }

    /**
     * @param {Team} enemy
     */
    set setEnemy(enemy) {
        this.enemy = enemy;
    }

    getPlayers() {
        return this.players;
    }

    contains(player) {
        let matched = false;
        this.players.forEach((l_player, index) => {
            console.log("comparing ", player, " ", l_player)
            if(player == l_player) {
                matched = true;
            }
        })
        return matched;
    }


    /**
     * @param {Team} compare
     */

    isSimilar(compare) {
        console.log(compare)
        let similar = 0;
        this.players.forEach((value, index) => {
            if(compare[index] == value) similar++;
        })
        return (similar >= this.players.length);
    }

    get enemy() {
        return this.enemy;
    }
}

module.exports = Team;