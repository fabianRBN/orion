import { Component, OnInit, Input } from '@angular/core';

import { ChartOptions, ChartType, ChartDataSets} from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  barChartOptions: ChartOptions = {
    responsive: true,
  };
 /*  barChartLabels: Label[] = ['Plan ($)', 'Actual ($)', 'Rem. ($)', 'Exp. ($)'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [250005, 37, 60, 70 ], label: 'Resources' }
  ]; */

  @Input() barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  @Input() barChartPlugins = [];

  @Input() barChartData: ChartDataSets[] = [];

  constructor() {}

  ngOnInit() {
  }

}
