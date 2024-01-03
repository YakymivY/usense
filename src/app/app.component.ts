import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

//password strength to charachter types number in string
enum PasswordStrength {
  Weak = 1,
  Medium = 2,
  Strong = 3
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  passwordForm: FormGroup;
  isShort: boolean = false;
  charTypes: number = 0;
  PasswordStrength = PasswordStrength;
  private destroy$ = new Subject<void>();

  constructor (private fb: FormBuilder) {
    //initializing the form
    this.passwordForm = this.fb.group({
      password: ['']
    });
  }

  ngOnInit(): void {
    //create subscription
    this.password?.valueChanges.pipe(takeUntil(this.destroy$)).subscribe( //take until
      (value) => {
        this.checkStrength(value);
      }
    );
  }

  //password getter
  get password() {
    return this.passwordForm.get('password');
  }

  checkStrength(value: string): void {
    //clearing values
    this.isShort = false;
    this.charTypes = 0;

    //matching conditions
    if (value.length < 8 && value.length != 0) this.isShort = true;
    else this.charTypes = this.checkContent(value);
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

  //unsubscribe
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
