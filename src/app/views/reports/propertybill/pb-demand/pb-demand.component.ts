import { Component, OnInit } from '@angular/core';
import {MunicipalityService} from "../../../../services/municipality.service";
import {UserService} from "../../../../services/user.service";
import {User} from "../../../../models/user";
import {PbService} from "../../../../services/pb.service";
import {PBReportParam} from "../../../../models/wb/pb-report-param";
import {NgbCalendar} from "@ng-bootstrap/ng-bootstrap";
import {FileService} from "../../../../services/file.service";

@Component({
  selector: 'app-pb-demand',
  templateUrl: './pb-demand.component.html',
  styleUrls: ['./pb-demand.component.scss']
})
export class PBillDemandComponent implements OnInit {

  src: any = '';

  loading = false;
  reportGenerated = false;

  municipalityList: any[] = [];


  user: User = null!;

  reportParam: PBReportParam = null!;

  date: any;
  fileId: any;

  constructor(private calendar: NgbCalendar, private municipalityService: MunicipalityService, private userService: UserService, private pbService: PbService, private fileService: FileService) {
  }

  generateReport() {
    this.loading = true;

    this.pbService.generatePropertyDemandReport(this.reportParam).subscribe(data => {
      this.fileId = data;
      this.src = this.fileService.getPDFFileUrl(this.user.id, this.fileId);
      this.loading = false;
      this.reportGenerated = true;
    });
  }

  downloadPDFReport() {
    window.open(this.fileService.getPDFFileUrl(this.user.id, this.fileId), '_blank');
  }

  ngOnInit(): void {
    this.user = this.userService.getUser();

    let fromDate = this.calendar.getToday();
    let today = this.calendar.getToday();
    this.date = {year: this.calendar.getToday().year, month: this.calendar.getToday().month}
    this.reportParam = new PBReportParam(0,  fromDate, today);

    this.getMunicipality();

  }

  private getMunicipality() {
    if (this.user.municipalityId == null || this.user.municipalityId == 0) {
      this.municipalityService.getAllMunicipality().subscribe(data => {
        this.municipalityList = data;
      });
    }
  }





}
