import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";


@Injectable({providedIn: 'root'})
export class DashboardService {

  constructor(private http: HttpClient) {
  }

  getServiceCountAndIncome() : Observable<any[]>{
    return this.http.get<any[]>(`${environment.apiUrl}api/dashboard/service/data`);
  }

  getWaterServiceCountAndIncome() : Observable<any[]>{
    return this.http.get<any[]>(`${environment.apiUrl}api/dashboard/water-bill/data`);
  }

  getTlServiceCountAndIncome() : Observable<any[]>{
    return this.http.get<any[]>(`${environment.apiUrl}api/dashboard/tls/data`);
  }

  getHtServiceCountAndIncome() : Observable<any[]>{
    return this.http.get<any[]>(`${environment.apiUrl}api/dashboard/ht/data`);
  }

  getCertificateServiceCountAndIncome() : Observable<any[]>{
    return this.http.get<any[]>(`${environment.apiUrl}api/dashboard/certificate/data`);
  }

  getPropertyServiceCountAndIncome() : Observable<any[]>{
    return this.http.get<any[]>(`${environment.apiUrl}api/dashboard/property/data`);
  }

  getServiceCountAndIncomeByMunicipality() : Observable<any[]>{
    return this.http.get<any[]>(`${environment.apiUrl}api/dashboard/municipality/service/data`);
  }

  getWaterServiceCountAndIncomeByMunicipality() : Observable<any[]>{
    return this.http.get<any[]>(`${environment.apiUrl}api/dashboard/municipality/water/service/data`);
  }

  getHTServiceCountAndIncomeByMunicipality() : Observable<any[]>{
    return this.http.get<any[]>(`${environment.apiUrl}api/dashboard/municipality/ht/service/data`);
  }

  getTLServiceCountAndIncomeByMunicipality() : Observable<any[]>{
    return this.http.get<any[]>(`${environment.apiUrl}api/dashboard/municipality/tls/service/data`);
  }

  getPropertyServiceCountAndIncomeByMunicipality() : Observable<any[]>{
    return this.http.get<any[]>(`${environment.apiUrl}api/dashboard/municipality/property/service/data`);
  }

  getCertificateServiceCountAndIncomeByMunicipality() : Observable<any[]>{
    return this.http.get<any[]>(`${environment.apiUrl}api/dashboard/municipality/certificate/service/data`);
  }

}
