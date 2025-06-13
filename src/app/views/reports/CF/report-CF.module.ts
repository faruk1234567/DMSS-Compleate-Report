import {NgModule} from "@angular/core";
import {CFIssueComponent} from "./CF-Issue/CF-Issue.component";


import {ReportCFRoutingModule} from "./report-CF-routing.module";
import {ButtonModule, CardModule, DropdownModule, FormModule, GridModule, SpinnerModule} from "@coreui/angular";
import {PdfViewerModule} from "ng2-pdf-viewer";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {IconModule} from "@coreui/icons-angular";
@NgModule({
  declarations: [

    CFIssueComponent



  ],
  imports: [
    CommonModule,
    GridModule,
    CardModule,
    FormModule,
    FormsModule,
    ButtonModule,
    PdfViewerModule,
    ReportCFRoutingModule,
    SpinnerModule,
    DropdownModule,
    NgbModule,
    IconModule
  ]
})
export class ReportCFModule {
}
