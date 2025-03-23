import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MoneyService } from '../../app/pages/ingame/services/money-service';
import { WheatService } from '../../app/pages/ingame/services/wheat-service';
import { RockService } from '../../app/pages/ingame/services/rock-service';
import { WoodService } from '../../app/pages/ingame/services/wood-service';

@Component({
  selector: 'app-ressources-window',
  imports: [],
  templateUrl: './ressources-window.component.html',
  styleUrl: './ressources-window.component.scss',
})
export class RessourcesWindowComponent implements OnInit, OnDestroy {
  private moneySubscription!: Subscription;
  private wheatSubscription!: Subscription;
  private woodSubscription!: Subscription;
  private rockSubscription!: Subscription;
  money: number = 0;
  wheat: number = 0;
  wood: number = 0;
  rock: number = 0;

  constructor(
    private _moneyService: MoneyService,
    private _wheatService: WheatService,
    private _rockService: RockService,
    private _woodService: WoodService
  ) {}

  ngOnInit(): void {
    this.moneySubscription = this._moneyService.money$.subscribe((money) => {
      this.money = money;
    });
    this.wheatSubscription = this._wheatService.wheat$.subscribe((wheat) => {
      this.wheat = wheat;
    });
    this.woodSubscription = this._woodService.wood$.subscribe((wood) => {
      this.wood = wood;
    });
    this.rockSubscription = this._rockService.rock$.subscribe((rock) => {
      this.rock = rock;
    });
  }

  ngOnDestroy(): void {
    this.moneySubscription.unsubscribe();
    this.rockSubscription.unsubscribe();
    this.woodSubscription.unsubscribe();
    this.wheatSubscription.unsubscribe();
  }
}
