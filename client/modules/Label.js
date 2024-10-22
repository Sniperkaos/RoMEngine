const $UIElement = require("../UIElement");
const $ClientRenderer = require("../ClientRenderer");

class Label extends $UIElement {
    /**
     * 
     * @param {int} sizeX 
     * @param {int} sizeY 
     * @param {int} posX 
     * @param {int} posY 
     * @param {Function} callback 
     */

    constructor(sizeX, sizeY, posX, posY, renderPath) {
        super(sizeX, sizeY, posX, posY);
        this.renderPath = renderPath;
    }
    
    getBackgroundRender() {
        return process.cwd() + this.renderPath;
     }
    
    text(text) {
            // replace the text
        this.text = text;
            // regenerate the render
        $ClientRenderer.render(this, {
            applyText: true
        });
    
        return this;
    }
}

module.exports = Label;