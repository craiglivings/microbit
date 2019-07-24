let baseTime = input.runningTime();
let ms = 100;
let beats: number[] = [];
let isRunning = false;

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

function lightOn() {
    led.toggle(0, 0);
}

basic.forever(function() {
    if (isRunning) {
        led.toggle(0, 0);
        led.toggle(1, 0);
        basic.pause(ms);
        led.toggle(0, 0);
        basic.pause(ms);
    }
});
