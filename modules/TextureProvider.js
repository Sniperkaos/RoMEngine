const { Assets } = require("@pixi/node");
const path = require('path');

class TextureProvider {
    constructor() {
        this.textureMap = new Map();
    }

    /**
     * @param {} texture 
     */
    set texture(texture) {
      //  this.textureMap.set(texture.name, texture.)
    }

    get(file_name) {
        return Assets.load(path.join(process.cwd(), 'assets/'.concat(file_name)))
    }
}
module.exports = TextureProvider;