const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = window.innerWidth;
const CANVAS_HEIGHT = canvas.height = window.innerHeight;

const playerImage = new Image();
playerImage.src = 'https://github.com/Revan369/second-java-game-side-scroller/blob/a9d3c868471b8a18b5c1be4d4817538747a64534/Samurai_Spritelist%20.png';
const spriteWidth = 128;
const spriteHeight = 128;
let frameX = 0;
let frameY = 0;
let gameFrame = 0;
const staggerFrames = 10; // Adjust the staggerFrames value to control animation speed
const spriteAnimations = [];
const animationStates = [
  { name: 'idle', frames: 6 },
  { name: 'walk', frames: 8 },
  { name: 'run', frames: 8 },
  { name: 'jump', frames: 12 },
  { name: 'knifeattack', frames: 6 },
  { name: 'attack1', frames: 4 },
  { name: 'attack2', frames: 3 },
  { name: 'block', frames: 2 },
  { name: 'useitem', frames: 2 },
  { name: 'death', frames: 3 },
];

animationStates.forEach((state, index) => {
  let frames = { loc: [] };
  for (let j = 0; j < state.frames; j++) {
    let positionX = j * spriteWidth;
    let positionY = index * spriteHeight;
    frames.loc.push({ x: positionX, y: positionY });
  }
  spriteAnimations[state.name] = frames;
});

const player = {
  x: 0,
  y: CANVAS_HEIGHT - spriteHeight,
  speed: 5,
  isJumping: false,
  isJumpAnimationPlayed: true, // Set to true initially
  jumpHeight: 200,
  isAttacking: false,
  isAttackAnimationPlayed: true, // Set to true initially
  isMoving: false,
};

function handleKeyDown(e) {
  if (e.code === 'ArrowRight') {
    player.isMoving = true;
  } else if (e.code === 'ArrowLeft') {
    player.isMoving = true;
  } else if (e.code === 'Space' && !player.isJumping && player.isJumpAnimationPlayed) {
    player.isJumping = true;
    player.isJumpAnimationPlayed = false;
    jump();
  } else if (e.code === 'KeyA' && !player.isAttacking && player.isAttackAnimationPlayed) {
    player.isAttacking = true;
    player.isAttackAnimationPlayed = false;
    attack();
  }
}

function handleKeyUp(e) {
  if (e.code === 'ArrowRight' || e.code === 'ArrowLeft') {
    player.isMoving = false;
  }
}

function handleTouchStart(e) {
  if (e.touches[0].clientX > window.innerWidth / 2) {
    player.isMoving = true;
  } else {
    if (!player.isJumping && player.isJumpAnimationPlayed) {
      player.isJumping = true;
      player.isJumpAnimationPlayed = false;
      jump();
    }
  }
}

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);
document.addEventListener('touchstart', handleTouchStart);

function jump() {
  if (player.isJumping) {
    player.y -= 5; // Adjust the jump speed as needed
    if (player.y <= CANVAS_HEIGHT - spriteHeight - player.jumpHeight) {
      player.isJumping = false;
      player.y = CANVAS_HEIGHT - spriteHeight;
    }
  }
}

function attack() {
  if (player.isAttacking) {
    frameY = spriteAnimations['knifeattack'].loc[0].y;
    frameX = spriteWidth * (gameFrame % spriteAnimations['knifeattack'].loc.length);
    if (gameFrame % spriteAnimations['knifeattack'].loc.length === staggerFrames - 1) {
      player.isAttacking = false;
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  if (player.isAttacking) {
    frameY = spriteAnimations['knifeattack'].loc[0].y;
    frameX = spriteWidth * (gameFrame % spriteAnimations['knifeattack'].loc.length);
  } else if (player.isJumping) {
    frameY = spriteAnimations['jump'].loc[0].y;
    frameX = spriteWidth * (gameFrame % spriteAnimations['jump'].loc.length);
  } else if (player.isMoving) {
    frameY = spriteAnimations['walk'].loc[0].y;
    frameX = spriteWidth * (gameFrame % spriteAnimations['walk'].loc.length);
  } else {
    frameY = spriteAnimations['idle'].loc[0].y;
    frameX = spriteWidth * (gameFrame % spriteAnimations['idle'].loc.length);
  }

  ctx.drawImage(
    playerImage,
    frameX,
    frameY,
    spriteWidth,
    spriteHeight,
    player.x,
    player.y,
    spriteWidth,
    spriteHeight
  );

  // Adjust camera to follow the player
  const cameraX = player.x - CANVAS_WIDTH / 2 + spriteWidth / 2;
  const cameraY = player.y - CANVAS_HEIGHT / 2 + spriteHeight / 2;

  gameFrame++;
  requestAnimationFrame(animate);
}

function gameLoop() {
  animate();
  requestAnimationFrame(gameLoop);
}

gameLoop();
