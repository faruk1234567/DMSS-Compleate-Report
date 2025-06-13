import {Component, OnInit} from '@angular/core';
import {User} from "../../../models/user";
import {MunicipalityService} from "../../../services/municipality.service";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user: User = null!;

  municipalityList: any[] = [];

  constructor(private userService: UserService, private municipalityService: MunicipalityService) {
  }

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.getMunicipality();
  }

  private getMunicipality() {
    this.municipalityService.getAllMunicipality().subscribe(data => {
      this.municipalityList = data;
    });
  }
}
