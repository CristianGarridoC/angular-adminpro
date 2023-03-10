import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";

import {UserService} from "../../services/user.service";
import {LoginRequest} from "../../interfaces/login-request";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ 'login.component.css' ]
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginRequest!: LoginRequest;
  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly userService: UserService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      rememberMe: [false]
    });
  }

  login(): void {
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      return;
    }
    this.loginRequest = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    this.userService.logIn(this.loginRequest).subscribe({
      next: response => {
        console.log('login response', response);
        this.router.navigateByUrl('/');
      },
      error: err => {
        Swal.fire({
          title: 'Error!',
          text: err.error.detail,
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    });
  }

}
