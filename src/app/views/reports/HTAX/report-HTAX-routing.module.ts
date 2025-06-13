import { HtOfflineCollectionComponent } from './ht-offline-collection/ht-offline-collection.component';
import { HtOnlineCollectionComponent } from './ht-online-collection/ht-online-collection.component';
import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HtDemandComponent} from './ht-demand/ht-demand.component';
import { HtWardDailyReportComponent } from '../../../reports/ht-word-wise-report/ht-word-wise-report.component';
import { HtDailyReportComponent } from '../../../reports/ht-daily-report/ht-daily-report.component';












const routes: Routes = [
  {
    path: 'ht-demand',
    component: HtDemandComponent,
    data: {
      title: 'Holding Tax Demand'
    }
  },
  {
    path: 'ht-online-collection',
    component: HtOnlineCollectionComponent,
    data: {
      title: 'Holding Tax Online Collection'
    }
  },
  {
    path: 'ht-offline-collection',
    component: HtOfflineCollectionComponent,
    data: {
      title: 'Holding Tax Offline Collection'
    }
  },
   {
    path: 'ht-daily-report',
    component: HtDailyReportComponent,
    data: {
      title: 'Daily Holding Tax Report'
    }
  },
  {
    path: 'ht-word-wise-report',
    component: HtWardDailyReportComponent,
    data: {
      title: 'Word wise Holding Tax Collection Report'
    }
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportHtRoutingModule {

}
