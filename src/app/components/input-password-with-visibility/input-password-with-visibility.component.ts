import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl, FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR, ValidationErrors,
  Validator
} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-input-password-with-visibility',
  templateUrl: './input-password-with-visibility.component.html',
  styleUrls: ['./input-password-with-visibility.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputPasswordWithVisibilityComponent,
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: InputPasswordWithVisibilityComponent,
      multi: true
    }
  ]
})
export class InputPasswordWithVisibilityComponent implements OnInit, OnDestroy, ControlValueAccessor, Validator {
  passwordVisible = false;
  formGroup!: FormGroup;
  subscription!: Subscription;
  @Input() label = 'Password';
  onTouched = (): void => undefined;
  private _onChange = (_value: string | null): void => undefined;

  constructor() {
    this.formGroup = new FormGroup({
      password: new FormControl('')
    });
  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  ngOnInit(): void {
    this.subscription = this.formGroup.controls['password'].valueChanges.subscribe({
      next: value => {
        if(value === null){
          return;
        }
        this._onChange(value);
      }
    });
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if(isDisabled){
      this.formGroup.controls['password'].disable();
    } else {
      this.formGroup.controls['password'].enable();
    }
  }

  writeValue(value: string | null): void {
    if(value === null){
      this.formGroup.reset();
      return;
    }
    this.formGroup.controls['password'].setValue(value);
  }

  validate(control: AbstractControl): ValidationErrors | null {
    const password = control.value;
    if(!password){
      return {
        required: true
      };
    }
    //control.hasValidator(Validators.minLength(3))
    return null;
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

}
