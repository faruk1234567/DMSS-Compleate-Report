import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
export class PBReportParam{

  municipalityId: number;
  fromDate: NgbDateStruct;
  toDate: NgbDateStruct;

  constructor(municipalityId: number,  fromDate: NgbDateStruct, toDate: NgbDateStruct) {
    this.municipalityId = municipalityId;
    this.fromDate = fromDate;
    this.toDate = toDate;
  }

}
