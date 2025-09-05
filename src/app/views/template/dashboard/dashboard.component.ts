import { Component, OnInit, ViewChild } from '@angular/core';
import { map, take } from 'rxjs';
import { DashboardService } from 'src/app/core/services/dashboard/dashboard.service';
import { environment } from 'src/environments/environment';


import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexFill,
  ApexGrid,
  ApexLegend,
  ApexNonAxisChartSeries,
  ApexStroke,
  ApexResponsive
} from "ng-apexcharts";

export type ChartOptionsBar = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  grid: ApexGrid;
  colors: string[];
  legend: ApexLegend;
  dropShadow:any;
};

export type ChartOptionsRadialBar = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  stroke: ApexStroke;
};


export type ChartOptionsAngleCircle = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  colors: string[];
  legend: ApexLegend;
  plotOptions: ApexPlotOptions;
  responsive: ApexResponsive | ApexResponsive[];
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  environment                                      : any                               = environment;
  @ViewChild("chartBar") chart!                    : ChartComponent            | any;
  public chartOptions!                             : Partial<ChartOptionsBar>  | any;
  @ViewChild("chartRadialBar") chartRadialBar!     : ChartComponent            | any;
  public chartOptionsRadialBar!                    : Partial<ChartOptionsBar>  | any;
  @ViewChild("chartAngleCircle") chartAngleCircle!     : ChartComponent            | any;
  public chartOptionsAngleCircle!                    : Partial<ChartOptionsAngleCircle>  | any;

  topProducts                                      : any[]                             = [];
  orders48                                         : any[]                             = [];
  totalOrders                                      : number                            = 0;
  lastWeekOrdersCount                              : number                            = 0;
  totalCustomers                                   : number                            = 0;
  count_products                                   : number                            = 0;


  constructor(
    // private router: Router,
    // private route: ActivatedRoute,
    private DashboardService                       : DashboardService
  ){

  }


  ngOnInit(): void {
      this.getData();

  }

  getData(){
    this.DashboardService.getStatistics()
    .pipe(take(1), map((res:any) => res?.data))
    .subscribe(data => {
      this.topProducts          = data?.topProducts;
      this.orders48             = data?.orders48;
      this.totalOrders          = data?.totalOrders;
      this.lastWeekOrdersCount  = data?.lastWeekOrdersCount;
      this.totalCustomers       = data?.totalCustomers;
      this.count_products       = data?.count_products;
      console.log({data});
      this.OrderBy48();
      this.payedGraph();
      this.angleCircleGraph();

    })
  }


  calcSome(pr:any){
    return parseInt(pr?.total_sold) * pr?.price;
  }


  OrderBy48(){
        // bar
        // this.chartOptions = {
        //   series: [

        //     {
        //       name: "Total",
        //       data: [...this.orders48.map((or:any) => or?.total_orders)]
        //     }
        //   ],
        //   chart: {
        //     height: 250,
        //     type: "bar",
        //     toolbar: {
        //       show: false,
        //       tools: {
        //         download: false,
        //       }
        //     },
        //     events: {
        //       click: function(chart:any, w:any, e:any) {
        //         // console.log(chart, w, e)
        //       }
        //     }
        //   },
        //   colors: ['#42A5F5'],
        //   plotOptions: {
        //     bar: {
        //       columnWidth: "6px",
        //       distributed: false,
        //       borderRadius: 2
        //     }
        //   },
        //   dataLabels: {
        //     enabled: false

        //   },
        //   legend: {
        //     show: false
        //   },
        //   grid: {
        //     show: true
        //   },
        //   yaxis: {
        //     axisTicks: {
        //       show: false
        //     },
        //       labels: {
        //         show: true,
        //         // offsetY: -10,
        //         align: 'right',
        //         minWidth: 0,
        //         maxWidth: 100,
        //         style: {
        //             colors: [],
        //             fontSize: '12px',
        //             fontFamily: 'Helvetica, Arial, sans-serif',
        //             fontWeight: 500,
        //             cssClass: 'apexcharts-yaxis-label',
        //         },
        //         // offsetX: -20,
        //         // offsetY: 0,
        //         rotate: 0,
        //         formatter: (value:any) => {
        //           if(value > 1000 && value !== Infinity){
        //             // console.log('value',value);

        //             return (value / 1000).toFixed(2) + 'K'
        //           } return !isNaN(value) && value > 0 && value  !== Infinity ? value : '';
        //          },
        //     } ,
        //   },
        //   xaxis: {
        //     categories: [...this.orders48.map((or:any) => or?.hour )],
        //     labels: {
        //       // rotate: -45,
        //       // offsetY: -10,
        //       maxHeight: 80,
        //       show:false
        //     },
        //     lines: {
        //       show: false
        //       }
        //     // tickPlacement: "on"
        //   },
        //   // fill: {
        //   //   // type: "gradient",
        //   //   gradient: {
        //   //     shade: "light",
        //   //     type: "horizontal",
        //   //     shadeIntensity: 0.25,
        //   //     gradientToColors: undefined,
        //   //     // inverseColors: true,
        //   //     // opacityFrom: 1,
        //   //     // opacityTo: 1,
        //   //     // stops: [50, 0, 100, 100]
        //   //   }
        //   // },
        //   // dropShadow: {
        //   //   enabled: true,
        //   //   top: 5,       // Shadow distance from the top
        //   //   left: 0,      // Keep it centered
        //   //   blur: 10,     // Blur effect for soft edges
        //   //   opacity: 1,   // 100% opacity for a strong shadow
        //   //   color: "#000", // Shadow color (black)
        //   // },


        // };
        this.chartOptions = {
          series: [
            {
              name: "Inflation",
              data: [...this.orders48.map((or:any) => or?.total_orders)]
            }
          ],
          chart: {
            height: 250,
            type: "bar"
          },
          colors: ['#42A5F5'],
          plotOptions: {
            bar: {
              dataLabels: {
                position: "top" ,
                columnWidth: "6px",
        //       distributed: false,
                borderRadius: 3// top, center, bottom
              }
            }
          },
          dataLabels: {
            enabled: false,
            formatter: function(val:any) {
              return val ;
            },
            offsetY: -20,
            style: {
              fontSize: "12px",
              colors: ["#304758"]
            }
          },

          xaxis: {
            categories: [...this.orders48.map((or:any) => or?.hour )],
            position: "top",
            labels: {
              offsetY: -18,
              show:false
            },
            axisBorder: {
              show: false
            },
            axisTicks: {
              show: false
            },
            crosshairs: {
              fill: {
                type: "gradient",
                gradient: {
                  type:"vertical",
                  // direction:TestBed,
                  colorFrom: "#D8E3F0",
                  colorTo: "#BED1E6",
                  stops: [0, 100],
                  // opacityFrom: 0.4,
                  // opacityTo: 0.5
                }
              }
            },
            tooltip: {
              enabled: false,
              offsetY: -35
            }
          },
          fill: {
            type: "gradient",
            gradient: {

              shade: "light",
              type: "vertical",
              shadeIntensity: 0.25,
              gradientToColors: undefined,
              inverseColors: true,
              opacityFrom: 1,
              opacityTo: 1,
              stops: [50, 0, 100, 100]
            }
          },
          yaxis: {
            axisBorder: {
              show: false
            },
            axisTicks: {
              show: false
            },
            labels: {
              show: false,
              formatter: function(val:any) {
                return val ;
              }
            }
          },
          title: {
            text: "Monthly Inflation in Argentina, 2002",
            floating: 0,
            offsetY: 320,
            align: "center",
            style: {
              color: "#444"
            }
          }
        };
  }


  payedGraph(){
    this.chartOptionsRadialBar = {
      series: [67],
      chart: {
        height: 280,
        type: "radialBar",
        offsetY: -10
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 135,
          dataLabels: {
            name: {
              fontSize: "16px",
              color: undefined,
              offsetY: 120
            },
            value: {
              offsetY: 76,
              fontSize: "22px",
              color: undefined,
              formatter: function(val:any) {
                return val + "%";
              }
            }
          }
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          shadeIntensity: 0.15,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 65, 91]
        }
      },
      stroke: {
        dashArray: 4
      },
      labels: ["Median Ratio"]
    };
  }

  angleCircleGraph(){
    this.chartOptionsAngleCircle = {
      series: [76, 67, 61, 90],
      chart: {
        height: 240,
        type: "radialBar"
      },
      plotOptions: {
        radialBar: {
          offsetY: 0,
          startAngle: 0,
          endAngle: 260,
          hollow: {
            margin: 5,
            size: "30%",
            background: "transparent",
            image: undefined
          },
          dataLabels: {
            name: {
              show: false
            },
            value: {
              show: false
            }
          }
        }
      },
      colors: ["#1ab7ea", "#0084ff", "#39539E", "#0077B5"],
      labels: ["Vimeo", "Messenger", "Facebook", "LinkedIn"],
      legend: {
        show: true,
        floating: true,
        fontSize: "12px",
        position: "left",
        offsetX: 40,
        offsetY: 10,
        labels: {
          useSeriesColors: true
        },
        formatter: function(seriesName:any, opts:any) {
          return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex];
        },
        itemMargin: {
          horizontal: 3
        }
      },
      responsive: [
        // {
        //   breakpoint: 480,
        //   options: {
        //     legend: {
        //       show: false
        //     }
        //   }
        // }
      ]
    };
  }

}
