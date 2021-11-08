import { Component, Input, OnInit } from '@angular/core';
import { HeroGameService } from 'src/app/herogame.service';
import { Hero } from 'src/app/models/hero';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {
  @Input() hero: Hero;
  constructor(private _api: HeroGameService) { }
  ngOnInit(): void {
  }
}
