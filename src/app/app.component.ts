import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RessourcesWindowComponent } from '../components/ressources-window/ressources-window.component';
import { MapComponent } from '../components/map/map.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RessourcesWindowComponent, MapComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'rpg-game';

  constructor() {}
}
