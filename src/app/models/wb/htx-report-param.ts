import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
export class HTReportParam {
  municipalityId: number;
  userType: string;
  fromDate: NgbDateStruct;
  toDate: NgbDateStruct;


  constructor(municipalityId: number, userType: string,  fromDate: NgbDateStruct, toDate: NgbDateStruct) {
    this.municipalityId = municipalityId;
    this.userType = userType;
    this.fromDate = fromDate;
    this.toDate = toDate;
  }
}
