export class Hero {
  heroID: number;
  name: string;
  minDice: number;
  maxDice: number;
  uses: number;
  chosen: boolean;

  constructor(_heroID: number, _name: string, _minDice: number,  _maxDice: number, _uses: number) {
    this.heroID = _heroID;
    this.name = _name;
    this.minDice = _minDice;
    this.maxDice = _maxDice;
    this.uses = _uses;
    this.chosen = false;
  }
}
