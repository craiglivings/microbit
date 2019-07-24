input.onButtonPressed(Button.A, () => {
    if (isRunning) {
        value--;
        toggleColumn(value + 1);
        toggleColumn(value);
    }
});

input.onButtonPressed(Button.B, () => {
    if (isRunning) {
        value++;
        toggleColumn(value - 1);
        toggleColumn(value);
    }
});

function toggleColumn(col: number) {
    led.toggle(col, 0);
    led.toggle(col, 1);
    led.toggle(col, 2);
    led.toggle(col, 3);
    led.toggle(col, 4);
}

function win(player: string) {
    basic.showString(player);
    isRunning = false;
}

let value = 2;
let isRunning = true;
toggleColumn(value);

basic.forever(() => {
    if (isRunning) {
        if (value > 4) {
            win('B');
        }
        if (value < 0) {
            win('A');
        }
    }
});
