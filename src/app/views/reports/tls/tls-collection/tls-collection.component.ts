import {Component, OnInit} from '@angular/core';
import {MunicipalityService} from "../../../../services/municipality.service";
import {UserService} from "../../../../services/user.service";
import {User} from "../../../../models/user";
import {NgbCalendar} from "@ng-bootstrap/ng-bootstrap";
import {FileService} from "../../../../services/file.service";
import {TLSCollectionReportParam} from "../../../../models/wb/tls-collection-report-param";
import {TLSCollectionService} from "../../../../services/tlsc.service";

@Component({
  selector: 'app-tls-collection',
  templateUrl: './tls-collection.component.html',
  styleUrls: ['./tls-collection.component.scss']
})
export class TlsCollectionComponent implements OnInit {

  src: any = '';

  loading = false;
  reportGenerated = false;

  municipalityList: any[] = [];
  signboardTypeList: any[] = [];

  user: User = null!;

  reportParam: TLSCollectionReportParam = null!;

  date: any;
  fileId: any;

  constructor(private calendar: NgbCalendar, private municipalityService: MunicipalityService, private userService: UserService, private tlsCollectionService: TLSCollectionService, private fileService: FileService) {
  }

  generateReport() {
    this.loading = true;

    this.tlsCollectionService.generateTLSCollectionReport(this.reportParam).subscribe(data => {
      this.fileId = data;
      this.src = this.fileService.getPDFFileUrl(this.user.id, this.fileId);
      this.loading = false;
      this.reportGenerated = true;
    });
  }

  downloadPDFReport() {
    window.open(this.fileService.getPDFFileUrl(this.user.id, this.fileId), '_blank');
  }

  downloadXLSXReport() {
    window.open(this.fileService.getXLSXFileUrl(this.user.id, this.fileId), '_blank');
  }

  ngOnInit(): void {
    this.user = this.userService.getUser();
    let fromDate = this.calendar.getToday();
    let today = this.calendar.getToday();
    this.date = {year: this.calendar.getToday().year, month: this.calendar.getToday().month}
    this.reportParam = new TLSCollectionReportParam(0, '0',  fromDate, today);

    this.getMunicipality();

    this.getAllSignboardType();
  }

  private getMunicipality() {
    if (this.user.municipalityId == null || this.user.municipalityId == 0) {
      this.municipalityService.getAllMunicipality().subscribe(data => {
        this.municipalityList = data;
      });
    }
  }

  private getAllSignboardType() {
    this.tlsCollectionService.getAllSignboardType().subscribe(data => {
      this.signboardTypeList = data;
    });
  }
}
