class AbstractPack {
    /**
     * 
     * @param  {...CardReward} items 
     */
    constructor(...items) {
        this.rewards = [...items];
    }


}