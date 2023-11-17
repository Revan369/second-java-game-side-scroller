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
    this.load.spritesheet('Walk', 'assets/Walk.png', { frameWidth: 32, frameHeight: 48 });
    this.load.spritesheet('Idle', 'assets/Idle.png', { frameWidth: 32, frameHeight: 48 });
}

function create() {
    // Background
    this.add.image(400, 300, 'sky');

    // Platforms
    platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    // Player
    player = this.physics.add.sprite(100, 450, 'Walk');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    // Adjust player body size for better collision
    player.setSize(32, 48);
    player.setOffset(0, 0);

    this.physics.add.collider(player, platforms);

    // Player animations
    this.anims.create({
        key: 'Walk',
        frames: this.anims.generateFrameNumbers('Walk', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'Idle',
        frames: this.anims.generateFrameNumbers('Idle', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    // Input Events
    cursors = this.input.keyboard.createCursorKeys();
}

function update() {
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
    }
}
