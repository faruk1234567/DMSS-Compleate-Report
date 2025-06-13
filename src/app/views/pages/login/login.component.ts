import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../services/authentication.service";
import {first} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  submitted = false;
  returnUrl: string = "";
  error = '';
  customStylesValidated = false;

  username: any;
  password: any;

  constructor(private authenticationService: AuthenticationService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }


  onSubmit() {
    this.customStylesValidated = true;
    this.submitted = true;

    if (this.username && this.password) {
      this.authenticationService.login(this.username, this.password)
        .pipe(first())
        .subscribe(
          data => {
            this.router.navigate([this.returnUrl]);
          },
          error => {
            this.error = error;
          });
    }
  }
}
