export class Hero {
  heroID: number;
  name: string;
  MinHit: number;
  MaxHit: number;
  uses: number;
  chosen: boolean;

  constructor(_heroID: number, _name: string, _MinHit: number,  _MaxHit: number, _uses: number) {
    this.heroID = _heroID;
    this.name = _name;
    this.MinHit = _MinHit;
    this.MaxHit = _MaxHit;
    this.uses = _uses;
    this.chosen = false;
  }

}
