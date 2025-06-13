import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({providedIn: 'root'})
export class FileService {

  constructor(private http: HttpClient) {
  }

  getPDFFileUrl(userId: any, fileId: any) {
    return `${environment.apiUrl}api/file/pdf/${userId}/${fileId}`;
  }

  getXLSXFileUrl(userId: any, fileId: any) {
    return `${environment.apiUrl}api/file/xlsx/${userId}/${fileId}`;
  }
}
