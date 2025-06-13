import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CFIssueComponent} from "./CF-Issue/CF-Issue.component";


const routes: Routes = [
  {
    path: 'CF-Issue',
    component: CFIssueComponent,
    data: {
      title: 'Total Certificate Issue'
    }
  },






];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportCFRoutingModule {

}
