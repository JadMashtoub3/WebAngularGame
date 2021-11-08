import { Hero } from "./hero";
import { Result } from "./result";
import { Villain } from "./villain";

export class Game {

hero: Hero[] = [];
villain: Villain[] = [];
heroRoll: number;

  constructor () {
    this.hero = [];
    this.villain = [];
  }
}
