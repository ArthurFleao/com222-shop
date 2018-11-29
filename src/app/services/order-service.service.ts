import { Injectable } from '@angular/core';
import { Order } from '../models/order.';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { OrderItem } from '../models/orderitem.';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private ordersUrl = 'http://localhost:8080/api/bookorder';  // URL to web api
  private orderitemsUrl = 'http://localhost:8080/api/bookorderitem';  // URL to web api
  constructor(
    private http: HttpClient
  ) { }


  addOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.ordersUrl, order, httpOptions);
  }
  addOrderItem(orderItem: OrderItem): Observable<OrderItem> {
    return this.http.post<OrderItem>(this.orderitemsUrl, orderItem, httpOptions);
  }
}
