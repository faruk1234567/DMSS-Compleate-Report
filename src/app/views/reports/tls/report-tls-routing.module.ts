import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TlsCollectionComponent } from './tls-collection/tls-collection.component';
import { TlsRecoverDetailComponent } from "./tls-recover/tls-recover-detail.component";
import { TlsDailyReportComponent } from './tls-daily-report/tls-daily-report.component';
import { HtTlsDemandComponent } from './tls-municipality-demand/tls-municipality-demand.component';
import { HtTlsRenewalComponent } from "./tls-renewal-report/tls-renewal-report.component";

const routes: Routes = [
  {
    
    path: 'tls-municipality-demand',
    component: HtTlsDemandComponent,
    data: {
      title: 'TradeLicense Demand In Detail'
    }
  },
  {
    path: 'tls-recover-detail',
    component: TlsRecoverDetailComponent,
    data: {
      title: 'Trade License Recover In details'
    }
  },
  {
    // এটি আপনার "TLS Collection" লিঙ্ক থেকে লোড হবে।
    path: 'tls-collection',
    component: TlsCollectionComponent,
    data: {
      title: 'Trade License Collection'
    }
  },
 /*  {
    // যদি আপনার মেনুতে 'TLS Demand' নামে একটি আলাদা লিংক থাকে এবং আপনি সেখানে HtTlsDemandComponent লোড করতে চান,
    // তাহলে এই পাথটি ব্যবহার করুন। অন্যথায়, আপনি এটি কমেন্ট আউট রাখতে পারেন বা মুছে দিতে পারেন।
    path: 'tls-demand',
    component: HtTlsDemandComponent, // <--- এখানে HtTlsDemandComponent ব্যবহার করা হয়েছে
    data: {
      title: 'Trade License Demand'
    }
  }, */
  {
    path: 'tls-daily-report',
    component: TlsDailyReportComponent,
    data: {
      title: 'Daily Transaction In Details'
    }
  },
   {
    path: 'tls-renewal-report',
    component: HtTlsRenewalComponent,
    data: {
      title: 'Renewal List In Details'
    }
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportTlsRoutingModule { }