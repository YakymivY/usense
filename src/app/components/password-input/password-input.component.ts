import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { strengthValidator } from '../../validators/validators';

//password strength to charachter types number in string
enum PasswordStrength {
  Weak = 1,
  Medium = 2,
  Strong = 3
}

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.css']
})
export class PasswordInputComponent implements OnInit {
  passwordForm: FormGroup;
  isShort: boolean = false;
  charTypes: number = 0;
  PasswordStrength = PasswordStrength;

  constructor (private fb: FormBuilder) {
    //initializing the form
    this.passwordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8), strengthValidator()]]
    });
  }

  ngOnInit(): void { }

  //password getter
  get password() {
    return this.passwordForm.controls['password'];
  }

  getPasswordMinLengthError(): boolean {
    return this.password.hasError('minlength');
  }

  getPasswordStrength(strength: PasswordStrength): boolean {
    return this.password.errors?.['types'] === strength;
  }

  isPasswordStrong(): boolean {
    return this.password.errors === null;
  }

}