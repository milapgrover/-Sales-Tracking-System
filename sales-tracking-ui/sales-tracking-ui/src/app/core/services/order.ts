import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Order } from '../models/order.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private http = inject(HttpClient)
  getAllOrders():Observable<Order[]>
  {
    return this.http.get<Order[]>(
      `${environment.apiUrl}/orders`
    )
  }
  getOrderByid(id: number): Observable<Order> {
    return this.http.get<Order>(
      `${environment.apiUrl}/orders/${id}`
    );
  }
  createOrder(order : any) : Observable<any>
  {
    return this.http.post(
      `${environment.apiUrl}/order`,
      order
    )
  }
}