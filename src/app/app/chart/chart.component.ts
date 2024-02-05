import {Component, Input} from '@angular/core';
import {LeipzigIncidenceHistory} from '../interfaces';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent {
  @Input() frozenIncidencesForLeipzig: LeipzigIncidenceHistory[] = [];
  @Input() latestDate!: Date;

  get weekIncidence(): number {
    return this.frozenIncidencesForLeipzig[this.frozenIncidencesForLeipzig.length - 1].weekIncidence;
  }

}
