import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {PBillDemandComponent} from "./pb-demand/pb-demand.component";
import{PBillRecoveryComponent}from "./pb-recovery/pb-recovery.component";
import{PbillRecoveryOfflineComponent} from "./pb-offline-recovery/pb-offline-recovery.component";

const routes: Routes = [
  {
    path: 'pb-demand',
    component: PBillDemandComponent,
    data: {
      title: 'Property Bill Demand'
    }
  },
  {
    path: 'pb-recovery',
    component: PBillRecoveryComponent,
    data: {
      title: 'Property Bill Recovery'
    }
  },
  {
    path: 'pb-offline-recovery',
    component:  PbillRecoveryOfflineComponent,
    data: {
      title: 'Property Offline Recovery'
    }
  },




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportPbRoutingModule {

}
