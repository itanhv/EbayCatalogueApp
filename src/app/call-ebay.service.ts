import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CallEbayService {
  // json response from REST API
  returnedItems;

  constructor(private http: HttpClient) { }
  getItems(url :  string): any {
    console.log("sending request");
    // making a call to the REST API
    this.returnedItems = this.http.get('https://nodejsserverhw8.wl.r.appspot.com/'+url);
  
    return this.returnedItems;
  }
}
