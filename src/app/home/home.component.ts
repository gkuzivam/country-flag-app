import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { Country } from '../../country';
import { FlagService } from '../flag.service';
import { Subscription, tap } from 'rxjs';
import { CountryCardComponent } from '../country-card/country-card.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CountryCardComponent, CommonModule, HeaderComponent, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  countryList: Country[] = [];
  filteredCountryList: Country[] = [];
  flagService: FlagService = inject(FlagService);
  sub!: Subscription;
  searchQuery: string = '';
  selectedRegion: string = '';
  changeDetector: ChangeDetectorRef = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.sub = this.flagService
      .getCountries()
      .pipe(tap(() => console.log('in componet pipeline')))
      .subscribe((countries) => {
        this.countryList = countries;
        this.filteredCountryList = countries;
        console.log(this.countryList);
        this.changeDetector.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onSearch(): void {
    this.applyFilters();
  }

  onRegionFilterChange(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    let filtered = this.countryList;

    // apply search filter
    if (this.searchQuery) {
      filtered = filtered.filter((country) =>
        country.name.official
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase())
      );
    }

    // apply region filter
    if (this.selectedRegion) {
      filtered = filtered.filter(
        (country) => country.region === this.selectedRegion
      );
    }

    this.filteredCountryList = filtered;
  }
}
