import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Currency } from '../modules/currency/currency-format/currency-format.typings';

@Injectable({
    providedIn: 'root'
})
export class CurrencyApiService {
	public readonly apiUrl = environment.apiUrl;
    public API_KEY = environment.API_KEY;
    public COUNTRIES = {"countries":[{"countryName":"United States","countryCode":"US","currencyCode":"USD"},{"countryName":"Argentina","countryCode":"AR","currencyCode":"USD"},{"countryName":"Spain","countryCode":"SP","currencyCode":"EUR"},{"countryName":"Germany","countryCode":"GER","currencyCode":"EUR"}]};
    
    
    constructor(public http: HttpClient) { }

    createHeaders(): HttpHeaders {
        let headers = new HttpHeaders();
        headers = headers.set('X-API-KEY', this.API_KEY); 
        return headers;
      }
      getCountries() {
    	return this.COUNTRIES;
    }

    getCurrencies() {
        const url = this.apiUrl + `currency-format/`;
    	return this.http.get(url, {headers: this.createHeaders()}).toPromise();
    }

    addCurrency(currency:Currency): Observable<any> {
        let headers = this.createHeaders();
        headers.set('content-type', 'application/json'); 
        const body=JSON.stringify(currency);
        const url = this.apiUrl + `currency-format/`;
        return this.http.post(url, currency,{headers:headers})
      }

      deleteCurrency(currencyId:string){
        const url = this.apiUrl + `currency-format/`+currencyId;
    	return this.http.delete(url, {headers: this.createHeaders()}).toPromise();
      }

      updateCurrency(currency:Currency){
        const url = this.apiUrl + `currency-format/`+currency._id;
    	return this.http.put(url, currency, {headers: this.createHeaders()}).toPromise();
      }

    // --- Add the rest of your CRUD operations here ---

}