import p5 from 'p5';

export default class Jitter {
	_p5: p5;
	x: number;
	y: number;
	width: number = 100;
	height: number = 100;
	diameter: number;
	speed: number;
	minSpeed: number;
	maxSpeed: number;
	speedDirection: 'up' | 'down';

	constructor(p5: p5, x: number, y: number) {
		this._p5 = p5;
		this.x = x;
		this.y = y;
		this.diameter = 10;
		this.speed = 1;
		this.minSpeed = 35;
		this.maxSpeed = 35;
		this.speedDirection = 'up';
	}

	move() {
		// With mouse
		this.x = this._p5.mouseX;
		this.y = this._p5.mouseY;
		// Random
		this.x += this._p5.random(10, this.speed % this.maxSpeed);
		this.y += this._p5.random(10, this.speed % this.minSpeed);
		this.diameter = this._p5.random(10, 100);

		if (this.speedDirection === 'up') {
			this.speed = this.speed + 1;
		}

		if (this.speedDirection === 'down') {
			this.speed = this.speed - 1;
		}

		if (this.speed === this.maxSpeed) {
			this.speedDirection = 'down';
		}
		if (this.speed === 1) {
			this.speedDirection = 'up';
		}
	}

	display() {
		this._p5.push();
		const alpha = this.speed / 160;
		this._p5.stroke(180, alpha);
		this._p5.fill(this.y % 256, this.x % 256, 255, alpha);
		this._p5.ellipse(this.x, this.y, this.diameter * 2.5, this.diameter * 2.5);
		this._p5.pop();
	}
}
