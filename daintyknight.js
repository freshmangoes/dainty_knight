//Initialize enchant.js as the game engine
enchant();
use2D = true;


//on document load [...]
window.onload = function () {
    var height = 600;
    var width = 1000;
    //Starting point. Creating a variable called game as the game.
    var game = new Game(1000, 600);
    
    //arrays
    var block_array;
    var e_array;
    
    //set keybinds
    game.keybind(37, 'left');  //Left arrow key
    game.keybind(39, 'right');   //Right arrow key
    game.keybind(32, 'space');

    //Preload resources to be used later on. Any not preloaded resources will
    //not appear.
    game.preload('sprites/level.png');
    game.preload('sprites/sprite_neutral.png');
    game.preload('sprites/sprite_runL.png');
    game.preload('sprites/sprite_runR.png');
    game.preload('sprites/enemy_neutral.png');
    game.preload('sprites/block.png');
    game.preload('sprites/test.gif');
    
    //Game settings. These cannot be changed after the game has loaded. Set                   
    //them before game.start() is called.
    game.fps = 30;
    game.scale = 1;
    
    //on game load [...]
    game.onload = function () {
        console.log("Dainty Knight! A game by Cake^3");
        //list of variables
        var scene, label, bg, knight, time, enemy, block;
        
        //make block array empty
        block_array = [];
        e_array = [];        
            
        //Create new scene
        scene = new Scene();
        //Creates new label
        label = new Label("Dainty Knight!");
        
        //Creates new background sprite
        bg = new Sprite(1000, 600);
        //Load background image
        bg.image = game.assets['sprites/level.png'];
        scene.addChild(bg);
        
        //Creates knight sprite starting at 40, 500 coordinates
        knight = new Sprite(64, 64);
        knight = Knight(10, 500);
        //Creates enemy sprite starting at 300, 500 coordinates
        enemy = new Sprite(64, 64);
        enemy = E_Knight(300, 500);
        //Creates block sprite starting at 100, 480 coordinates
      
        var x = 100;
        for (var i = 0; i < 4; i++){
            block = new Sprite(100, 30);
            block = Block(x, 480);
            x += 200;
            scene.addChild(block);
        }
                
        var playerSpeed = 4;
        
        //test.gif:
        //      0 - sprite neutral
        //      1 - sprite swing up
        //      2 - sprite swing down
        //      3 - runR
        //      4 - runL     
        
        //Event listener for the left and right keys. Moves the player knight
        //left or right.
        knight.addEventListener(Event.ENTER_FRAME, function () {

            //Running left
            if (game.input.left && !game.input.right) {
                this.x -= 4;
                //knight.image = game.assets['sprites/test.gif'];
                knight.scaleX = -1;
                knight.frame = [3, 4];
                //Running right
            }else if(game.input.right && !game.input.left){
                this.x += 4;
                //knight.image = game.assets['sprites/test.gif.png'];
                knight.scaleX = 1;
                knight.frame = 4;
            }else if(game.input.space){
            	if(!knight.jumping){
					knight.jumping = true;
					knight.vely = -knight.speed*2;
					knight.frame = 0;
                }                
            }else{
                knight.frame = [0];
            }if(knight.x >= width - knight.width){
            	knight.x = width - knight.width;
        	}else if(knight.x <= 0){
            	knight.x = 0;
        	}
			
            if(knight.y >= height -knight.height){
            	knight.y = height - knight.height;
            	knight.jumping = false;
            }

            knight.vely += knight.gravity;

            if((knight.y <= knight.startingPosY) && knight.jumping){
            	knight.y += knight.vely
        	}else{
				knight.jumping = false;
            	knight.y = knight.startingPosY;
            	knight.vely = 0;
        	}

        }); 
		
        //Appends background and label to scene as children
        //add objects to the scene
        scene.addChild(label);
        scene.addChild(knight);
        scene.addChild(enemy);
        //scene.addChild(block);
  
        //Start scene
        game.pushScene(scene);
        console.log(knight.x);

        //Executes code every frame
        game.addEventListener('enterframe', function() {
            if(knight.within(enemy,40)){
                console.log("hit");
				scene.removeChild(enemy);
			}
        });
    };
    //Initializes game
    game.start();

    //knigt class
    function Knight(x, y) {
        var knight = new Sprite(64, 64);
        knight.height=64;
        knight.width=64;
        knight.x = x;
        knight.y = y;
        knight.vely = 0;
        knight.jumping = false;
        knight.friction = 0.8,
        knight.gravity = 0.2;
        knight.speed = 3;
        knight.startingPosY = y;
        knight.startingPosX = x;
 
        //load knight sprite
        knight.image = game.assets['sprites/test.gif'];
        knight.frame = 0;
        return knight;
    }
    //enemy knight class
    function E_Knight(x, y) {
        var enemy = new Sprite(64, 64);
        enemy.x = x;
        enemy.y = y;
        enemy.image = game.assets['sprites/enemy_neutral.png'];
        e_array.push(enemy);
        return enemy;
    }
    //block class
    function Block(x, y) {
        var block = new Sprite(100, 30);
        block.x = x;
        block.y = y;
        block.image = game.assets['sprites/block.png'];
        //push the block created onto the array
        //array used in collisions
        block_array.push(block);
        return block;
    }
};