import {Component, Input, OnInit} from '@angular/core';
import {CovidDataAll, GermanyDataSevenDays} from '../interfaces';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  @Input() covidData: CovidDataAll | undefined;
  @Input() latestDate: GermanyDataSevenDays | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }

}
