let baseTime = input.runningTime();
let ms = 100;
let beats: number[] = [];
let isRunning = false;
let offBeat = false;

input.onButtonPressed(Button.A, function() {
    isRunning = !isRunning;
});

input.onButtonPressed(Button.B, function() {
    let difference = input.runningTime() - baseTime;
    baseTime = input.runningTime();

    if (difference > 3000) {
        beats = [];
    } else {
        beats.push(difference);
        ms = beats.reduce((a, b) => a + b, 0) / beats.length;
    }
});

function beat(beats = 1) {
    for (let index = 0; index < beats; index++) {
        offBeat = !offBeat;
        setHeadLight('left', offBeat);
        setHeadLight('right', !offBeat);
        basic.pause(ms);
    }
}

function moveForward(leftSpeed = 30, rightSpeed = 30) {
    maqueen.MotorRun(maqueen.aMotors.M1, maqueen.Dir.CW, leftSpeed);
    maqueen.MotorRun(maqueen.aMotors.M2, maqueen.Dir.CW, rightSpeed);
}

function moveBackward(leftSpeed = 30, rightSpeed = 30) {
    maqueen.MotorRun(maqueen.aMotors.M1, maqueen.Dir.CCW, leftSpeed);
    maqueen.MotorRun(maqueen.aMotors.M2, maqueen.Dir.CCW, rightSpeed);
}

function turnLeft(speed = 30) {
    maqueen.MotorRun(maqueen.aMotors.M1, maqueen.Dir.CCW, speed);
    maqueen.MotorRun(maqueen.aMotors.M2, maqueen.Dir.CW, speed);
}

function turnRight(speed = 30) {
    maqueen.MotorRun(maqueen.aMotors.M1, maqueen.Dir.CW, speed);
    maqueen.MotorRun(maqueen.aMotors.M2, maqueen.Dir.CCW, speed);
}
function stopMotors() {
    maqueen.motorStopAll();
}

function setHeadLight(side: string, on: boolean) {
    maqueen.writeLED(
        side == 'left' ? maqueen.LED.LEDLeft : maqueen.LED.LEDRight,
        on ? maqueen.LEDswitch.turnOn : maqueen.LEDswitch.turnOff
    );
}

function loop() {
    moveForward(100, 30);
    beat(2);
    moveForward(30, 100);
    beat(2);
    moveForward(30, 100);
    beat(2);
    moveBackward(100, 30);
    beat(2);
    moveBackward(100, 30);
    beat(2);
    moveBackward(30, 100);
    beat(2);
    moveBackward(30, 100);
    beat(2);
}

function pace() {
    moveForward();
    beat();
    moveForward();
    beat();
    moveBackward();
    beat();
    moveBackward();
    beat();
}

function nod() {
    turnLeft();
    beat();
    turnRight();
    beat();
}

function spin() {
    turnLeft(100);
    beat(4);
}

basic.forever(function() {
    if (isRunning) {
        nod();
        nod();
        pace();
        pace();
        spin();
        loop();
    } else {
        stopMotors();
    }
});
