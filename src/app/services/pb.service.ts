import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {getDateStr} from "../helpers/date.helper";
import {environment} from "../../environments/environment";
import {PBReportParam} from "../models/wb/pb-report-param";


@Injectable({providedIn: 'root'})
export class PbService{

  constructor(private http: HttpClient){

  }

  generatePropertyDemandReport(reportParam: PBReportParam) {
    let body = {
      "municipalityId" : reportParam.municipalityId,
      "fromDate" : getDateStr(reportParam.fromDate),
      "toDate" : getDateStr(reportParam.toDate)
    };

    return this.http.post<any>(`${environment.apiUrl}api/PB-Demand/PropertyBill-demand/generate-report`, body);
  }
  generatePropertyOnlineCollectionReport(reportParam: PBReportParam) {
    let body = {
      "municipalityId" : reportParam.municipalityId,
      "fromDate" : getDateStr(reportParam.fromDate),
      "toDate" : getDateStr(reportParam.toDate)
    };

    return this.http.post<any>(`${environment.apiUrl}api/PB-OnlineCollection/PropertyBill-Onlinecollection/generate-report`, body);
  }
  generatePropertyOfflineCollectionReport(reportParam: PBReportParam) {
    let body = {
      "municipalityId" : reportParam.municipalityId,
      "fromDate" : getDateStr(reportParam.fromDate),
      "toDate" : getDateStr(reportParam.toDate)
    };

    return this.http.post<any>(`${environment.apiUrl}api/PB-OfflineCollection/PropertyBill-Offlinecollection/generate-report`, body);
  }
  generateCertificateIssueReport(reportParam: PBReportParam) {
    let body = {
      "municipalityId" : reportParam.municipalityId,
      "fromDate" : getDateStr(reportParam.fromDate),
      "toDate" : getDateStr(reportParam.toDate)
    };

    return this.http.post<any>(`${environment.apiUrl}api/CF-ISSUE/CF-Issue/generate-report`, body);
  }


}
