import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

export class TLSCollectionReportParam {
  municipalityId: number;
  signboardType: string;
  fromDate: NgbDateStruct;
  toDate: NgbDateStruct;


  constructor(municipalityId: number, signboardType: string,  fromDate: NgbDateStruct, toDate: NgbDateStruct) {
    this.municipalityId = municipalityId;
    this.signboardType = signboardType;
   this.fromDate = fromDate;
    this.toDate = toDate;
  }
}
