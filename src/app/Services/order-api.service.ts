import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { IOrder } from '../Models/iorder';
@Injectable({
  providedIn: 'root'
})
export class OrderAPIService {
  private httpOptions = {};
  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }}

    Add(Order:IOrder):Observable<number>{
      return this.httpClient.post<number>(`${environment.APIBaseURL}/Order/Add`,JSON.stringify(Order), this.httpOptions)

    }

    delete(id:number):Observable<void>{
      return this.httpClient.get<void>(`${environment.APIBaseURL}/Order/Delete?id=${id}`)
    }
     update(Order:IOrder):Observable<void>{
      return this.httpClient.post<void>(`${environment.APIBaseURL}/Order/Update`,JSON.stringify(Order), this.httpOptions)
    }
    getById(id:number):Observable<IOrder>{
      return this.httpClient.get<IOrder>(`${environment.APIBaseURL}/Order/GetById?id=${id}`);
    }
    getByCustomerId(id:string):Observable<IOrder[]>{
      return this.httpClient.get<IOrder[]>(`${environment.APIBaseURL}/Order/GetByCustomerId?CustomerId=${id}`);
    }

    getRate(orderId:number,prdId:number):Observable<number>{
      return this.httpClient.get<number>(`${environment.APIBaseURL}/Order/GetRate?orderId=${orderId}&productId=${prdId}`);
    }

    setRate(orderId:number,prdId:number,rate:number):Observable<void>{
      return this.httpClient.get<void>(`${environment.APIBaseURL}/Order/SetRate?orderId=${orderId}&productId=${prdId}&rate=${rate}`);
    }
}