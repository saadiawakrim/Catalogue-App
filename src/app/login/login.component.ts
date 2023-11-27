import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  public form! : FormGroup;
  public error! : string;

  constructor(private formBuilder : FormBuilder, private authService : AuthService, private router : Router) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group(
      {
        username : this.formBuilder.control("", [Validators.required]),
        password : this.formBuilder.control("", [Validators.required])
      }
    );
  }

  public login() {
    let username = this.form.value.username;
    let password = this.form.value.password;
    this.authService.login(username, password).subscribe({
      next : (data) => {
        this.authService.authenticate(data.access_token, data.refresh_token);
        this.router.navigateByUrl("/admin")
      },
      error : (error) => {
        this.error = "Username/Password error"
      }
    });
  }
}
