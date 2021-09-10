import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BsModalRef } from 'ngx-bootstrap/modal';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-currency-form',
  templateUrl: './currency-form.component.html',
  styleUrls: ['./currency-form.component.scss']
})
export class CurrencyFormComponent implements OnInit {
  
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  currencyForm: FormGroup;

  matcher = new MyErrorStateMatcher();

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) { 
    this.currencyForm = this.fb.group({
      userCode: [''],
      cents: [''],
      currencyPosition: [''],
      thousandIdentifier: [''],
      decimalSeparator: ['']
    });

  }

  ngOnInit(): void {

   
  }

}
