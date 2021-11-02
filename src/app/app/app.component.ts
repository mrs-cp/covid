import {Component, OnInit} from '@angular/core';
import {CovidDataAll, CovidDataSaxony} from './interfaces';
import {ApiService} from '../services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'covid-app';
  covidData: CovidDataAll | undefined;
  covidDataSaxony: CovidDataSaxony | undefined;

  constructor(private api: ApiService) {
  }

  ngOnInit(): void {
    this.api.getDataForAllFederalStates().subscribe(data => {
      this.covidData = data;
    });
    this.api.getDataForSaxony().subscribe(dataSaxony => this.covidDataSaxony = dataSaxony);
  }
}
