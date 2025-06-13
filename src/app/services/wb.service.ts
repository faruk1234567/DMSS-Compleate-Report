import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {WBReportParam} from "../models/wb/wb-report-param";
import {getDateStr} from "../helpers/date.helper";
import {HTReportParam} from "../models/wb/htx-report-param";

@Injectable({providedIn: 'root'})
export class WbService {

  constructor(private http: HttpClient) {
  }

  getAllConnectionType() : Observable<any[]>{
    return this.http.get<any[]>(`${environment.apiUrl}api/wb-demand/connection-type`);
  }

  getPipeDiameter() {
    return this.http.get<any[]>(`${environment.apiUrl}api/wb-demand/pipe-diameters`);
  }
  getAllUserType(): Observable<any[]>{
     return this.http.get<any[]>(`${environment.apiUrl}api/ht-demand/user-type`);
  }

  generateWBDemandReport(reportParam: WBReportParam) {
    let body = {
      "municipalityId" : reportParam.municipalityId,
      "connectionType" : reportParam.connectionType,
      "pipeDiameter" : reportParam.pipeDiameter,
      "fromDate" : getDateStr(reportParam.fromDate),
      "toDate" : getDateStr(reportParam.toDate)
    };

    return this.http.post<any>(`${environment.apiUrl}api/wb-demand/generate-report`, body);
  }

  generateWBCollectionReport(reportParam: WBReportParam){
    let body = {
      "municipalityId" : reportParam.municipalityId,
      "connectionType" : reportParam.connectionType,
      "pipeDiameter" : reportParam.pipeDiameter,
      "fromDate" : getDateStr(reportParam.fromDate),
      "toDate" : getDateStr(reportParam.toDate)
    };
    return this.http.post<any>(`${environment.apiUrl}api/wb-collection/waterbill-collection/generate-report`, body);


  }
  generateWBOfflineCollectionReport(reportParam: WBReportParam){
    let body = {
      "municipalityId" : reportParam.municipalityId,
      "connectionType" : reportParam.connectionType,
      "pipeDiameter" : reportParam.pipeDiameter,
      "fromDate" : getDateStr(reportParam.fromDate),
      "toDate" : getDateStr(reportParam.toDate)
    };
      return this.http.post<any>(`${environment.apiUrl}api/wb-OfflineCollection/waterBill-OfflineCollection/generate-report`, body);
}


}
