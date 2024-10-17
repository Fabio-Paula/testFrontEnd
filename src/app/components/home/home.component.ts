import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { LogarithmicScale } from 'chart.js';

interface chartsProps {
  values: String[];
  labels: String[];
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeComponent implements OnInit {
  data: any;
  options: any;

  async ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const response = await axios.get('http://localhost:3000/get-chart');
    const valuesCharts: chartsProps = response.data;

    this.data = {
      datasets: [
        {
          data: valuesCharts.values,
          backgroundColor: [
            documentStyle.getPropertyValue('--purple-700'),
            documentStyle.getPropertyValue('--pink-500'),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--purple-600'),
            documentStyle.getPropertyValue('--pink-400'),
          ],
        },
      ],
      labels: valuesCharts.labels,
    };

    this.options = {
      cutout: '70%',
      plugins: {
        legend: {
          position: 'bottom',
          align: 'center',
          maxWidth: 200,
          labels: {
            font: {
              family: 'Poppins',
              size: 13,
            },
            color: textColor,
            usePointStyle: true,
            boxWidth: 20,
            padding: 15,
          },
        },
      },
    };
  }
}
