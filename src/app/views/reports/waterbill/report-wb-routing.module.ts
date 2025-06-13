import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {WbDemandComponent} from "./wb-demand/wb-demand.component";
import {WbRecoveryComponent} from "./wb-recovery/wb-recovery.component";
import {WbRecoveryOfflineComponent} from "./wb-offline-recovery/wb-recoveryoffline.component";



const routes: Routes = [
  {
    path: 'wb-demand',
    component: WbDemandComponent,
    data: {
      title: 'Water Bill Demand'
    }
  },
  {
    path: 'wb-recovery',
    component: WbRecoveryComponent,
    data: {
      title: 'Water Bill Recovery'
    }
  },
  {
    path: 'wb-offline-recovery',
    component: WbRecoveryOfflineComponent,
    data: {
      title: 'Water Bill OfflineRecovery'
    }
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportWbRoutingModule {

}
