import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

export class WBReportParam {
  municipalityId: number;
  connectionType: string;
  pipeDiameter: number;
  fromDate: NgbDateStruct;
  toDate: NgbDateStruct;


  constructor(municipalityId: number, connectionType: string, pipeDiameter: number, fromDate: NgbDateStruct, toDate: NgbDateStruct) {
    this.municipalityId = municipalityId;
    this.connectionType = connectionType;
    this.pipeDiameter = pipeDiameter;
    this.fromDate = fromDate;
    this.toDate = toDate;
  }
}
