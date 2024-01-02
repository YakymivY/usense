import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  passwordForm: FormGroup;
  isShort: boolean = false;
  charTypes: number = 0;

  constructor (private fb: FormBuilder) {
    //initializing the form
    this.passwordForm = this.fb.group({
      password: ['']
    });
  }

  //password getter
  get passwordValue() {
    return this.passwordForm.get('password')?.value;
  }

  checkStrength(): void {
    //clearing values
    this.isShort = false;
    this.charTypes = 0;

    //matching conditions
    if (this.passwordValue.length < 8 && this.passwordValue.length != 0) this.isShort = true;
    else this.charTypes = this.checkContent(this.passwordValue);
  }

  checkContent(str: string): number {
    let count: number = 0;
    //string has letters
    if (/[A-Za-z]/.test(str)) {
      count++;
    }
    //string has digits
    if (/\d/.test(str)) {
      count++;
    }
    //string has symbols
    if (/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(str)) {
      count++;
    }
    return count;
  }

}
