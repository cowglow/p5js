import p5 from 'p5';

export default class CharacterSymbol {
	_p5: p5;
	x: number;
	y: number;
	size: number;
	character: string;

	charSet = ['0223', '0228', '0246', '0252', '0196', '0214', '0220'];

	constructor(p5: p5, x: number, y: number, size: number) {
		this._p5 = p5;
		this.x = x;
		this.y = y;
		this.size = size;

		this.character = this.setSymbol();
	}

	setSymbol() {
		return String.fromCharCode(
			Number(this.charSet[Math.floor(Math.random() * this.charSet.length)])
		);
	}

	displaySymbol() {
		this.setSymbol();
		this._p5.fill(156, 98, 63);
		this._p5.text(this.character, this.x, this.y);
		this._p5.textSize(this.size);
	}

	displayAnimatedSymbol() {
		this.character = this.setSymbol();
		this.displaySymbol();
	}
}
