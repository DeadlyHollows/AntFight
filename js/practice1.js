// Setting up all the basic elements required ...

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight);

var renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Now making a cube ...

var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({color: 0x00ff00});

var cube = new THREE.Mesh(geometry, material);

var enemy = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({color: 0xffff00}));

scene.add(cube);
scene.add(enemy);

cube.position.x = -3;
cube.position.y = 0;
cube.position.z = 0;

enemy.position.x = 3;
enemy.position.y = 0;
enemy.position.z = 0;

camera.position.z = 5;

var direction = new THREE.Vector3(0.03, 0, 0);

function render() {
	requestAnimationFrame(render);
	cube.rotation.x += 0.1;
	// cube.rotation.y += 0.1;
	// cube.rotation.z += 0.1;
	cube.position.add(direction);
	renderer.render(scene, camera);
}

render();