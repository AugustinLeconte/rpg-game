import { Routes } from '@angular/router';
import { MapComponent } from '../components/map/map.component';
import { MainMenuComponent } from './pages/menu/components/main-menu/main-menu.component';
import { SettingsComponent } from './pages/menu/components/settings/settings.component';
import { AuthPageComponent } from './pages/auth/components/auth-page/auth-page.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'auth', component: AuthPageComponent },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: '', component: MainMenuComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'game', component: MapComponent },
      { path: '**', redirectTo: '' },
    ],
  },
];
