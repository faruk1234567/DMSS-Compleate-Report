import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {getDateStr} from "../helpers/date.helper";
import {HTReportParam} from "../models/wb/htx-report-param";

@Injectable({providedIn: 'root'})
export class HtService {

  constructor(private http: HttpClient) {
  }

  getAllUserType(): Observable<any[]>{
     return this.http.get<any[]>(`${environment.apiUrl}api/ht-demand/user-type`);
  }

  generateHTBDemandReport(reportParm:HTReportParam){
    let body={
    "municipalityId": reportParm.municipalityId,
    "userType": reportParm.userType,
    "fromDate": getDateStr(reportParm.fromDate),
    "toDate": getDateStr(reportParm.toDate)

    };
    return this.http.post<any>(`${environment.apiUrl}api/ht-demand/htxbill-demand/generate-report`, body);
  }

  generateHTBOnlineCollectionReport(reportParm:HTReportParam){
  let body={
  "municipalityId": reportParm.municipalityId,
  "userType": reportParm.userType,
  "fromDate": getDateStr(reportParm.fromDate),
  "toDate": getDateStr(reportParm.toDate)

  };
  return this.http.post<any>(`${environment.apiUrl}api/ht-onlineCollection/htxbill-onlinecollection/generate-report`, body);
}

generateHTBOfflineCollectionReport(reportParm:HTReportParam){
  let body={
  "municipalityId": reportParm.municipalityId,
  "userType": reportParm.userType,
  "fromDate": getDateStr(reportParm.fromDate),
  "toDate": getDateStr(reportParm.toDate)

  };
  return this.http.post<any>(`${environment.apiUrl}api/ht-offlineCollection/htxbill-offlinecollection/generate-report`, body);
}

}
