import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Country } from '../../country';
import { FlagService } from '../flag.service';
import { Subscription, tap } from 'rxjs';
import { CountryCardComponent } from '../country-card/country-card.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-home',
  imports: [CountryCardComponent, CommonModule, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  countryList: Country[] = [];
  flagService: FlagService = inject(FlagService);
  sub!: Subscription;

  ngOnInit(): void {
     this.sub =  this.flagService.getCountries()
        .pipe(
          tap(() => console.log('in componet pipeline'))
        ).subscribe(countries => {
          this.countryList = countries;
          console.log(this.countryList);
        }); 
  }

  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }

}
