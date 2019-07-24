import { transform } from './transform';

test('Stop', () => {
    const result = transform(0, 0);
    expect(result.left).toBe(0);
    expect(result.right).toBe(0);
});

test('Hard left', () => {
    const result = transform(-5, 0);
    expect(result.left).toBe(-5);
    expect(result.right).toBe(5);
});

test('Hard right', () => {
    const result = transform(5, 0);
    expect(result.left).toBe(5);
    expect(result.right).toBe(-5);
});

test('Slow forward', () => {
    const result = transform(0, 1);
    expect(result.left).toBe(1);
    expect(result.right).toBe(1);
});

test('Medium forward', () => {
    const result = transform(0, 5);
    expect(result.left).toBe(5);
    expect(result.right).toBe(5);
});

test('Fast forward', () => {
    const result = transform(0, 10);
    expect(result.left).toBe(10);
    expect(result.right).toBe(10);
});

test('Slow backwards', () => {
    const result = transform(0, -1);
    expect(result.left).toBe(-1);
    expect(result.right).toBe(-1);
});

test('Medium backwards', () => {
    const result = transform(0, -5);
    expect(result.left).toBe(-5);
    expect(result.right).toBe(-5);
});

test('Fast backwards', () => {
    const result = transform(0, -10);
    expect(result.left).toBe(-10);
    expect(result.right).toBe(-10);
});

test('Turn right', () => {
    const result = transform(3, 6);
    expect(result.left).toBe(6);
    expect(result.right).toBe(4);
});

test('Turn left', () => {
    const result = transform(-3, 6);
    expect(result.left).toBe(4);
    expect(result.right).toBe(6);
});

test('Fast right', () => {
    const result = transform(10, 10);
    expect(result.left).toBe(10);
    expect(result.right).toBe(0);
});

test('Fast left', () => {
    const result = transform(-10, 10);
    expect(result.left).toBe(0);
    expect(result.right).toBe(10);
});

test('Medium left', () => {
    const result = transform(-7, 10);
    expect(result.left).toBe(3);
    expect(result.right).toBe(10);
});

test('Backwards left', () => {
    const result = transform(-7, -10);
    expect(result.left).toBe(-3);
    expect(result.right).toBe(-10);
});

test('Backwards right', () => {
    const result = transform(3, -5);
    expect(result.left).toBe(-5);
    expect(result.right).toBe(-4);
});

test('Backwards right slight', () => {
    const result = transform(10, -1);
    expect(result.left).toBe(-1);
    expect(result.right).toBe(0);
});
