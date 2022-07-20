import p5 from "p5";
import CharacterSymbol from "./character-symbol";

export default class CharacterColumn {
  _p5: p5;
  size: number;
  speed: number;
  x: number;
  y: number;
  characters: CharacterSymbol[] = [];

  constructor(
    p5: p5,
    size: number,
    x: number,
    y: number,
    speed: number,
    count: number
  ) {
    this._p5 = p5;
    this.size = size;
    this.speed = speed;
    this.x = x;
    this.y = y;

    for (let i = 0; i < count; ++i) {
      let character = new CharacterSymbol(p5, x, y + size * i, size);
      this.characters.push(character);
    }
  }

  displayColumn() {
    this.characters.forEach((character) => {
      character.displayAnimatedSymbol();
      if (character.y >= this._p5.windowHeight) {
        character.y = 0;
      }
      character.y += this.speed;
    });
  }
}
