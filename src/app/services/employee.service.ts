import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../Model/country';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private _http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
      'X-CSCAPI-KEY':
        'MGZMRlZLbkZ0SmNiOGkxQzBlREFLYjBKdlZZU1BnRmlRbGI3N2lvVg==',
    }),
  };

  getCountry(): Observable<Country[]> {
    return this._http.get<Country[]>(
      ' https://api.countrystatecity.in/v1/countries',
      { headers: this.httpOptions.headers }
    );
  }

  getStateOfSelectedCountry(countryIso: string): Observable<any> {
    return this._http.get(
      `https://api.countrystatecity.in/v1/countries/${countryIso}/states`,
      { headers: this.httpOptions.headers }
    );
  }

  getCitiesOfSelectedState(countryIso: any, stateIso: any): Observable<any> {
    return this._http.get(
      `https://api.countrystatecity.in/v1/countries/${countryIso}/states/${stateIso}/cities`,
      { headers: this.httpOptions.headers }
    );
  }

  // ---==============================================----------------=========================

  addEmployee(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/employees', data);
  }

  upload(data: any, file: any): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this._http.post('http://localhost:3000/employees', data);
  }

  updateEmployee(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/employees/${id}`, data);
  }

  getEmployeeList(): Observable<any> {
    return this._http.get('http://localhost:3000/employees');
  }

  deleteEmployee(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/employees/${id}`);
  }
}
