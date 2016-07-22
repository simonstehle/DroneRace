/**
 * Created by Marcel Hauser on 22.07.2016.
 *
 * This file contains functions that are called up in other files.
 *
 * /


 /*
 function calcMovement
 This function uses current rotation and pace of
 an object to calculate how far it has to move on
 X and Z in one iteration (pace).
 It uses quadrants to calculate if
 the change of position is negative and positive and
 weather sin or cos hast to be used.

 Param "direction" is a boolean; true means moving forward (keyup); false means moving backwards (keydown)

 */

function calcMovement (angle, pace, direction){
    var quadrant, net_angle, moveZ, moveX, PiHalf;
   quadrant = -1;
    PiHalf = Math.PI/2;

    if (direction==false) angle -= PiHalf*2;

    for (var i = angle; i >= 0; i -= PiHalf) {quadrant++;}

    net_angle = angle % PiHalf;
    console.log("Quadrant: " + quadrant+ " Angle: " + net_angle);


    switch (quadrant) {
        case 0:
            moveZ = -(Math.cos(net_angle)*pace);
            moveX = -(Math.sin(net_angle)*pace);
            break;
        case 1:
            moveZ = (Math.sin(net_angle)*pace);
            moveX = -(Math.cos(net_angle)*pace);
            break;
        case 2:
            moveZ = (Math.cos(net_angle)*pace);
            moveX = (Math.sin(net_angle)*pace);
            break;
        case 3:
            moveZ = -(Math.sin(net_angle)*pace);
            moveX = (Math.cos(net_angle)*pace);
            break;
    }
    var move = {};
    move.X = moveX;
    move.Z = moveZ;
    console.log("X: " + move.X + "Z: " + move.Z);

    return move;


}
