import {Component, OnInit} from '@angular/core';
import {MunicipalityService} from "../../../../services/municipality.service";
import {UserService} from "../../../../services/user.service";
import {User} from "../../../../models/user";
import {HtService} from "../../../../services/ht.service";
import {HTReportParam} from "../../../../models/wb/htx-report-param";
import {NgbCalendar} from "@ng-bootstrap/ng-bootstrap";
import {FileService} from "../../../../services/file.service";
import {AuthenticationService} from "../../../../services/authentication.service";

@Component({
  selector: 'app-ht-demand',
  templateUrl: './ht-demand.component.html',
  styleUrls: ['./ht-demand.component.scss']
})
export class HtDemandComponent implements OnInit {

  src: any = '';

  loading = false;
  reportGenerated = false;

  municipalityList: any[] = [];
  connectionTypeList: any[] = [];


  user: User = null!;

  reportParam: HTReportParam = null!;

  date: any;
  fileId: any;

  constructor(private calendar: NgbCalendar, private municipalityService: MunicipalityService, private userService: UserService, private htService: HtService, private fileService: FileService) {
  }

  generateReport() {
    this.loading = true;

    this.htService.generateHTBDemandReport(this.reportParam).subscribe(data => {
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
    this.reportParam = new HTReportParam(0, '0',  fromDate, today);

    this.getMunicipality();
    this.getUserType();

  }

  private getMunicipality() {
    if (this.user.municipalityId == null || this.user.municipalityId == 0) {
      this.municipalityService.getAllMunicipality().subscribe(data => {
        this.municipalityList = data;
      });
    }
  }

  private getUserType() {
    this.htService.getAllUserType().subscribe(data => {
      this.connectionTypeList = data;
    });
  }


}
