import {Component, OnInit} from '@angular/core';
import {CovidDataAll, CovidDataSaxony, CovidGermanySevenDays, CovidSaxonySevenDays} from './interfaces';
import {ApiService} from '../services/api.service';
import {combineLatest} from 'rxjs';
import {SwUpdate} from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  covidData: CovidDataAll | undefined;
  covidDataSaxony: CovidDataSaxony | undefined;
  covidSevenDaysDataSaxony: CovidSaxonySevenDays | undefined;
  covidSevenDaysDataGermany: CovidGermanySevenDays | undefined;

  constructor(private api: ApiService, private swUpdate: SwUpdate) {
  }

  ngOnInit(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if (confirm('Neue Version verfügbar. Laden?')) {
          window.location.reload();
        }
      });
    }

    combineLatest(
      this.api.getDataForAllFederalStates(),
      this.api.getDataForSaxony(),
      this.api.getSevenDaysDataForGermany(),
      this.api.getSevenDaysDataForSaxony()
    ).subscribe(([federalStatesData, saxonyData, sevenDaysGermany, sevendDaysSaxony]) => {
      this.covidData = federalStatesData;
      this.covidDataSaxony = saxonyData;
      this.covidSevenDaysDataGermany = sevenDaysGermany;
      this.covidSevenDaysDataSaxony = sevendDaysSaxony;
    });
  }

  getLatestDate(date: Date, germany: boolean): any {
    const latestDate = new Date(date);
    latestDate.setDate(latestDate.getDate() - 7);
    if (germany) {
      return this.covidSevenDaysDataGermany?.data.find(data =>
        new Date(data.date).toLocaleDateString() === latestDate.toLocaleDateString());
    } else {
      return this.covidSevenDaysDataSaxony?.data.SN.history.find(data =>
        new Date(data.date).toLocaleDateString() === latestDate.toLocaleDateString());
    }
  }
}
