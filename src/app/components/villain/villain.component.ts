import { Component, Input, OnInit } from '@angular/core';
import {HeroGameService } from 'src/app/services/herogame.service';
import { Villain } from 'src/app/models/villain';

@Component({
  selector: 'app-villain',
  templateUrl: './villain.component.html',
  styleUrls: ['./villain.component.css']
})
export class VillainComponent implements OnInit {
  @Input() villain: Villain;
  constructor(private _api: HeroGameService) { }
  ngOnInit(): void {
  }
}
