import { AnalogPin, basic, Button, input, led, maqueen, pins, radio } from './mockRobot';

class AnalogStick {
    private _value: number;
    constructor(private _min: number, private _max: number) {}

    public setValue(value: number) {
        this._value = value;
    }

    public getValue() {
        if (this._value < this._min) {
            this._value = this._min;
        }
        return Math.round(((this._value - this._min) / (this._max - this._min)) * 20) - 10;
    }
}

class LEDMatrix {
    constructor(private _size: number = 5) {}

    public clear() {
        for (let index = 0; index < this._size; index++) {
            this.clearColumn(index);
        }
    }

    public clearColumn(col: number) {
        for (let index = 0; index < this._size; index++) {
            led.unplot(col, index);
        }
    }

    public clearRow(row: number) {
        for (let index = 0; index < this._size; index++) {
            led.unplot(index, row);
        }
    }
}

interface IVelocity {
    left: number;
    right: number;
}

class Robot {
    public velocity: IVelocity;

    constructor() {
        this.velocity = { left: 0, right: 0 };
    }

    public move(direction: number, speed: number) {
        this.velocity = this.transform(direction, speed);
        const runMotor = (motor: number, value: number) => {
            if (value > 0) {
                maqueen.MotorRun(motor, maqueen.Dir.CW, value * 10);
            } else {
                maqueen.MotorRun(motor, maqueen.Dir.CCW, -value * 10);
            }
        };

        runMotor(maqueen.aMotors.M1, this.velocity.left);
        runMotor(maqueen.aMotors.M2, this.velocity.right);
    }

    public setHeadlights(value: 1 | 0) {
        maqueen.writeLED(maqueen.LED.LEDLeft, value);
        maqueen.writeLED(maqueen.LED.LEDRight, value);
    }

    private transform(direction: number, speed: number): { left: number; right: number } {
        const slowSpeed = Math.round((1 - Math.abs(direction) / 10) * Math.abs(speed));
        if (direction === 0) {
            return { left: speed, right: speed };
        }
        if (speed === 0) {
            return { left: direction, right: -direction };
        }
        if (direction > 0) {
            return { left: speed, right: speed < 0 && slowSpeed !== 0 ? -slowSpeed : slowSpeed };
        } else {
            return { left: speed < 0 ? -slowSpeed : slowSpeed, right: speed };
        }
    }
}

const mapPowerToLED = (LEDColumn: number, power: number) => {
    led.plot(2, 2);
    screen.clearColumn(LEDColumn);
    led.plot(LEDColumn, 4 - Math.round((power + 10) / 5));
};

// Events

input.onButtonPressed(Button.A, () => {
    screen.clear();
    isRunning = !isRunning;
});

input.onButtonPressed(Button.B, () => (isHost = !isHost));

radio.onReceivedString((receivedString: string) => {
    const values = receivedString.split(':');
    const action = values[0];
    if (!isHost && action === 'MOVE') {
        const direction = parseInt(values[1]);
        const speed = parseInt(values[2]);
        robot.move(direction, speed);
        const action = 'VELOCITY:' + robot.velocity.left + ':' + robot.velocity.right;
        mapPowerToLED(1, robot.velocity.left);
        mapPowerToLED(3, robot.velocity.right);
        radio.sendString(action);
    }

    if (isHost && action === 'VELOCITY') {
        const left = parseInt(values[1]);
        const right = parseInt(values[2]);
        mapPowerToLED(1, left);
        mapPowerToLED(3, right);
    }
});

// Setup

const screen = new LEDMatrix();
const speedController = new AnalogStick(69, 975);
const directionController = new AnalogStick(182, 824);
const robot = new Robot();

let isHost = true;
let isRunning = false;

radio.setGroup(60);

// Run

basic.forever(() => {
    if (isRunning) {
        robot.setHeadlights(1);
        if (isHost) {
            speedController.setValue(pins.analogReadPin(AnalogPin.P1));
            directionController.setValue(pins.analogReadPin(AnalogPin.P0));
            radio.sendString('MOVE:' + directionController.getValue() + ':' + speedController.getValue());
        }
    } else {
        basic.showString(isHost ? 'H' : 'C');
        robot.setHeadlights(0);
    }
});
