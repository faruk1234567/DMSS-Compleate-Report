import {NgModule} from "@angular/core";
import {PBillDemandComponent} from "./pb-demand/pb-demand.component";
import{PBillRecoveryComponent} from "./pb-recovery/pb-recovery.component";
import{PbillRecoveryOfflineComponent} from "./pb-offline-recovery/pb-offline-recovery.component";

import {ReportPbRoutingModule} from "./report-propertybill-routing.module";
import {ButtonModule, CardModule, DropdownModule, FormModule, GridModule, SpinnerModule} from "@coreui/angular";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {IconModule} from "@coreui/icons-angular";
@NgModule({
  declarations: [
    PBillDemandComponent,
    PBillRecoveryComponent,
    PbillRecoveryOfflineComponent



  ],
  imports: [
    CommonModule,
    GridModule,
    CardModule,
    FormModule,
    FormsModule,
    ButtonModule,
    PdfViewerModule,
    ReportPbRoutingModule,
    SpinnerModule,
    DropdownModule,
    NgbModule,
    IconModule
  ]
})
export class ReportPBModule {
}
