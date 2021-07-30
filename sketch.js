var score = 0;
var gun, bluebubble, redbubble, bullet, backBoard;
var gunImg, bubbleImg, bulletImg, blastImg, backBoardImg;
var redBubbleGroup, redBubbleGroup, bulletGroup;

var life = 3;
var score = 0;
var gameState = 1

//to pre load images
function preload() {
    gunImg = loadImage("gun1.png")
    blastImg = loadImage("blast.png")
    bulletImg = loadImage("bullet1.png")
    blueBubbleImg = loadImage("waterBubble.png")
    redBubbleImg = loadImage("redbubble.png")
    backBoardImg = loadImage("back.jpg")
}

function setup() {

    //to create canvas
    createCanvas(800, 800);

    //to crete objects
    backBoard = createSprite(50, width / 2, 100, height);
    backBoard.addImage(backBoardImg)

    gun = createSprite(100, height / 2, 50, 50);
    gun.addImage(gunImg)
    gun.scale = 0.2

    //to create groups
    bulletGroup = createGroup();
    blueBubbleGroup = createGroup();
    redBubbleGroup = createGroup();

    heading = createElement("h1");
    scoreboard = createElement("h1");

}

function draw() {

    //to give background
    background("#BDA297");

    //display Score and number of lifes
    heading.html("Life: " + life)
    heading.style('color:red');
    heading.position(150, 20)
    scoreboard.html("Score: " + score)
    scoreboard.style('color:red');
    scoreboard.position(width - 200, 20)

    //check if gamestate is 1
    if (gameState === 1) {
        gun.y = mouseY

        //to shoot
        if (keyDown("space")) {
            shootBullet();
        }

        //to delay
        if (frameCount % 80 === 0) {
            drawblueBubble();
        }

        if (frameCount % 100 === 0) {
            drawredBubble();
        }

        //to check collision between objects
        if (blueBubbleGroup.collide(backBoard)) {
            handleGameover(blueBubbleGroup);
        }
        if (redBubbleGroup.collide(backBoard)) {
            handleGameover(redBubbleGroup);
        }

        if (blueBubbleGroup.collide(bulletGroup)) {
            handleBubbleCollision(blueBubbleGroup);
        }

        if (redBubbleGroup.collide(bulletGroup)) {
            handleBubbleCollision(redBubbleGroup);
        }

        //to create sprites
        drawSprites();
    }

}

//function to create background
function shootBullet() {
    bullet = createSprite(150, width / 2, 50, 20)
    bullet.y = gun.y - 20
    bullet.addImage(bulletImg)
    bullet.scale = 0.12
    bullet.velocityX = 7
    bulletGroup.add(bullet)
}

function drawredBubble() {
    redbubble = createSprite(800, random(20, 780), 40, 40);
    redbubble.addImage(redBubbleImg);
    redbubble.scale = 0.1;
    redbubble.velocityX = -8;
    redbubble.lifetime = 400;
    redBubbleGroup.add(redbubble);
}

function drawblueBubble() {
    bluebubble = createSprite(800, random(20, 780), 40, 40);
    bluebubble.addImage(blueBubbleImg);
    bluebubble.scale = 0.1;
    bluebubble.velocityX = -8;
    bluebubble.lifetime = 400;
    blueBubbleGroup.add(bluebubble);
}

//to handle the collision
function handleBubbleCollision(bubbleGroup) {
    if (life > 0) {
        score = score + 1;
    }
    blast = createSprite(bullet.x + 60, bullet.y, 50, 50);
    blast.addImage(blastImg)
    blast.scale = 0.3
    blast.life = 20
    bulletGroup.destroyEach()
    bubbleGroup.destroyEach()
}

//gameover
function handleGameover(bubbleGroup) {

    life = life - 1;
    bubbleGroup.destroyEach();

    if (life === 0) {
        gameState = 2

        swal({
            title: `Game Over`,
            text: "Oops you lost the game....!!!",
            text: "Your Score is " + score,
            imageUrl: "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
            imageSize: "100x100",
            confirmButtonText: "Thanks For Playing"
        });
    }

}