import { Component, Input } from '@angular/core';
import { Country } from '../../country';

@Component({
  selector: 'app-country-card',
  imports: [],
  templateUrl: './country-card.component.html',
  styleUrl: './country-card.component.css'
})
export class CountryCardComponent {
  @Input() country!: Country;

}
