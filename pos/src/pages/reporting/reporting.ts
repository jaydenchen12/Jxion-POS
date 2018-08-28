import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UtilProvider } from "../../providers/util/util";
import { Chart } from 'chart.js';
@Component({
  selector: 'page-reporting',
  templateUrl: 'reporting.html',
})

export class ReportingPage {

  @ViewChild('barCanvas') barCanvas;
  @ViewChild('doughnutCanvas') doughnutCanvas;
  @ViewChild('lineCanvas') lineCanvas;
    @ViewChild('line2Canvas') line2Canvas;

  barChart: any;
  doughnutChart: any;
  lineChart: any;
  lineChart2: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public util: UtilProvider) {
    util.getReq("OrderHistoryToday")
      .then((json) => {
        let data = [];
        let today = json[1];
        let sumToday = 0;
        for (let orders of today) {
          sumToday += orders.orderPrice
        }
        let yesterday = json[0];
        let sumYesterday = 0;
        for (let orders of yesterday) {
          sumYesterday += orders.orderPrice
        }
        data.push(3981);
        data.push(3141);
        data.push(2431);
        data.push(3121);
        data.push(3275);
        data.push(sumToday);
        data.push(sumYesterday);
        this.barChart = new Chart(this.barCanvas.nativeElement, {

          type: 'bar',
          data: {
            labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Today"],
            datasets: [{
              data: data,
              labels: null,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)'

              ],
              borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255,99,132,1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            legend: {
              display: false
            },
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }

        });

        this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {

          type: 'doughnut',
          data: {
            labels: ["Pick Up", "Walk In"],
            datasets: [{
              label: '# of Votes',
              data: [122, 191],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              hoverBackgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#FF6384",
                "#36A2EB",
                "#FFCE56"
              ]
            }]
          }

        });

        this.lineChart = new Chart(this.lineCanvas.nativeElement, {

          type: 'bar',
          data: {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
              {
                label: "Earnings By Month",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [80412, 100211, 93221, 106862, 118695, 97127, 109988],
                spanGaps: false,
              }
            ]
          },
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }

        });
        this.lineChart2 = new Chart(this.line2Canvas.nativeElement, {

            type: 'line',
            data: {
                labels: ["11am", " 12pm", "1pm", "2pm", "3pm", "4pm", "5pm","6pm","7pm","8pm","9pm","10pm","11pm","12pm"],
                datasets: [
                    {
                        label: "Number of Orders",
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(75,192,192,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: [10, 13, 18, 25, 15, 35, 40, 35, 30, 38, 25, 14, 8],
                        spanGaps: false,
                    }
                ]
            }

        });

    });
  }

  ionViewDidLoad() {



  }
}
