import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {
  CovidDataAll,
  CovidDataSaxony,
  CovidGermanySevenDays,
  CovidSaxonySevenDays, Leipzig,
} from '../app/interfaces';
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

  getSevenDaysDataForGermany(): Observable<CovidGermanySevenDays> {
    return this.http.get<CovidGermanySevenDays>('https://api.corona-zahlen.org/germany/history/cases/7');
  }

  getSevenDaysDataForSaxony(): Observable<CovidSaxonySevenDays> {
    return this.http.get<CovidSaxonySevenDays>('https://api.corona-zahlen.org/states/SN/history/cases/7');
  }

  getDistrictsMap(): Observable<Blob> {
    return this.http.get('https://api.corona-zahlen.org/map/districts-legend', { responseType: 'blob' });
  }

  getStatesMap(): Observable<Blob> {
    return this.http.get('https://api.corona-zahlen.org/map/states-legend', { responseType: 'blob' });
  }

  getCaseDataFor7DaysLeipzig(): Observable<Leipzig> {
    return this.http.get<Leipzig>('https://api.corona-zahlen.org/districts/14713/history/cases/7');
  }
}
