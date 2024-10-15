import { Component, OnInit } from '@angular/core';
import { DividerModule } from 'primeng/divider';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeComponent implements OnInit {
  data: any;
  options: any;

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.data = {
      datasets: [
        {
          data: [300, 50],
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
      labels: ['Contribuição mensal', 'Contribuição voluntaria'],
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
