// Hello world of Phaser = Basic Game = Single scene in Spin & Win Game
// How to create the basic skeleton for the game  -> Game Loop

let prizes_config = {
    count:12,
    prize_names : ["3000 Credits","35% Off","Hard Luck","70% OFF","Swagpack","100% OFF","Netflix","50% Off","Amazon Voucher","2 Extra Spin", "CB Tshirt","CB Book"]
}


let config = {
   
    type : Phaser.CANVAS,
    width : 800,
    height : 600,
    backgroundColor : 0xffcc00,
    
    scene : {
        preload : preLoad,
        create : create,
        update : update,
    }
};

let game = new Phaser.Game(config);


function preLoad(){
    console.log("Preload");
//    console.log(this);
    
    // load object, load some images
    this.load.image('background','../Assets/back.jpg');
    console.log(this);
    this.load.image('wheel','../Assets/wheel.png');
    this.load.image('pin','../Assets/pin.png');
    this.load.image('stand','../Assets/stand.png');
}

function create(){
    console.log("Create");
    
    // Create the background image
    let W = game.config.width;
    let H = game.config.height;
    
    // Images are called Sprites in Phaser (thus adding sprite to the background)
    let background = this.add.sprite(0,0,'background');
    
    // Set the position and Scale
    background.setPosition(W/2,H/2);
    background.setScale(0.20);
    
      
    // lets create the stand
    let stand = this.add.sprite(W/2,H/2 + 250, 'stand');
    stand.setScale(0.25);
    
   
    // lets create pin
    let pin = this.add.sprite(W/2,H/2-250,'pin');
    pin.setScale(0.25);
    // setDepth property is used to set the depth of the sprite( as pin goes below the wheel, setDepth to 1 to make it come forward)
    // Default value of setDepth for each element is 0(zero).
    pin.setDepth(1);
    
    // lets create wheel (when you want to do some scaling with the image, assign the sprite to a variable)
    this.wheel = this.add.sprite(W/2,H/2,'wheel');
    this.wheel.setScale(0.25);
    
    
    // Sets the opacity of wheel (lies between 0 - 1), 1 - opaque  , 0 - transparent
    // this.wheel.alpha = 0.5;
   
    //scale 
//    wheel.scaleX = 2;
//    wheel.scaleY = 0.5;
    

    // Event Listener for mouse click
    this.input.on("pointerdown", spinwheel, this);
    
    // lets create text object
    font_style = {
        font : "bold 30px Arial",
        align : "center",
        color : "red",
    }
    this.game_text = this.add.text(10,10,"Welcome to Spin & Win",font_style);
  
}


// Game Loop
function update(){
    console.log("Inside Update");
    
    // this property makes the wheel rotate (slowly as angle change given +=1 )
    // this.wheel.angle += 1;
    
    
//    this.wheel.scaleX += 0.01;
//    this.wheel.scaleY += 0.01;
//    this.wheel.alpha -= 0.01;
    // this changes the opacity of the wheel contionously to make it look diminished 
    // this.wheel.alpha -= 0.01;
    
//    this.wheel.scaleX += 0.01;
    
}


function spinwheel(){
    console.log("You clicked the mouse");
    console.log("Start Spinning");
    
    // this.game_text.setText("You clicked the mouse");
    
    
    let rounds =  Phaser.Math.Between(2,4);
    console.log(rounds);
    
    let degrees = Phaser.Math.Between(0,11)*30;
    
    let total_angle = rounds*360 + degrees;
    console.log(total_angle);
    
    let idx = prizes_config.count - 1 - Math.floor(degrees/(360/prizes_config.count));
    
    // tweens are used to add animations (gradually changing) in Phaser.
    tween = this.tweens.add({
        targets: this.wheel,
        angle: total_angle,   // random angle 
        ease : "Cubic.easeOut",
        duration: 6000,
        callbackScope: this,
        onComplete: function(){
            this.game_text.setText("You won " + prizes_config.prize_names[idx]);
        }
    });
}