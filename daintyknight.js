//Initialize enchant.js as the game engine
enchant();
use2D = true;


//on document load [...]
window.onload = function () {
    //Starting point. Creating a variable called game as the game.
    var game = new Game(1000, 600);
    
    //arrays
    var block_array;
    
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
        
        
        var x = 20;
        for (var i = 0; i < 3; i++){
            block = new Sprite(100, 30);
            block = Block(x, 480);
            x += 100;
            scene.addChild(block);
        }
                

        var playerSpeed = 4;
        
        
        
        //Event listener for the left and right keys. Moves the player knight
        //left or right.
        knight.addEventListener(Event.ENTER_FRAME, function () {
            //Running left
            if (game.input.left && !game.input.right) {
                this.x -= 4;
                knight.image = game.assets['sprites/sprite_runR.png'];
                //Running right
            } else if (game.input.right && !game.input.left) {
                this.x += 4;
                knight.image = game.assets['sprites/sprite_runL.png'];
            } else if (game.input.space) {
                var jumpLimit = knight.y - 20;
                //var ground = 500;
                while (knight.y > jumpLimit) {
                    knight.y -= 3;
                    knight.image = game.assets['sprites/sprite_neutral.png'];
                }
                //jump(knight);
            } else {
                knight.image = game.assets['sprites/sprite_neutral.png'];
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
    };
    //Initializes game
    game.start();

    //knigt class
    function Knight(x, y) {
        var knight = new Sprite(64, 64);
        knight.x = x;
        knight.y = y;
        //load knight sprite
        knight.image = game.assets['sprites/sprite_neutral.png'];
        return knight;
    }
    //enemy knight class
    function E_Knight(x, y) {
        var enemy = new Sprite(64, 64);
        enemy.x = x;
        enemy.y = y;
        enemy.image = game.assets['sprites/enemy_neutral.png'];
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
    function jump_up(knight) {
        var jumpLimit = knight.y - 20;
                //var ground = 500;
        while (knight.y > jumpLimit) {
            knight.y -= 3;
            knight.image = game.assets['sprites/sprite_neutral.png'];
        }
        /*while(this.y < ground){
            knight.y += 3;
            knight.image = game.assets['sprites/sprite_neutral.png'];
        }*/
        /*var angle = 30;
        var speed = 20;
        var scale_x = cos(angle);
        var scale_y = sin(angle);
        var velocity_x = (speed * scale_x);
        var velocity_y = (speed * scale_y);
        knight.x = knight.x + velocity_x;
        knight.y = knight.y + velocity.y;*/
    }

};