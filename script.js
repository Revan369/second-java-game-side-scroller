var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var player;
var platforms;
var cursors;

var game = new Phaser.Game(config);

function preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.spritesheet('Walk', 'assets/Walk.png', { frameWidth: 96, frameHeight: 96 });
    this.load.spritesheet('Idle', 'assets/Idle.png', { frameWidth: 96, frameHeight: 96 });
    this.load.spritesheet('Jump', 'assets/Jump.png', { frameWidth: 96, frameHeight: 96 });
}

function create() {
    // Background
    const backgroundImage = this.add.image(400, 300, 'sky');
    backgroundImage.setScale(config.width / backgroundImage.width, config.height / backgroundImage.height);

    // Platforms
    platforms = this.physics.add.staticGroup();
    const ground = platforms.create(400, 300, 'ground');  // Adjust the coordinates as needed
    ground.setScale(config.width / 1920, config.height / 1080);

    // Player
    player = this.physics.add.sprite(config.width / 2, 0, 'Walk');  // Spawn at the top center of the screen
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    // Adjust player body size for better collision
    player.setSize(75, 100);
    player.setOffset(0, 0);

    // Set the frame width and height for the sprite sheet
    player.setFrameWidth(96); // Assuming each frame is 96 pixels in width
    player.setFrameHeight(96); // Assuming each frame is 96 pixels in height
    this.physics.add.collider(player, platforms); // Assuming each frame is 96 pixels in width and height

    //this.physics.add.collider(player, ground);

    // Player animations
    this.anims.create({
        key: 'Walk',
        frames: this.anims.generateFrameNumbers('Walk', { start: 0, end: 7 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'Idle',
        frames: this.anims.generateFrameNumbers('Idle', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'Jump',
        frames: this.anims.generateFrameNumbers('Jump', { start: 0, end: 7 }),
        frameRate: 300,
        repeat: -1
    });

    // Input Events
    cursors = this.input.keyboard.createCursorKeys();

    // Set up camera to follow the player
    this.cameras.main.startFollow(player);
    this.cameras.main.setBounds(0, 0, 1600, 600); // Adjust the bounds accordingly
}

function update() {
    console.log('Player velocity:', player.body.velocity.x, player.body.velocity.y);
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
        player.anims.play('Walk', true);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
        player.anims.play('Walk', true);
    } else {
        player.setVelocityX(0);
        player.anims.play('Idle', true);
    }

    // Jumping logic
    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330);
        player.anims.play('Jump', true);
    }
}