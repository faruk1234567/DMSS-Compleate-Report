import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

export class TLSReportParam {
  municipalityId: number;
  signboardType: string;
  serialNo: string;
  fromDate: NgbDateStruct;
  toDate: NgbDateStruct;


  constructor(municipalityId: number, signboardType: string, serialNo: string, fromDate: NgbDateStruct, toDate: NgbDateStruct) {
    this.municipalityId = municipalityId;
    this.signboardType = signboardType;
    this.serialNo = serialNo;
    this.fromDate = fromDate;
    this.toDate = toDate;
  }
}
