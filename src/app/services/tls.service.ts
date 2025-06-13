import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {TLSReportParam} from "../models/wb/tls-report-param";
import {getDateStr} from "../helpers/date.helper";

@Injectable({providedIn: 'root'})
export class TLSService {

  constructor(private http: HttpClient) {
  }

  getAllSignboardType() : Observable<any[]>{
    return this.http.get<any[]>(`${environment.apiUrl}api/tls/signboard-type/all`);
  }

  generateTLSRecoveryDetailReport(reportParam: TLSReportParam) {
    let body = {
      "municipalityId" : reportParam.municipalityId,
      "signboardType" : reportParam.signboardType,
      "serialNo" : reportParam.serialNo,
      "fromDate" : getDateStr(reportParam.fromDate),
      "toDate" : getDateStr(reportParam.toDate)
    };

    return this.http.post<any>(`${environment.apiUrl}api/tls/tls-recovery-detail/generate-report`, body);
  }
}
