import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {TLSCollectionReportParam} from "../models/wb/tls-collection-report-param";
import {getDateStr} from "../helpers/date.helper";

@Injectable({providedIn: 'root'})
export class TLSCollectionService {

  constructor(private http: HttpClient) {
  }

  getAllSignboardType() : Observable<any[]>{
    return this.http.get<any[]>(`${environment.apiUrl}api/tls-collection/signboard-type/all`);
  }

  generateTLSCollectionReport(reportParam: TLSCollectionReportParam) {
    let body = {
      "municipalityId" : reportParam.municipalityId,
      "signboardType" : reportParam.signboardType,
     "fromDate" : getDateStr(reportParam.fromDate),
      "toDate" : getDateStr(reportParam.toDate)
    };

    return this.http.post<any>(`${environment.apiUrl}api/tls-collection/tls-collection/generate-report`, body);
  }
  generateTLSDemandReport(reportParam: TLSCollectionReportParam) {
    let body = {
      "municipalityId" : reportParam.municipalityId,
      "signboardType" : reportParam.signboardType,
     "fromDate" : getDateStr(reportParam.fromDate),
      "toDate" : getDateStr(reportParam.toDate)
    };

    return this.http.post<any>(`${environment.apiUrl}api/tls-demand/tls-demand/generate-report`, body);
  }
}
