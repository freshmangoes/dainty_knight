enchant();
use2D=true;
//initGame("gameCanvas");

var game = new Game(1000,600);
var block_array = [];
var scene, label, bg, knight, time, enemy, block;

draw();

function setup(){
	game.onload=function(){
		game.keybind(37, 'left');  //Left arrow key
	    game.keybind(39, 'right');   //Right arrow key
	    game.keybind(32, 'space');

	    //Preload resources to be used later on. Any not preloaded resources will
	    //not appear.
	    game.preload('sprites/bg.png');
	    game.preload('sprites/level.png');
	    game.preload('sprites/sprite_neutral.png');
	    game.preload('sprites/sprite_runL.png');
	    game.preload('sprites/sprite_runR.png');
	    game.preload('sprites/enemy_neutral.png');
	    game.preload('sprites/block.png');
	    
	    //Game settings. These cannot be changed after the game has loaded. Set                   
	    //them before game.start() is called.
	    game.fps = 60;
	    game.scale = 1;


	    scene = new Scene();
		label = new Label("Dainty Knight!");
		bg = new Sprite(1000,600);
		bg.image = game.assets['sprites/level.png'];
		scene.addChild(bg);

		knight = Knight(10,500);
		enemy = E_Knight(300,500);

		for(var i = l; i < 3; i++){
			var x = 20;
			block = new Sprite(100,30);
			block = Block(x,480);
			x += 100;
			scene.addChild(block);
		}

		var playerSpeed = 4;

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

		scene.addChild(label);
		scene.addChild(knight);
		scene.addChild(enemy);
		game.pushScene(scene);

	}
}

function draw(){
	setup();
	console.log("Test");
	game.start();
}



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
}