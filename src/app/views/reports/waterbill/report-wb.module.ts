import {NgModule} from "@angular/core";
import {WbDemandComponent} from "./wb-demand/wb-demand.component";
import {WbRecoveryComponent} from "./wb-recovery/wb-recovery.component";
import {WbRecoveryOfflineComponent} from "./wb-offline-recovery/wb-recoveryoffline.component";
import {ReportWbRoutingModule} from "./report-wb-routing.module";
import {ButtonModule, CardModule, DropdownModule, FormModule, GridModule, SpinnerModule} from "@coreui/angular";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {IconModule} from "@coreui/icons-angular";

@NgModule({
  declarations: [
    WbDemandComponent,
    WbRecoveryComponent,
    WbRecoveryOfflineComponent

  ],
  imports: [
    CommonModule,
    GridModule,
    CardModule,
    FormModule,
    FormsModule,
    ButtonModule,
    PdfViewerModule,
    ReportWbRoutingModule,
    SpinnerModule,
    DropdownModule,
    NgbModule,
    IconModule
  ]
})
export class ReportWbModule {
}
