import { Component, inject, Input, signal } from '@angular/core';
import { FlagService } from '../flag.service';
import { Observable } from 'rxjs';
import { HeaderComponent } from '../header/header.component';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ROUTER_TOKENS } from '../app.routes';
import { Country } from '../../country';

@Component({
  selector: 'app-country-details',
  imports: [HeaderComponent, CommonModule, RouterLink, AsyncPipe],
  templateUrl: './country-details.component.html',
  styleUrl: './country-details.component.css',
})
export class CountryDetailsComponent {
  readonly ROUTER_TOKENS = ROUTER_TOKENS;
  country$!: Observable<Country>;

  constructor(
    private flagService: FlagService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const cca2 = this.route.snapshot.paramMap.get('cca2');
    if (cca2) {
      this.country$ = this.flagService.getCountryByCca2(cca2);
    }
  }
}
