import { Component, Input } from '@angular/core';
import { Country } from '../../country';
import { DecimalPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ROUTER_TOKENS } from '../app.routes';

@Component({
  selector: 'app-country-card',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './country-card.component.html',
  styleUrl: './country-card.component.css',
})
export class CountryCardComponent {
  @Input() country!: Country;
  readonly ROUTER_TOKENS = ROUTER_TOKENS;

  constructor(private router: Router) {}

  navigateToDetails(): void {
    this.router.navigate(['/', ROUTER_TOKENS.DETAILS, this.country.cca2]);
  }
}
