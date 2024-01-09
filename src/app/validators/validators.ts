import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function strengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value; //take value of the control
    
      if (!value) return null; 
    
      const charTypes: number = checkContent(value);
    
      return charTypes !== 3 ? {types: charTypes} : null;
    } 
  }
  
  function checkContent(str: string): number {
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