/**
 * Created by simonstehle on 21.07.16.
 */

/**
 * This file is for loading the drone and controls
 */

var scene;
// Camera looks at the scene.
var aspectRatio;
var camera;
// Renderer draws what the camera sees on the screen.
var renderer;

//Declaration of Moving Flags
var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;

//Declaration of rotation Flags
var rotateLeft = false;
var rotateRight = false;

//Declaration of Up and Down Flags
var moveDroneUp = false;
var moveDroneDown = false;

//Declaration of Speed Variables
var speedForward = 100;
var speedBackwards = 50;
var speedSidewards = 40;
var speedRotationRadian = 0.05;
var speedUpDown = 20;

scene = new THREE.Scene();

aspectRatio = window.innerWidth / window.innerHeight;
camera = new THREE.PerspectiveCamera(75, aspectRatio, 1, 20000);
//Rechtshändiges Koordinatensystem, Z ersticht einen
camera.position.z = 500;
camera.position.y = 200;


renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xFFCEB8);
document.body.appendChild(renderer.domElement);



//Pasted

var container, stats, mesh, bonooneStadium;

var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

//Marker for grouping object, drone and camera
var marker = new THREE.Object3D();
scene.add(marker);

marker.add(camera);

scene.add(createTreeAt(-500,0));
scene.add( createTreeAt(600,-750));
scene.add(createTreeAt(-750,-1000));
scene.add(createTreeAt(750,-1000));

init();



function init() {

   var ambient = new THREE.AmbientLight( 0x404040 );
    scene.add( ambient );

    var directionalLight = new THREE.DirectionalLight( 0xffeedd );
    directionalLight.position.set( 0, 0, 1 ).normalize();
    scene.add( directionalLight );

    // model

    var onProgress = function ( xhr ) {
        if ( xhr.lengthComputable ) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log( Math.round(percentComplete, 2) + '% downloaded' );
        }
    };

    var onError = function ( xhr ) { };

    THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );

    var mtlLoader = new THREE.MTLLoader();

    mtlLoader.load( 'objects/DroneV1.mtl', function( materials ) {

        materials.preload();

        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials( materials );

        objLoader.load( 'objects/DroneV1.obj', function ( object ) {

            mesh = object;
            //mesh.position.Y = -200;
            //mesh.position.X = 3000;
            //mesh.position.Z = 200;
           
            mesh.scale.set(50, 50, 50);
            marker.add(mesh);

            //Temporary, use instead of marker
            //scene.add( mesh );

        }, onProgress, onError );

    });



    mtlLoader.load( 'objects/Stadium.mtl', function( materials ) {

        materials.preload();

        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials( materials );

        objLoader.load( 'objects/Stadium.obj', function ( object ) {

            bonooneStadium = object;
            //mesh.position.Y = -200;
            //mesh.position.X = 3000;
            //mesh.position.Z = 200;
            //bonooneStadium.rotation.y = Math.PI*1.5;
            bonooneStadium.scale.set(2000, 2000, 2000);
            scene.add(bonooneStadium);



        }, onProgress, onError );

    });

}


//EndPasted






document.addEventListener('keydown', function (event) {
  console.log(event.keyCode);
    event.preventDefault();

    var code = event.keyCode;



    switch (code){
        case 87:
            //Move Upwards w
            moveDroneUp = true;
            break;
        case 83:
            //Move Down s
            moveDroneDown = true;
            break;
        case 65:
            //Rotate Left a
            rotateLeft = true;
            break;
        case 68:
            //Rotate right d
            //TODO: Hier der Algorithmusch
            rotateRight = true;
            break;
        case 38:
            //Move Forward Arrow up
            moveForward = true;

            mesh.rotation.x = Math.PI * -0.05;
            break;
        case 40:
            //Move Backwards Arrow down
            moveBackward = true;
            mesh.rotation.x = Math.PI * 0.05;
            break;
        case 37:
            //Move Left arrow left
            moveLeft = true;
            mesh.rotation.z = Math.PI * 0.05;

            break;
        case 39:
            //Move right arrow right
            moveRight = true;
            mesh.rotation.z = Math.PI * -0.05;
            break;
    }})






document.addEventListener('keyup', function (event) {
    var code = event.keyCode;

    switch (code){
        case 87:
            //Move Upwards w
            moveDroneUp = false;
            break;
        case 83:
            //Move Down s
            moveDroneDown = false;
            break;
        case 65:
            //Rotate Left a
            rotateLeft = false;
            break;
        case 68:
            //Rotate right d
            rotateRight = false;
            break;
        case 38:
            //Move Forward Arrow up
            moveForward = false;
            mesh.rotation.x = Math.PI * 0;
            console.log(mesh.position.z);
            break;
        case 40:
            //Move Backwards Arrow down
            mesh.rotation.x = Math.PI * 0;
            moveBackward = false;
            break;
        case 37:
            //Move Left arrow left
            moveLeft = false;
            mesh.rotation.z = Math.PI * 0;
            break;
        case 39:
            //Move right arrow right
            moveRight = false;
            mesh.rotation.z = Math.PI * 0;
            break;
    }


})




function animate() {
    requestAnimationFrame(animate);



    //Handle Control of Drone by Flags
    if (moveForward){
        marker.position.z -= speedForward;
    }
    if (moveBackward){
        marker.position.z += speedBackwards;
    }
    if (moveLeft){
        marker.position.x -= speedSidewards;
    }
    if (moveRight){
        marker.position.x += speedSidewards;
    }
    if (rotateLeft){
        marker.rotation.y += speedRotationRadian;
    }
    if (rotateRight){
        marker.rotation.y -= speedRotationRadian;
    }
    if (moveDroneUp){
        marker.position.y += speedUpDown;
    }
    if (moveDroneDown){
        marker.position.y -= speedUpDown;
    }






    renderer.render(scene,camera);
}
animate();



//Wald
function createTreeAt(x, z){
    var trunk = new THREE.Mesh(
        new THREE.CylinderGeometry(50,50,20),
        new THREE.MeshBasicMaterial({color: 0xA0522D})
    );

    var top = new THREE.Mesh(
        new THREE.SphereGeometry(150,20, 20),
        new THREE.MeshBasicMaterial({color: 0x228B22})
    );

    top.position.y = 175;
    trunk.add(top);
    trunk.position.set(x, -75, z);
    return trunk;

}