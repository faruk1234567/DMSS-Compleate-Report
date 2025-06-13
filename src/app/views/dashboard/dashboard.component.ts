import { Component, OnInit } from '@angular/core';
import {Chart, ChartData, ChartOptions} from "chart.js";
import {DashboardService} from "../../services/dashboard.service";
import {DecimalPipe} from "@angular/common";

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
  providers: [DecimalPipe]
})
export class DashboardComponent implements OnInit {

  public serviceCountAndIncomeData = {};
  public waterBillServiceCountAndIncomeData = {};
  public tlsServiceCountAndIncomeData = {};
  public htServiceCountAndIncomeData = {};
  public certificateServiceCountAndIncomeData = {};
  public propertyServiceCountAndIncomeData = {};

  public municipalityServiceData: any[] = [];

  public waterMunicipalityServiceData: any[] = [];
  public htMunicipalityServiceData: any[] = [];
  public tlMunicipalityServiceData: any[] = [];
  public propertyMunicipalityServiceData: any[] = [];
  public certificateMunicipalityServiceData: any[] = [];

  dataLoaded : boolean = false;

  public pieChartData: ChartData | undefined;
  public barChartData: ChartData | undefined;

  constructor(private dashboardService: DashboardService, private decimalPipe: DecimalPipe) {

    this.dashboardService.getServiceCountAndIncome().subscribe(value => {
      this.serviceCountAndIncomeData = value;
    });

    this.dashboardService.getWaterServiceCountAndIncome().subscribe(value => {
      this.waterBillServiceCountAndIncomeData = value;
    });

    this.dashboardService.getTlServiceCountAndIncome().subscribe(value => {
      this.tlsServiceCountAndIncomeData = value;
    });

    this.dashboardService.getHtServiceCountAndIncome().subscribe(value => {
      this.htServiceCountAndIncomeData = value;
    });

    this.dashboardService.getCertificateServiceCountAndIncome().subscribe(value => {
      this.certificateServiceCountAndIncomeData = value;
    });

    this.dashboardService.getPropertyServiceCountAndIncome().subscribe(value => {
      this.propertyServiceCountAndIncomeData = value;
    });

    this.dashboardService.getServiceCountAndIncomeByMunicipality().subscribe(value => {
      this.municipalityServiceData = value;
      this.loadCharts();
      this.dataLoaded = true;
    });

    this.dashboardService.getWaterServiceCountAndIncomeByMunicipality().subscribe(value => {
      this.waterMunicipalityServiceData = value;
    });

    this.dashboardService.getHTServiceCountAndIncomeByMunicipality().subscribe(value => {
      this.htMunicipalityServiceData = value;
    });

    this.dashboardService.getTLServiceCountAndIncomeByMunicipality().subscribe(value => {
      this.tlMunicipalityServiceData = value;
    });

    this.dashboardService.getPropertyServiceCountAndIncomeByMunicipality().subscribe(value => {
      this.propertyMunicipalityServiceData = value;
    });

    this.dashboardService.getCertificateServiceCountAndIncomeByMunicipality().subscribe(value => {
      this.certificateMunicipalityServiceData = value;
    });
  }

  public pieChartOption: ChartOptions =  {
    responsive: true,
    maintainAspectRatio: true
  };

  public barChartOption: ChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    indexAxis: 'y',
  };

  ngOnInit(): void {
  }

  generateRandomColorCode(): string {
    const letters = "0123456789ABCDEF";
    let colorCode = "#";

    for (let i = 0; i < 6; i++) {
      colorCode += letters[Math.floor(Math.random() * 16)];
    }

    return colorCode;
  }

  formatNumber(number: number) {
    const formattedNumber = this.decimalPipe.transform(number, '1.0-0');
    return formattedNumber;
  }

  private loadCharts() {
    this.pieChartData = {
      labels: this.municipalityServiceData.map((obj) => obj.municipalityName),
      datasets: [
        {
          backgroundColor:  this.municipalityServiceData.map((obj) => this.generateRandomColorCode()),
          data: this.municipalityServiceData.map((obj) => obj.totalService),
        }
      ]
    }

    this.barChartData = {
      labels: this.municipalityServiceData.map((obj) => obj.municipalityName),
      datasets: [
        {
          barPercentage: 0.5,
          minBarLength: 2,
          label: 'Total Income',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgb(75, 192, 192)',
          borderWidth: 1,
          fill: false,
          data: this.municipalityServiceData.map((obj) => obj.totalIncome),
        }
      ]
    };
  }
}
