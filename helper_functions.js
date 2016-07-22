/**
 * Created by Marcel Hauser on 22.07.2016.
 */

/*

 This function uses current rotation and pace of an object to calculate how far it has to move on X and Z in one iteration (pace).
 It uses quadrants to calculate if the change of position is negative and positive and weather sin or cos hast to be used.
 will it commit?

 */

function calcMovement (angle, pace){
    var quadrant, net_angle, moveZ, moveX, PiHalf;
    quadrant = -1;
    PiHalf = Math.PI/2;

    for (var i=angle; i<0;i-=PiHalf) quadrant++;

    net_angle = angle % PiHalf;
    console.log(quadrant, net_angle);

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


}
