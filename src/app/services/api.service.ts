import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CovidDataAll, CovidDataSaxony} from '../app/interfaces';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getDataForAllFederalStates(): Observable<CovidDataAll> {
    return this.http.get<CovidDataAll>('https://api.corona-zahlen.org/germany');
  }

  getDataForSaxony(): Observable<CovidDataSaxony> {
    return this.http.get<CovidDataSaxony>('https://api.corona-zahlen.org/states/SN');
  }
}
