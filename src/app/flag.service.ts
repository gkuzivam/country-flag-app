import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Country } from '../country';

@Injectable({
  providedIn: 'root',
})
export class FlagService {
  private apiUrl = 'https://restcountries.com/v3.1/all';
  private cc2aUrl = 'https://restcountries.com/v3.1/alpha';
  private http = inject(HttpClient);

  getCountries(): Observable<Country[]> {
    return this.http
      .get<Country[]>(this.apiUrl)
      .pipe(tap(() => console.log('In  http.get pipeline')));
  }

  getCountryByCca2(cca2: string): Observable<Country> {
    return this.http.get<Country>(`${this.cc2aUrl}/${cca2}`).pipe(
      tap((data) => {
        console.log(data);
      })
    );
  }
}
