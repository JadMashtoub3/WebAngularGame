export class Result {

  winner: string;
  date: Date;

  constructor(_winner: string, _attacks: string, _date: Date) {
    this.winner = _winner;
    this.date = _date;
  }

}
