export class Result {

  winner: string;
  time: Date;

  constructor(_winner: string, _attacks: string, _time: Date) {
    this.winner = _winner;
    this.time = _time;
  }

}
