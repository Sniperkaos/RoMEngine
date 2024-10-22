const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const gl = require('gl')(1280, 720);
const { WebGLRenderingContext } = require('gl');
const { WebGLRenderbuffer } = WebGLRenderingContext
// allows pixi to finally use ImageData
const canvas = require('canvas')
global.ImageData = canvas.ImageData

const fs = require("fs")
const pixijs = require('@pixi/node');
const {QMainWindow, QBoxLayout, Direction, QLabel, QPicture, QPixmap} = require('@nodegui/nodegui');
const Assets = pixijs.Assets;
const Sprite = pixijs.Sprite;
const Manifest = require("./manifest.json");
const path = require('path');

var TextureProvider = require("./modules/TextureProvider.js")
TextureProvider = new TextureProvider();
// wait for the application to create
(async ()=>
    { 
        await Assets.init();
        const app = new pixijs.Application({
            
        });

        // create window
        const window = new QMainWindow();
        const root = new QBoxLayout(Direction.TopToBottom);
        root.setObjectName("root")

        const rendered = new QLabel();
        

        // load textures
        fs.readdirSync("./assets/").forEach(async (asset) => {
            await Assets.load(path.join(process.cwd(), `assets/${asset}`));
        })

        var background = await TextureProvider.get("background.jpg")

        app.stage.addChild(Sprite.from(background));

        app.ticker.add(() => {
            app.renderer.render(app.stage);
            let base64Image = app.renderer.extract
                .canvas(app.stage)
                .toDataURL("image/png")
            let picture = new QPixmap();
            picture.loadFromData(base64Image);
            rendered.setPicture(new QPicture())
        });





        root


      
            



    }
)();








const Team = require("./modules/game/Team.js")
const Game = require("./modules/Game.js");
const CardManager = require("./modules/game/CardManager.js");
const Renderer = require("./modules/game/Renderer.js");


//-- set globals


console.log("Creating cards")
var $CardManager = new CardManager();
//-- get cards
fs.readdirSync("./cards/registry/").forEach(card => {
    let cardClass = require("./cards/registry/".concat(card));
    console.log("Registering card ", card);
    $CardManager.registerCard(new cardClass());
})

console.log("Creating game");
global.game = new Game($CardManager);

console.log("Creating battle")
let battle = global.game.startBattle(new Team(["Player1"]), new Team(["Player2"]));
battle.begin();