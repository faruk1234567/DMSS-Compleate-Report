import { TlsCollectionComponent } from './tls-collection/tls-collection.component';
import { TlsDemandComponent } from './tls-demand/tls-demand.component';
import {NgModule} from "@angular/core";
import {TlsRecoverDetailComponent} from "./tls-recover/tls-recover-detail.component";
import {ReportTlsRoutingModule} from "./report-tls-routing.module";
import {ButtonModule, CardModule, DropdownModule, FormModule, GridModule, SpinnerModule} from "@coreui/angular";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {IconModule} from "@coreui/icons-angular";
import { TlsDailyReportComponent } from './tls-daily-report/tls-daily-report.component';
import { HtTlsDemandComponent } from './tls-municipality-demand/tls-municipality-demand.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { HtTlsRenewalComponent } from './tls-renewal-report/tls-renewal-report.component';

@NgModule({
  declarations: [
    TlsRecoverDetailComponent,
    TlsDemandComponent,
    TlsCollectionComponent,
    TlsDailyReportComponent,
    HtTlsDemandComponent,
    HtTlsRenewalComponent,
    
  ],
  imports: [
    CommonModule,
    GridModule,
    CardModule,
    FormModule,
    FormsModule,
    ButtonModule,
    PdfViewerModule,
    ReportTlsRoutingModule,
    SpinnerModule,
    DropdownModule,
    NgbModule,
    IconModule,
    NgxPaginationModule
  ]
})
export class ReportTlsModule {
}
