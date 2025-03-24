import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RessourcesWindowComponent } from './pages/ingame/components/UI/ressources-window/ressources-window.component';
import { MapComponent } from './pages/ingame/components/map/map.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'rpg-game';

  constructor() {}
}
