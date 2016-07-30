/**
 * Created by Marcel Hauser on 22.07.2016.
 *
 * This file contains functions that are called up in other files.
 * Mainly, these function are basic game mechanics, e.g.
 * how let the drone fly in any direction
 * how the give the drone some inertia
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


 Param "direction" is an int; you give me the keycode between 37 and 40,
 so the function can determine in which direction relative to the current rotation you want to move

 */

function calcMovement (angle, pace, direction){
    var quadrant, net_angle, moveZ, moveX, PiHalf;
    quadrant = -1;
    PiHalf = Math.PI/2;

    while (angle<0) { angle+=PiHalf*4; }

    switch (direction) {
        case 37:
            angle += PiHalf;
            break;
        case 39:
            angle += PiHalf*3;
            break;
        case 40:
            angle += PiHalf*2;
            break;
        case 38:
            angle = angle;
            break;
    }

    for (var i = angle; i >= 0; i -= PiHalf) {quadrant++;}
    quadrant = quadrant % 4;

    net_angle = angle % PiHalf;

    if (net_angle < 0) net_angle += PiHalf*4;

    //console.log("Quadrant: " + quadrant+ " Angle: " + net_angle);


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
    //console.log("X: " + move.X + "Z: " + move.Z);

    return move;

}




/**
 *
 *  *
 * for every moving Object (drone) this function calculates the value "Q" and "negQ" to determnie the mathematical function
 * a(v) = aMax * Q^-v
 * and
 * a(v) = -1/30 * aMax * negQ^-v
 * with the presumption that a(0)/10=a(vMax)
 * returns q
 */

function getQ (vMax) {
    var q = Math.pow(10, 1/vMax);
    return q;
}

function getNegQ (vMax) {
    var negQ = Math.pow(10, -1/vMax);
    return negQ;
}

function acc(aMax, vMax, vCurr) {
    var q = getQ(vMax);
    var aCurr = aMax*Math.pow(q, -vCurr);
    if (vCurr + aCurr >= vMax) {
        return 0;
    } else {
        return aCurr;
    }
}

function negAcc(aMax, vMax, vCurr) {
    if (vCurr === 0) {
        return 0;
    } else {
        var aStart = aMax * 1/30;
        var qStr = getNegQ(vMax);
        var aCurr = -aStart*Math.pow(qStr, -vCurr);
        if (vCurr + aCurr <= aStart) {
            return vCurr;
        } else {
            return aCurr;
        }
    }
}


