import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CurrencyApiService {
	public readonly apiUrl = environment.apiUrl;
    public API_KEY = environment.API_KEY;
    
    
    constructor(public http: HttpClient) { }

    createHeaders(): HttpHeaders {
        let headers = new HttpHeaders();
        headers = headers.set('X-API-KEY', this.API_KEY); 
        return headers;
      }
    

    getCurrencies() {
        const url = this.apiUrl + `currency-format/`;
    	return this.http.get(url, {headers: this.createHeaders()}).toPromise();
    }

    // --- Add the rest of your CRUD operations here ---

}