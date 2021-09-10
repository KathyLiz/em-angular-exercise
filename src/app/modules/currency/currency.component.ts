import { Component, OnInit,ChangeDetectorRef, ViewChild, TemplateRef } from '@angular/core';
import { DatatableComponent, ColumnMode } from '@swimlane/ngx-datatable';
import { CurrencyApiService } from 'src/app/services/currency.service';
import { Currency } from './currency-format/currency-format.typings';
import { getStringFormatDate } from 'src/app/_metronic/core/index';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CurrencyFormComponent } from './currency-form/currency-form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  columns = [{ name: 'countryCode' }, { name: 'currencyCode' }, {name:'languageIsoCode'}];
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;

  ColumnMode = ColumnMode;

  bsModalRef?: BsModalRef;

  //private modalService: BsModalService,
  constructor(private currencyService: CurrencyApiService, private ref: ChangeDetectorRef, private modalService: NgbModal) { 

  }

  

  

  ngOnInit(): void {
    this.currencyService.getCurrencies().then((response: Response) => {
        this.currencies = response.result;
        this.filteredCurrencies = [...this.currencies];
        
        this.isLoading = false;
        this.ref.detectChanges();
    })
    .catch((err) => { })
  }

  addEditCurrency(currency?:Currency) {
    //this.bsModalRef = this.modalService.show(CurrencyFormComponent);
   // this.bsModalRef.content.closeBtnName = 'Close';
   const modalRef = this.modalService.open(CurrencyFormComponent);
   modalRef.componentInstance.currencyRecibed = currency;
   modalRef.result.then((result) => {
    console.log(result)
  }, (reason) => {
    console.log('Dismissed action: ' + reason);
  });
  }

  editCurrency(currency?:Currency){

  }

  deleteCurrency(currency?:Currency){

  }

  //Date format 
  getFormatDate(date){
    return getStringFormatDate(date);
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
