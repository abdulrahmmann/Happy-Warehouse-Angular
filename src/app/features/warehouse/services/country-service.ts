import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CountryModel} from '../models/Country.model';

const BASE_URL: string = "https://localhost:7018/api/Country";

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  httpClient = inject(HttpClient);

  getAllCountries(): Observable<CountryModel[]> {
    return this.httpClient.get<CountryModel[]>(`${BASE_URL}/list`);
  }
}
