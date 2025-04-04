import { Component, OnInit } from '@angular/core';
import { FlagService } from '../flag.service';
import { catchError, map, Observable, of } from 'rxjs';
import { HeaderComponent } from '../header/header.component';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ROUTER_TOKENS } from '../app.routes';
import { Country } from '../../country';

@Component({
  selector: 'app-country-details',
  imports: [HeaderComponent, CommonModule, RouterLink, AsyncPipe],
  templateUrl: './country-details.component.html',
  styleUrl: './country-details.component.css',
})
export class CountryDetailsComponent implements OnInit {
  readonly ROUTER_TOKENS = ROUTER_TOKENS;
  country$!: Observable<Country | null>;
  languages$!: Observable<string | null >;
  currencies$!: Observable<string | null >;

  constructor(
    private flagService: FlagService,
    private route: ActivatedRoute, 
    private router: Router,
  ) {}

  ngOnInit(): void {
    const cca2 = this.route.snapshot.paramMap.get('cca2');
    if (cca2) {
      this.country$ = this.flagService.getCountryByCca2(cca2).pipe(
        catchError(() => {
          this.router.navigate(['/notfound']);
          return of(null);
        })
      )
      this.languages$ = this.country$.pipe(
        map((country) => {
          if (country) {
            return Object.values(country.languages).join(', ');
          }
          return null; // Return null if no country
        })
      );

      this.currencies$ = this.country$.pipe(
        map((country) => {
          if (country) {
            return Object.values(country.currencies)
            .map((currency) => currency.name)
            .join(', ');
          }
          return null; // Return null if no country
          
        })
      );
    }
  }
}
