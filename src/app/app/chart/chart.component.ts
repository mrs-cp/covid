import {Component, Input, OnInit} from '@angular/core';
import {LeipzigIncidenceHistory} from '../interfaces';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  @Input() frozenIncidencesForLeipzig: LeipzigIncidenceHistory[] | undefined;
  @Input() latestDate: Date | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }

}
