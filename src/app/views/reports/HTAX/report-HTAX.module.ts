import {NgModule} from "@angular/core";
import {HtDemandComponent} from "./ht-demand/ht-demand.component";

import {ReportHtRoutingModule} from "./report-HTAX-routing.module";
import {ButtonModule, CardModule, DropdownModule, FormModule, GridModule, SpinnerModule} from "@coreui/angular";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {IconModule} from "@coreui/icons-angular";
import { HtOnlineCollectionComponent } from './ht-online-collection/ht-online-collection.component';
import { HtOfflineCollectionComponent } from './ht-offline-collection/ht-offline-collection.component';
import { HtDailyReportComponent } from "../../../reports/ht-daily-report/ht-daily-report.component";
import { HtWardDailyReportComponent } from "../../../reports/ht-word-wise-report/ht-word-wise-report.component";

@NgModule({
  declarations: [
    HtDemandComponent,
    HtOnlineCollectionComponent,
    HtOfflineCollectionComponent,
    HtDailyReportComponent,
    HtWardDailyReportComponent


  ],
  imports: [
    CommonModule,
    GridModule,
    CardModule,
    FormModule,
    FormsModule,
    ButtonModule,
    PdfViewerModule,
    ReportHtRoutingModule,
    SpinnerModule,
    DropdownModule,
    NgbModule,
    IconModule
  ]
})
export class ReportHtModule {
}
