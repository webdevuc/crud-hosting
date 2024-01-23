import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Country } from '../Model/country';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  constructor(private _snackBar: MatSnackBar, private http: HttpClient) {}

  openSnackBar(message: string, action: string = 'ok') {
    this._snackBar.open(message, action, {
      duration: 1000,
      verticalPosition: 'top',
    });
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      'X-CSCAPI-KEY':
        'MGZMRlZLbkZ0SmNiOGkxQzBlREFLYjBKdlZZU1BnRmlRbGI3N2lvVg==',
    }),
  };

  getCountry(): Observable<Country[]> {
    return this.http.get<Country[]>(
      ' https://api.countrystatecity.in/v1/countries',
      { headers: this.httpOptions.headers }
    );
  }

  getStateOfSelectedCountry(countryIso: string): Observable<any> {
    console.log(countryIso, 'countryIso');
    return this.http.get(
      `https://api.countrystatecity.in/v1/countries/${countryIso}/states`,
      { headers: this.httpOptions.headers }
    );
  }

  getCitiesOfSelectedState(countryIso: any, stateIso: any): Observable<any> {
    console.log(countryIso, stateIso);
    return this.http.get(
      `https://api.countrystatecity.in/v1/countries/${countryIso}/states/${stateIso}/cities`,
      { headers: this.httpOptions.headers }
    );
  }
}
