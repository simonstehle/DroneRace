/**
 * Created by simonstehle on 03.08.16.
 */
"use strict";


/**
 * Function to initialize the drone
 */
function initDrone01() {

    mtlLoader.load('objects/DroneV2.mtl', function (materials) {
        materials.preload();
        /**
         * Object loader to load 3D objets exported from Blender
         * @type {THREE.OBJLoader}
         */
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.load('objects/DroneV2.obj', function (object) {
            drone_mesh = object;
            drone_mesh.boundingSphere;
            drone_mesh.scale.set(8, 8, 8);
            droneMarker.add(drone_mesh);

            /**
             * X-Offset of rotor from drone center
             * @type {number}
             */
            var offsetX = 2.5;
            /**
             * Y-Offset of rotor from drone center
             * @type {number}
             */
            var offsetY = 0.3;
            /**
             * Z-Offset of rotor to back from drone center
             * @type {number}
             */
            var offsetZBack = 1.5;
            /**
             * Z-Offset of rotor to front from drone center
             * @type {number}
             */
            var offsetZFront = -3.5;
            /**
             * Rotor scale
             * @type {number}
             */
            var scale = 1.6;
            AddRotor(offsetX, offsetY, offsetZFront, scale);
            AddRotor(offsetX, offsetY, offsetZBack, scale);
            AddRotor(-offsetX, offsetY, offsetZFront, scale);
            AddRotor(-offsetX, offsetY, offsetZBack, scale);


            addRayCastLine(0,-10000,0);
            addRayCastLine(10000,0,0);
            addRayCastLine(-10000,0,0);
            addRayCastLine(0,0,10000);
            addRayCastLine(0,0,-10000);


        }, onProgress, onError);

    });

    function addRayCastLine(x,y,z)
    {
        var lineMaterial = new THREE.LineBasicMaterial({
            color: 0xffffff
        });
        var geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3(0,0,0));
        geometry.vertices.push(new THREE.Vector3(x,y,z));
        var lineMesh = new THREE.Line(geometry,lineMaterial);
        drone_mesh.add(lineMesh);
    }


}
/**
 *
 * @param positionX -X-Offset of rotor from drone center
 * @param positionY -Y-Offset of rotor from drone center
 * @param positionZ -Z-Offset of rotor from drone center
 * @param scale -Rotor scale
 * @constructor
 */
function AddRotor(positionX, positionY, positionZ, scale) {

    mtlLoader.load('objects/Rotor.mtl', function (materials) {
        materials.preload();
        /**
         * Object loader to load 3D objets exported from Blender
         * @type {THREE.OBJLoader}
         */
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.load('objects/Rotor.obj', function (object) {
            /**
             * Mesh of the rotor
             * @type {THREE.Group}
             */
            var rotorMesh = object;
            rotorMesh.boundingSphere;
            rotorMesh.scale.set(scale, scale, scale);
            rotorMesh.position.set(positionX, positionY, positionZ);
            drone_mesh.add(rotorMesh);
            rotors.push(rotorMesh);
        }, onProgress, onError);

    })
}

