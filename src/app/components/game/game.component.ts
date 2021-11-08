import { Component, OnInit } from '@angular/core';
import { HeroGameService } from 'src/app/services/herogame.service';
import { Game } from 'src/app/models/game';
import { Hero } from 'src/app/models/hero';
import { Villain } from 'src/app/models/villain';
import { Result } from 'src/app/models/result';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  heroList: Hero[];
  villainsList: Villain[];
  resultsList: Result[];
  game: Game = new Game();
  selectedHero: Hero;
  selectedVillain: Villain;
  clicked = false;
  totalUses: number;
  totalHP: number;
  chosenHeroVillain = true;
  postGame: Result;
  currentDate = new Date;
  currentSelectedHeroIndex: number;
  currentSelectedVillainIndex: number;
  constructor(private _api: HeroGameService) { }

  //subscribes
  ngOnInit() {
    this._api.getHeroes().subscribe(
      unpackedHero => this.heroList = unpackedHero)
    this._api.getVillains().subscribe(
      unpackedVillain => this.villainsList = unpackedVillain)
    this._api.getResults().subscribe(
      unpackedResults => this.resultsList = unpackedResults)}

      loadGame(): void {
    for(let i=0; i < this.villainsList.length; i++) {
      this.villainsList[i].VHealth = Math.floor(Math.random() * (300 - 1) + 1)
    }
    console.log(this.resultsList.reverse())}
  setSelectedHero(event): void {
    for (let appHero of event.currentTarget.parentElement.children) {
      appHero.className = '';
    }
    if (this.currentSelectedHeroIndex == event.currentTarget.id ) {
      this.currentSelectedHeroIndex = null;
      this.selectedHero.chosen = false;
      this.chosenHeroVillain = true;
      return;
    }

    this.currentSelectedHeroIndex = event.currentTarget.id;
    event.currentTarget.className = "selected";
    this.selectedHero = this.heroList[this.currentSelectedHeroIndex];
    this.selectedHero.chosen = true;
    this.enableRoll();
  }

  setSelectedVillain(event): void { //selects villain
    for(let appVillain of event.currentTarget.parentElement.children) {
      appVillain.className = "";
    }
    if (this.currentSelectedVillainIndex == event.currentTarget.id) {
      this.currentSelectedVillainIndex = null;
      this.selectedVillain.chosen = false
      this.chosenHeroVillain = true;
      return;
    }
    this.currentSelectedVillainIndex = event.currentTarget.id;
    event.currentTarget.className = "selected";
    this.selectedVillain = this.villainsList[this.currentSelectedVillainIndex];
    this.selectedVillain.chosen = true;
    this.enableRoll();
  }
  enableRoll(): void {
    // greys out the roll button if villain and hero arent chosen
    if (this.selectedHero.chosen == true) {
    if (this.selectedVillain.chosen == true) {
        this.chosenHeroVillain = false; }
    } else {
      this.chosenHeroVillain = true;
    }
  }
  roll(): void {
    // generates the random roll using the hero's min and max rolls
    this.game.heroRoll = Math.floor(Math.random() * (this.selectedHero.maxDice  - this.selectedHero.minDice + 1) + this.selectedHero.minDice);
    if(this.selectedVillain.VHealth > 0) {
      //run method offHero(); if hero uses is equal to 0
      if(this.selectedHero.uses != 0) {
        this.selectedHero.uses--;
      } else {
        this.offHero();
        return;
      }
      // hero roll - Villains VHealth
      this.selectedVillain.VHealth -= this.game.heroRoll;
      // sets villains hp to 0 instead of a negative
      if(this.selectedVillain.VHealth <= 0) {
        this.selectedVillain.VHealth = 0
        console.log("disable villain")
      }
        this.results();
    }
  }
  offHero(): void {
    console.log("hero disabled");
  }
  Lose(): void {
    this.postGame = {winner: "Villains won on ", date: this.currentDate } //winner: xxxxxxx date: (currentDate)

    this._api.postResults(this.postGame).subscribe(
      response => console.log("working", response)
    )
  }
  Win(): void {
    this.postGame = {winner: "Heroes won on ", date: this.currentDate } //winner: xxxxxxx date: (currentDate)
    this._api.postResults(this.postGame).subscribe(
      response => console.log("working", response)
    )
  }
  results(): void {
    const display: HTMLElement = document.getElementById("result-disp") as HTMLElement
    display.innerHTML = `${this.selectedHero.name} rolled ${this.game.heroRoll} and hit ${this.selectedVillain.name}`
    this.totalUses = this.heroList.map(a => a.uses).reduce(function(a, b){
      return a+b;
    });
    //hits villains and determines hp of all villains
    this.totalHP = this.villainsList.map(a => a.VHealth).reduce(function(a, b){
      return a+b;
    });

      //if the total uses of villains is equal to 0 then game will end and return villains win
    if(this.totalUses == 0) {
      display.innerHTML = `The villains have won!`;
      console.log('WinVillain')
      this.Lose();
      //if the total hp of villains is equal to 0 then game will end and return heroes win
    } else if(this.totalHP == 0) {
      display.innerHTML = `the heroes have won!`;
      console.log('WinHero')
      this.Win();
    }
  }
}
