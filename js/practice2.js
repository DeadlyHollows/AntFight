/*
*In this game players are ants...
*Player1 is the red ant
*Player2 is the green ant
*Player1 can be controlled by the keys 'a','s','w','d'
*Player2 can be controlled by the arrow keys 'up','down','left','right' arrow keys
*/

/*
* x-axis is in the horizontal direction
* y-axis is in the vertical direction
* z-axis is in the coming out of the plane (towards the viewer)
*/

/*
* The game reloads after every 5 seconds of it getting over ...
*/


/*
* collision is used as a global variable to tell if any collision has occured or not ...
*/

var collision = false; // Indicates no collision has occured yet ...

/*
* key contains the keycode for the input from the user ...
*/

var key;

/*
* collidedPlayer contains the player who collided => 1 for player1 and 2 for player2 ...
*/

var collidedPlayer;

var power1 = document.getElementById('player1');
var power2 = document.getElementById('player2');;

//---------------------------------------------------------------------------------------------
// Initial setup ...

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//----------- Initial setup ends ... ----------------------------------------------------------



//---------------------------------------------------------------------------------------------
// Making two players (cube currently ...)

//-------------------------------------------------------------
//******* TODO: Change these cubes to the ants ...*******
//-------------------------------------------------------------


// Creates a game player ...
function createPlayer(code, color) {
	// var geometry = new THREE.CylinderGeometry(0, 0.6, 2, 50, false);
	var geometry = new THREE.BoxGeometry(1, 1, 1);
	var material = new THREE.MeshBasicMaterial({color: color});

	var player = new THREE.Mesh(geometry, material);


	// Create players with their power = 100
	//player.power = 100;

	var x, y, z;

	switch(code) {
		case 1:
			x = -3;
			y = 0;
			z = 0;
			break;
		case 2:
			x = 3;
			y = 0;
			z = 0;
			break;
	}

	player.position.x = x;
	player.position.y = y;
	player.position.z = z;

	player.castShadow = true;
	player.receiveShadow = false;
	
	scene.add(player);

	return player;
}

var player1 = createPlayer(1, 0xff0000);
var player2 = createPlayer(2, 0x00ff00);
//---------------------------------------------------------------------------------------------




//---------------------------------------------------------------------------------------------
// Setting the position of the camera within the scene ...

camera.position.z = 5;

//---------------------------------------------------------------------------------------------



//---------------------------------------------------------------------------------------------
// For detecting the possibility of moving ...

function futureVision() {
	if(collision == true) {
		undoMove();
		reducePower(collidedPlayer);
		collision = false;
	}
}

//---------------------------------------------------------------------------------------------



//---------------------------------------------------------------------------------------------
// Detect for collisions ...

function damage() {

	// Make a bounding box of player1
	var collision1 = new THREE.Box3().setFromObject(player1);

	// Make a bounding box of player2
	var collision2 = new THREE.Box3().setFromObject(player2);

	collision = collision1.intersectsBox(collision2);

	// The problem with the code was that whenever collision happens, collison variable becoems true and in that case no key
	// movements are detected further, so no motion is taken into account ...
	// Hence, a function futureVision() has been made to see if the movement about to happen will remove the collision conditions
	// if it will, then we will be using this function to set the value of collision = false and allow the player to move ...

	if(collision) {
		futureVision();
	}

	return collision;

}

//---------------------------------------------------------------------------------------------


//---------------------------------------------------------------------------------------------
// youLoose() function accepts an arguement (the player code 1 or 2) and then displays a prompt
// that the player (with the given code) lost the game...

function youWin(code) {
	$('.win').html('Congratualtions !!! ' + 'Player ' + code + ' won the game');
	$('.win').show("slow");
	setTimeout(function() {
		location.reload();
	}, 5000);
}

//---------------------------------------------------------------------------------------------


//---------------------------------------------------------------------------------------------
// A function which reduces the power of the player who has collided ...
function reducePower(code) {
	switch(code) {
		case 1:
			if(power1.value > 0) {
				power1.value -= 10;
				if(power2.value > 0) {
					power2.value -= 2;
				}
			}
			else {
				youWin(3 - code);
			}
			break;
		case 2:
			if(power2.value > 0) {
				power2.value -= 10;
				if(power1.value > 0) {
					power1.value -= 2;
				}
			}
			else {
				youWin(3 - code);
			}
			break;
	}
}


//---------------------------------------------------------------------------------------------


//---------------------------------------------------------------------------------------------
// showPower() function displays the power of both the players ...

function showPower() {
	// console.log("PLAYER1: " + power1.value + " " + "PLAYER2: " + power2.value);

}



//---------------------------------------------------------------------------------------------



//---------------------------------------------------------------------------------------------
// An important function => Renders the animation 60 frames per second ...

function gameRender() {

	requestAnimationFrame(gameRender);

	if(damage()) {
		// TODO: REDUCE THE POWER OF THE PLAYER WHO COLLIDED ...		
	}

	showPower();

	renderer.shadowMapEnabled = true;
	renderer.shadowMapType = THREE.PCFSoftShadowMap;

	renderer.render(scene, camera);

}

gameRender();

//---------------------------------------------------------------------------------------------


//---------------------------------------------------------------------------------------------
// Function tomove the players based on the code the entered ...

function movePlayer() {
	switch(key) {

		// -----------------------------------
		// For Player1
		case 65:
			// a (for moving left)
			player1.position.x -= 0.1;
			collidedPlayer = 1;
			break;
		case 68:
			// d (for moving right)
			player1.position.x += 0.1;
			collidedPlayer = 1;
			break;
		case 83:
			// s (for moving back)
			player1.position.z -= 0.1;
			collidedPlayer = 1;
			break;
		case 87:
			// w (for moving forwards)
			player1.position.z += 0.1;
			collidedPlayer = 1;
			break;
		// -----------------------------------


		// -----------------------------------
		// For player2
		case 37:
			// left
			player2.position.x -= 0.1;
			collidedPlayer = 2;
			break;
		case 38:
			// forwards
			player2.position.z -= 0.1;
			collidedPlayer = 2;
			break;
		case 39:
			// right
			player2.position.x += 0.1;
			collidedPlayer = 2;
			break;
		case 40:
			// backwards
			player2.position.z += 0.1;
			collidedPlayer = 2;
			break;

		// -----------------------------------
	}
}

//---------------------------------------------------------------------------------------------


//
function undoMove() {
	switch(key) {

		// -----------------------------------
		// For Player1
		case 65:
			// a (for moving left)
			player1.position.x += 0.1;
			break;
		case 68:
			// d (for moving right)
			player1.position.x -= 0.1;
			break;
		case 83:
			// s (for moving back)
			player1.position.z += 0.1;
			break;
		case 87:
			// w (for moving forwards)
			player1.position.z -= 0.1;
			break;
		// -----------------------------------


		// -----------------------------------
		// For player2
		case 37:
			// left
			player2.position.x += 0.1;
			break;
		case 38:
			// forwards
			player2.position.z += 0.1;
			break;
		case 39:
			// right
			player2.position.x -= 0.1;
			break;
		case 40:
			// backwards
			player2.position.z -= 0.1;
			break;

		// -----------------------------------
	}
}


//



//---------------------------------------------------------------------------------------------
//Code for getting the key code corresponding to the player input ...

function getKeyCode(e) {
	var key_code = e.keyCode ? e.keyCode : e.which;
	return key_code;
}

//---------------------------------------------------------------------------------------------



//---------------------------------------------------------------------------------------------
// Code for handling the key controls ...

window.onkeydown = function(e) {
	
	key = getKeyCode(e);

	// Move the objects iff no collision has occured ...

	if(!collision) {

		movePlayer(key);
	
	}
}
//---------------------------------------------------------------------------------------------