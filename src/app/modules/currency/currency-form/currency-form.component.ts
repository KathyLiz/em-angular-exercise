import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CustomValidators } from 'ngx-custom-validators';
import { Subject } from 'rxjs';
import { Currency } from '../currency-format/currency-format.typings';

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

  POSITIONS = [{ value: "AFTER" }, { value: "BEFORE" }]
  SEPARATORS = [{ value: ",", text: "Comma (,)" }, { value: ".", text: "Dot (.)" }]
  filteredPositions = this.POSITIONS.slice();
  filteredSeparators = this.SEPARATORS.slice();

  @Input() currencyRecibed: Currency = null;

  @Input() countries: any;

  currencyForm: FormGroup;

  matcher = new MyErrorStateMatcher();
  filteredCountries: any;

  errorSeparators:string;

  currencyPreview:Currency = {
    "_id": "61227d5453e7b5000940263e",
    "countryCode": "AR",
    "languageIsoCode": "es",
    "currencyCode": "USD",
    "format": {
      "useCode": true,
      "cents": 2,
      "currencyPosition": "BEFORE",
      "thousandIdentifier": ",",
      "decimalSeparator": "."
    },
    "createdAt": "2021-08-22T16:37:40.948Z"
  };


  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder) {
    this.currencyForm = this.fb.group({
      country: [null, [Validators.required]],//"US",
      languageIsoCode: "es",
      useCode: [false],
      cents: [0, [CustomValidators.range([0, 4])]],
      currencyPosition: [null, [Validators.required]],
      thousandIdentifier: [null, [Validators.required]],
      decimalSeparator: [null, [Validators.required]],

    });


  }

  ngOnInit(): void {
    this.setFormValues();
    this.currencyForm.valueChanges.subscribe(formValue => {
      console.log('My changed values for inside', formValue.useCode);
      this.currencyPreview = this.createCurrencyStructure();
      console.log('My afer', formValue.useCode);
    });
    this.filteredCountries = this.countries.slice();
  }

  removeErrorsSeparators(){
    this.currencyForm.controls['decimalSeparator'].setErrors(null);
    this.currencyForm.controls['thousandIdentifier'].setErrors(null);
  }

  changeThousandIdentifier($event){
    console.log(this.currencyForm.value)
    if($event.value == this.currencyForm.value.decimalSeparator){
      this.currencyForm.controls['thousandIdentifier'].setErrors({'incorrect': true});
      this.errorSeparators = "Thousand identifier can't be the same as the Decimal separator"
    }else {
      this.removeErrorsSeparators();
      this.errorSeparators ="Your selection is invalid"
    }
    console.log("changeThousandIdentifier",this.errorSeparators);
  }

  changeDecimalSeparator($event){
    console.log("separator",this.currencyForm.value)
    if($event.value == this.currencyForm.value.thousandIdentifier){
      this.currencyForm.controls['decimalSeparator'].setErrors({'incorrect': true});
      this.errorSeparators = "Decimal separator can't be the same as the thousand identifier"
    }else {
      this.removeErrorsSeparators();
      this.errorSeparators ="Your selection is invalid"
    }
    console.log("changeDecimalSeparator",this.errorSeparators);
  }

  setFormValues() {
    if (this.currencyRecibed) {
      let currency: any = { ...this.currencyRecibed.format }
      currency['country'] = this.findCountry();
      currency['languageIsoCode'] = this.currencyRecibed.languageIsoCode;
      this.currencyForm.setValue(currency);
      this.currencyPreview = {...this.currencyRecibed}
    }
  }

  

  findCountry() {
    return this.countries.filter(item => item.countryCode == this.currencyRecibed.countryCode)[0];
  }

  createCurrencyStructure(){
    let format = { ...this.currencyForm.value };
    delete format.languageIsoCode;
    delete format.country;

    let copyRecibed = {...this.currencyRecibed}

    if (copyRecibed) {
      copyRecibed.format = format;
      copyRecibed.countryCode = this.currencyForm.value.country.countryCode;
      copyRecibed.currencyCode = this.currencyForm.value.country.currencyCode;
      copyRecibed.languageIsoCode = "es";
      return copyRecibed;
    } else {
      let newCurrency: any = {};
      newCurrency['format'] = format;
      newCurrency['countryCode'] = this.currencyForm.value.country.countryCode;
      newCurrency['currencyCode'] = this.currencyForm.value.country.currencyCode;
      newCurrency['languageIsoCode'] = "es";
      return newCurrency;
    }
  }

  validateCountry(){
    if(this.currencyForm.value.country){
      return this.currencyForm.value.country
    }else {
      return null
    }
  }

  saveCurrency() {
    this.activeModal.close(this.createCurrencyStructure());
  }

}
