const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image();
playerImage.src = '/Users/chrisdiluca/second-java-game-side-scroller/Samurai_Spritelist .png';
const spriteWidth = 128;
const spriteHeight = 128;
let frameX = 0;
let frameY = 0;
let gameFrame = 0;
const staggerFrames = 5;
const spriteAnimations = [];
const animationStates = [
     {
        name: 'idle',
        frames: 6,
    },
    {
        name: 'walk',
        frames: 8,
    },
    {
        name: 'run',
        frames: 8,
    },
    {
        name: 'jump',
        frames: 12,
    },
    {
        name: 'knifeattack',
        frames: 6,
    },
    {
        name: 'attack1',
        frames: 4,
    },
    {
        name: 'attack2',
        frames: 3,
    },
    {
        name: 'block',
        frames: 2,
    },
    {
        name: 'useitem',
        frames: 2,
    },
    {
        name: 'death',
        frames: 3,
    }
    
];
animationStates.forEach((state, index) => {
    let frames = {
        loc: [],
    }
    for (let j = 0; j < state.frames; j++){
        let positionX = j * spriteWidth;
        let postionY = index * spriteHeight;
        frames.loc.push({x: positionX, y: postionY});
    }
    spriteAnimations[state.name] = frames;

});
console.log(spriteAnimations);

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    let position = Math.floor(gameFrame/staggerFrames) %5;
    frameX = spriteWidth * position;
    ctx.drawImage(playerImage, frameX, frameY *  spriteHeight, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
   

    gameFrame++;
    requestAnimationFrame(animate);
};
animate();