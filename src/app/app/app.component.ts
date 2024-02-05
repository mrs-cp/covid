import {Component, inject, OnInit} from '@angular/core';
import {
  CovidDataAll,
  CovidDataSaxony,
  CovidGermanySevenDays,
  CovidSaxonySevenDays, CovidSaxonySevenDaysHistory, GermanyDataSevenDays, Leipzig,
  LeipzigHistory,
  LeipzigIncidenceHistory
} from './interfaces';
import {ApiService} from '../services/api.service';
import {catchError, combineLatest, finalize, of} from 'rxjs';
import {SwUpdate} from '@angular/service-worker';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DatePipe]
})
export class AppComponent implements OnInit {
  // injections
  private api = inject(ApiService);
  private swUpdate = inject(SwUpdate);
  private datePipe = inject(DatePipe);

  covidData?: CovidDataAll;
  covidDataSaxony?: CovidDataSaxony;
  covidSevenDaysDataSaxony?: CovidSaxonySevenDays;
  covidSevenDaysDataGermany?: CovidGermanySevenDays;
  frozenIncidencesForLeipzig: LeipzigIncidenceHistory[] = [];
  leipzigData: number[] = [];
  leipzigDataDays: string[] = [];
  mapImage: any;
  stateMapImage: any;
  data: any;
  chartOptions: any;
  loading = false;

  ngOnInit(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.subscribe(() => {
        if (confirm('Neue Version verfügbar. Laden?')) {
          window.location.reload();
        }
      });
    }

    this.loading = true;
    combineLatest(
      this.api.getDataForAllFederalStates().pipe(catchError(() => of(undefined))),
      this.api.getDataForSaxony().pipe(catchError(() => of(undefined))),
      this.api.getSevenDaysDataForGermany().pipe(catchError(() => of(undefined))),
      this.api.getSevenDaysDataForSaxony().pipe(catchError(() => of(undefined))),
      this.api.getDistrictsMap().pipe(catchError(() => of(null))),
      this.api.getStatesMap().pipe(catchError(() => of(null))),
      this.api.getCaseDataFor14DaysLeipzig().pipe(catchError(() => of(null))),
      this.api.getFrozenIncidencesForLeipzig().pipe(catchError(() => of(null))),
    ).pipe(finalize(() => this.loading = false)).subscribe({
      next: (
        [
          federalStatesData,
          saxonyData,
          sevenDaysGermany,
          sevenDaysSaxony,
          districtsMap, statesMap,
          leipzigData,
          leipzigIncidences
        ]
      ): void => {
        this.covidData = federalStatesData;
        this.covidDataSaxony = saxonyData;
        this.covidSevenDaysDataGermany = sevenDaysGermany;
        this.covidSevenDaysDataSaxony = sevenDaysSaxony;
        if (leipzigIncidences) {
          const leipzigIncidenceHistory = Object.values(leipzigIncidences.data).map(val => val) as any;
          this.frozenIncidencesForLeipzig = leipzigIncidenceHistory[0].history;
        }
        if (districtsMap) {
          this.createImageFromBlob(districtsMap, true);
        }
        if (statesMap) {
          this.createImageFromBlob(statesMap, false);
        }
        if (leipzigData) {
          this.createCharts(leipzigData);
        }
      }
    });
  }

  createImageFromBlob(image: Blob, district: boolean): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      district ? this.mapImage = reader.result : this.stateMapImage = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  private createCharts(leipzigData: Leipzig): void {
    const city = Object.values(leipzigData.data).map(val => val) as any;
    city[0].history.forEach((entry: LeipzigHistory) => {
      this.leipzigData.push(entry.cases);
      this.leipzigDataDays.push(this.datePipe.transform(entry.date) as string);
    });
    this.data = {
      labels: this.leipzigDataDays,
      datasets: [{
        label: '',
        type: 'line',
        borderColor: 'rgba(229, 134, 134, 0.7)',
        borderWidth: 2,
        fill: false,
        data: this.leipzigData
      }, {
        type: 'bar',
        label: '',
        backgroundColor: '#b9adad66',
        data: this.leipzigData
        ,
        borderColor: 'white',
        borderWidth: 2
      }]
    };
    this.chartOptions = {
      plugins: {
        legend: {
          display: false,
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        },
        y: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        }
      }
    };
  }

  getLatestDate(date: Date, germany: boolean): GermanyDataSevenDays | CovidSaxonySevenDaysHistory | undefined {
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
