import { Routes } from '@angular/router';
import { MapComponent } from '../components/map/map.component';
import { MainMenuComponent } from './pages/menu/components/main-menu/main-menu.component';
import { SettingsComponent } from './pages/menu/components/settings/settings.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MainMenuComponent,
  },
  {
    path: 'settings',
    pathMatch: 'full',
    component: SettingsComponent,
  },
  {
    path: 'game',
    pathMatch: 'full',
    component: MapComponent,
  },
  {
    path: '**',
    component: MainMenuComponent,
  },
];
