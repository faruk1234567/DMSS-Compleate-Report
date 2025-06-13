import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

export function getDateStr(date: NgbDateStruct) {
  return '' + date.year + '/' + date.month + '/' + date.day;
}
