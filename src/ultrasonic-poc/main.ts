const speed = 100;
const turnTime = 300;

basic.forever(function() {
    maqueen.MotorRun(maqueen.aMotors.M1, 0, speed);
    maqueen.MotorRun(maqueen.aMotors.M2, 0, speed);

    if (maqueen.sensor(PingUnit.Centimeters) < 30) {
        if (Math.randomBoolean()) {
            maqueen.MotorRun(maqueen.aMotors.M1, 0, speed);
            maqueen.MotorRun(maqueen.aMotors.M2, 1, speed);
        } else {
            maqueen.MotorRun(maqueen.aMotors.M1, 1, speed);
            maqueen.MotorRun(maqueen.aMotors.M2, 0, speed);
        }

        basic.pause(turnTime);
    }
});
