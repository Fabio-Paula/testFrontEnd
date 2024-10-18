import { AfterViewInit, Component, OnInit } from '@angular/core';
import axios from 'axios';
import 'chartjs-plugin-datalabels';
import { Chart, ChartData, ChartOptions } from 'chart.js';

interface chartsProps {
  values: string[];
  labels: string[];
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  data : ChartData<'doughnut'> = { datasets: [], labels: []};
  options = {};

  constructor() {}

  async ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const response = await axios.get('http://localhost:3000/get-chart');
    const valuesCharts: chartsProps = response.data;

    const purple700 = documentStyle.getPropertyValue('--purple-700') || '#800080'; 
    const pink500 = documentStyle.getPropertyValue('--pink-500') || '#ff69b4'; 
    const purple600 = documentStyle.getPropertyValue('--purple-600') || '#800080'; 
    const pink400 = documentStyle.getPropertyValue('--pink-400') || '#ff69b4'; 
    const values = valuesCharts.values.map(value => parseFloat(value))
    this.data = {
      datasets: [
        {
          data: values,
          backgroundColor: [
            purple700,
            pink500,
          ],
          hoverBackgroundColor: [
            purple600,
            pink400,
          ],
        },
      ],
      labels: valuesCharts.labels,
    };

    this.options = {
      cutout: '70%',
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          align: 'center',
          labels: {
            font: {
              family: 'Poppins',
              size: 13,
            },
            color: textColor,
            usePointStyle: true,
            boxWidth: 20,
            padding: 15,
            generateLabels: (chart : Chart) => {
              const datasets = chart.data.datasets;
              const labels = chart.data.labels as string[] || [];
              return labels.map((label: string, i: number) => {
                const value = datasets[0].data[i];
                return {
                  text: `${label}: R$${value}`,
                  value: `RS${value}`,
                  fillStyle: Array.isArray(datasets[0].backgroundColor) ? datasets[0].backgroundColor[i] as string : '#000',
                  strokeStyle: Array.isArray(datasets[0].hoverBackgroundColor) ? datasets[0].hoverBackgroundColor[i] as string : '#000',
                  hidden: isNaN(datasets[0].data[i] as number),
                  index: i
                };
              });
            }
          },
        },
        datalabels: {
          display: false,
        },
      },
    }
  }

  ngAfterViewInit() {
    const canvas = document.getElementById('myChart') as HTMLCanvasElement; 
    const ctx = canvas?.getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'doughnut',
        data: this.data,
        options: this.options,
      });
    }
  }
}
