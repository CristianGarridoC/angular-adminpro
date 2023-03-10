import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {SignupRequest} from "../../interfaces/signup-request";
import Swal from "sweetalert2";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['register.component.css']
})
export class RegisterComponent implements OnInit {
  signupForm!: FormGroup;
  signupRequest!: SignupRequest;
  constructor(
    private readonly fb: FormBuilder,
    private readonly userService: UserService
  ) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(3)]],
      agreeToTerms: [false, Validators.requiredTrue]
    }, {validators: this.passwordsMatch});
  }

  passwordsMatch(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    if(password?.value === confirmPassword?.value) {
      if(confirmPassword?.hasError('mismatch')){
        delete confirmPassword?.errors?.['mismatch'];
      }
      confirmPassword?.setErrors(confirmPassword?.errors);
    }
    else {
      confirmPassword?.setErrors({...confirmPassword?.errors, mismatch: true});
    }
  }

  signup() {
    if(this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    this.signupRequest = {
      email: this.signupForm.value.email,
      password: this.signupForm.value.password
    }

    this.userService.signUp(this.signupRequest).subscribe({
      next: (response) => {
        this.signupForm.reset();
        console.log(response);
      },
      error: (error) => {
        Swal.fire({
          title: 'Error!',
          text: error.error.detail,
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    });
  }

}
