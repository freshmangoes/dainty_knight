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
        e_array = [];
        
        var map = new Map(100, 30);
        map.image = game.assets['sprites/block.png'];
        
        map.loadData([[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                      [1, 1, 1, 1, 1, 0, 0, 1, 1, 1],
                      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                      [1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
                      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                      [1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
                      [1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
                      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                      [1, 0, 1, 1, 1, 1, 1, 1, 1, 1],
                      [1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
                      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                      [1, 1, 1, 1, 0, 1, 0, 0, 1, 1],
                      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                      [1, 1, 0, 0, 1, 1, 1, 1, 1, 1],
                      [1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
                      [1, 0, 1, 1, 1, 1, 1, 1, 1, 1]]);
        
        var collision_map = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                      [0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
                      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                      [0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
                      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                      [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
                      [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
                      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                      [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
                      [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
                      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                      [0, 0, 0, 0, 1, 0, 1, 1, 0, 0],
                      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                      [0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
                      [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
                      [0, 1, 0, 0, 0, 0, 0, 0, 0, 0]];
        
        map.collisionData = collision_map;
        
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
<<<<<<< HEAD
        //Creates block sprite starting at 100, 480 coordinates
      
        var x = 100;
        for (var i = 0; i < 4; i++){
            block = new Sprite(100, 30);
            block = Block(x, 480);
            x += 200;
            scene.addChild(block);
        }
                
=======
          
>>>>>>> Platform Detection Working; Falling, not so much
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
                knight.scaleX = -1;
                knight.frame = [3, 4];
<<<<<<< HEAD
                //Running right
            }else if(game.input.right && !game.input.left){
=======
                checkCol(knight.x, knight.y);
            } else if (game.input.right && !game.input.left) {
>>>>>>> Platform Detection Working; Falling, not so much
                this.x += 4;
                knight.scaleX = 1;
                knight.frame = 4;
<<<<<<< HEAD
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
=======
                checkCol(knight.x, knight.y);
            } else if (game.input.space) {
                if (!knight.jumping) {
                    knight.jumping = true;
                    knight.vely =- knight.speed * 2;
                    knight.frame = 0;
                }
            } else {
                knight.frame = [0];
            }


            if (knight.x >= width - knight.width) {
                knight.x = width - knight.width;
            } else if (knight.x <= 0) {
                knight.x = 0;
            }


            if (knight.y >= height - knight.height) {
                knight.y = height - knight.height;
                knight.jumping = false;
>>>>>>> Platform Detection Working; Falling, not so much
            }

            knight.vely += knight.gravity;

<<<<<<< HEAD
            if((knight.y <= knight.startingPosY) && knight.jumping){
            	knight.y += knight.vely
        	}else{
				knight.jumping = false;
            	knight.y = knight.startingPosY;
            	knight.vely = 0;
        	}

        }); 
		
=======
            if ((knight.y <= knight.startingPosY) && knight.jumping) {
                knight.y += knight.vely;
            } else {
                knight.jumping = false;
                //knight.y = knight.startingPosY;
                knight.vely = 0;
            }

        });
        
        

>>>>>>> Platform Detection Working; Falling, not so much
        //Appends background and label to scene as children
        //add objects to the scene
<<<<<<< HEAD
=======
        
>>>>>>> Platform Detection Working; Falling, not so much
        scene.addChild(label);
        scene.addChild(map);
        scene.addChild(knight);
        scene.addChild(enemy);
        //scene.addChild(block);
  
        //Start scene
        game.pushScene(scene);
        console.log(knight.x);

        //Executes code every frame
<<<<<<< HEAD
        game.addEventListener('enterframe', function() {
            if(knight.within(enemy,40)){
=======

        game.addEventListener('enterframe', function () {
            if(knight.jumping && map.hitTest(knight.x + 32, knight.y + 58)){
                var k = knight.x;
                knight.jumping = false;
                knight.x = k;
                console.log("hit");
            }/*else if(!map.hitTest(knight.x + 32, knight.y + 58) && !knight.jumping && knight.y <= height){
                knight.y += knight.vely;
            }*/

            //If knight is within 40 pixels of the enemy's center:
            //print "hit." 40 pixels is about the correct distance
            //from the character to the enemy.

            if (knight.within(enemy, 40)) {
>>>>>>> Platform Detection Working; Falling, not so much
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
        knight.height = 64;
        knight.width = 64;
        knight.x = x;
        knight.y = y;
        knight.vely = 0;
        knight.jumping = false;
        knight.friction = 0.8;
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
<<<<<<< HEAD
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
=======
>>>>>>> Platform Detection Working; Falling, not so much
};