import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CountryDetailsComponent } from './country-details/country-details.component';
import { NotfoundComponent } from './notfound/notfound.component';

export enum ROUTER_TOKENS {
  HOME = 'home',
  DETAILS = 'details',
}

export const routes: Routes = [
  {
    path: '',
    redirectTo: ROUTER_TOKENS.HOME,
    pathMatch: 'full',
  },
  {
    path: ROUTER_TOKENS.HOME,
    component: HomeComponent,
    title: 'Country Flag App - Home',
  },
  {
    path: `${ROUTER_TOKENS.DETAILS}/:cca2`,
    component: CountryDetailsComponent,
    title: 'Country Flag App - Details',
  },
  {
    path: '**',
    component: NotfoundComponent,
    title: 'Country Flag App - Not Found',
  },
];
