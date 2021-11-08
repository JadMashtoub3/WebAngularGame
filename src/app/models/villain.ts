export class Villain {
  villainID: number;
  name: string;
  VHealth: number;
  chosen: boolean;

  constructor(_villainID: number, _name: string) {
    this.villainID = _villainID;
    this.name = _name;
    this.chosen = false;
    this.VHealth = 10;
  }
}
