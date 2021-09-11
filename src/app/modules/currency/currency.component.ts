import { Component, OnInit, ChangeDetectorRef, ViewChild, TemplateRef } from '@angular/core';
import { DatatableComponent, ColumnMode } from '@swimlane/ngx-datatable';
import { CurrencyApiService } from 'src/app/services/currency.service';
import { Currency } from './currency-format/currency-format.typings';
import { getStringFormatDate } from 'src/app/_metronic/core/index';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CurrencyFormComponent } from './currency-form/currency-form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ResultMessageComponent } from './result-message/result-message.component';

interface Response {
  total: number;
  result: Currency[];
}

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit {

  currencies: Currency[] = [];
  filteredCurrencies: Currency[] = [];
  isLoading: boolean = true;

  //table variables
  columns = [{ name: 'countryCode' }, { name: 'currencyCode' }, { name: 'languageIsoCode' }];
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  ColumnMode = ColumnMode;

  bsModalRef?: BsModalRef;
  countries: any;

  //private modalService: BsModalService,
  constructor(private currencyService: CurrencyApiService, private ref: ChangeDetectorRef, private modalService: NgbModal) {

  }
  ngOnInit(): void {

    this.countries = this.currencyService.getCountries().countries;
    this.getCurrencies();
  }

  addEditCurrency(currency?: Currency) {
    //this.bsModalRef = this.modalService.show(CurrencyFormComponent);
    // this.bsModalRef.content.closeBtnName = 'Close';
    const modalRef = this.modalService.open(CurrencyFormComponent);
    modalRef.componentInstance.currencyRecibed = currency;
    modalRef.componentInstance.countries = this.countries;
    modalRef.result.then((result: Currency) => {
      console.log(result)
      if (result._id) {
        this.editCurrency(result);
      } else {
        this.addCurrency(result);
      }

    }, (reason) => {
      console.log('Dismissed action: ' + reason);
    });
  }

  getCurrencies() {
    this.currencyService.getCurrencies().then((response: Response) => {
      this.currencies = response.result;
      this.filteredCurrencies = [...this.currencies];

      this.isLoading = false;
      this.ref.detectChanges();
    })
      .catch((err) => { })
  }

  addCurrency(currency?: Currency) {
    this.currencyService.addCurrency(currency)
      .subscribe(data => {
        console.log("result ", data)
        this.getCurrencies();
      }, error => {
        this.showResultMessage('Error', "Ups! Something went wrong. Please try again later.");
        console.log("error ", error)
      })
  }

  editCurrency(currency?: Currency) {
    this.currencyService.updateCurrency(currency).then((response: Response) => {
      this.getCurrencies();
    })
      .catch((err) => {
        this.showResultMessage('Error', "Ups! Something went wrong. Please try again later.");
        console.log(err)
      })
  }

  deleteCurrency(currency?: Currency) {
    this.currencyService.deleteCurrency(currency._id).then((response: Response) => {
      this.getCurrencies();
    })
      .catch((err) => {
        this.showResultMessage('Error', "Ups! Something went wrong. Please try again later.");
        console.log(err)
      })
  }

  //Date format 
  getFormatDate(date) {
    return getStringFormatDate(date);
  }

  showResultMessage(title, message) {
    const modalRef = this.modalService.open(ResultMessageComponent);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
  }

  //#region Filter table
  filterDatatable(event) {

    const val = event.target.value.toLowerCase();
    const keys = this.columns;

    // assign filtered matches to the active datatable
    this.currencies = this.filteredCurrencies.filter(function (item) {
      // iterate through each row's column data
      for (let i = 0; i < keys.length; i++) {
        if (item[keys[i].name].toString().toLowerCase().indexOf(val) !== -1 || !val) {
          return true;
        }
      }
    });
    this.table.offset = 0;
  }
  //#endregion

}
