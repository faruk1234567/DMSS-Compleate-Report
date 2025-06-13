import {Component, OnInit} from '@angular/core';
import {MunicipalityService} from "../../../../services/municipality.service";
import {UserService} from "../../../../services/user.service";
import {User} from "../../../../models/user";
import {WbService} from "../../../../services/wb.service";
import {WBReportParam} from "../../../../models/wb/wb-report-param";
import {NgbCalendar} from "@ng-bootstrap/ng-bootstrap";
import {FileService} from "../../../../services/file.service";
import {AuthenticationService} from "../../../../services/authentication.service";

@Component({
  selector: 'app-wb-demand',
  templateUrl: './wb-demand.component.html',
  styleUrls: ['./wb-demand.component.scss']
})
export class WbDemandComponent implements OnInit {

  src: any = '';

  loading = false;
  reportGenerated = false;

  municipalityList: any[] = [];
  connectionTypeList: any[] = [];
  pipeDiameterList: any[] = [];

  user: User = null!;

  reportParam: WBReportParam = null!;

  date: any;
  fileId: any;

  constructor(private calendar: NgbCalendar, private municipalityService: MunicipalityService, private userService: UserService, private wbService: WbService, private fileService: FileService) {
  }

  generateReport() {
    this.loading = true;

    this.wbService.generateWBDemandReport(this.reportParam).subscribe(data => {
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
    this.reportParam = new WBReportParam(0, '0', 0, fromDate, today);

    this.getMunicipality();
    this.getConnectionType();
    this.getPipeDiameter();
  }

  private getMunicipality() {
    if (this.user.municipalityId == null || this.user.municipalityId == 0) {
      this.municipalityService.getAllMunicipality().subscribe(data => {
        this.municipalityList = data;
      });
    }
  }

  private getConnectionType() {
    this.wbService.getAllConnectionType().subscribe(data => {
      this.connectionTypeList = data;
    });
  }

  private getPipeDiameter() {
    this.wbService.getPipeDiameter().subscribe(data => {
      this.pipeDiameterList = data;
    });
  }
}
