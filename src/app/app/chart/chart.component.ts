import {Component, Input, OnInit} from '@angular/core';
import {LeipzigIncidenceHistory} from '../interfaces';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  @Input() frozenIncidencesForLeipzig!: LeipzigIncidenceHistory[];
  @Input() latestDate!: Date | undefined;

  constructor() {
  }

  get weekIncidence(): number {
    return this.frozenIncidencesForLeipzig[this.frozenIncidencesForLeipzig.length - 1].weekIncidence;
  }

  get date(): Date {
    return this.frozenIncidencesForLeipzig[this.frozenIncidencesForLeipzig.length - 1].date;
  }

  ngOnInit(): void {
  }

}
