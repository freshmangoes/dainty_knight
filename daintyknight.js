//Initialize enchant.js as the game engine
enchant();
use2D = true;



//on document load [...]
window.onload = function () {
	//Starting point. Creating a variable called game as the game.
	var game = new Game(1000, 600);
    //set keybinds	
	game.keybind(37, 'left');		//Left arrow key
	game.keybind(39, 'right');		//Right arrow key
	//Preload resources to be used later on. Any not preloaded resources will
	//not appear.
	game.preload('sprites/bg.png');
    game.preload('sprites/sprite_neutral.png');
	game.preload('sprites/sprite_runL.png');
	game.preload('sprites/sprite_runR.png');
	//Game settings. These cannot be changed after the game has loaded. Set                   
	//them before game.start() is called.
	game.fps = 30;
    game.scale = 1;
    //on game load [...]
	game.onload = function () {
        console.log("Dainty Knight! A game by Cake^3");
		var scene, label, bg, knight;
        //Create new scene
		scene = new Scene();
		//Creates new label
		label = new Label("Dainty Knight!");
		//Creates new background sprite
		bg = new Sprite(1000, 600);				
		//Creates knight sprite starting at 40,500 coordinates
		knight = new Sprite(64, 64);
        knight = Knight(40, 500);
		//knight.x = 40;
		//knight.y = 500;
        //knight = new Knight(40,500);
		var playerSpeed = 4;
		//Event listener for the left and right keys. Moves the player knight
		//left or right.
		knight.addEventListener(Event.ENTER_FRAME, function(){
			//Running left
			if(game.input.left && !game.input.right){
				this.x -= 4;
				knight.image = game.assets['sprites/sprite_runR.png'];
			//Running right
			}else if(game.input.right && !game.input.left){
				this.x += 4;
				knight.image = game.assets['sprites/sprite_runL.png'];
			}
		});
		//Load background image
		bg.image = game.assets['sprites/bg.png'];
		//Appends background and label to scene as children
		scene.addChild(bg);			
		scene.addChild(label);		
		scene.addChild(knight);		
		//Start scene
		game.pushScene(scene);
		console.log(knight.x);
	}
	//Initializes game
	game.start();

//knigt "class"
function Knight (x, y) {
    var knight = new Sprite(64, 64);
    knight.x = x;
    knight.y = y;
    //load knight sprite
    knight.image = game.assets['sprites/sprite_neutral.png'];
    return knight;
}

};