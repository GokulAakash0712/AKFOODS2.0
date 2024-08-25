import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ALL_ORDERS_URL,
  MY_ORDERS_URL,
  ORDER_CREATE_URL,
  ORDER_NEW_FOR_CURRENT_USER_URL,
  ORDER_PAY_URL,
  ORDER_TRACK_BY_URL,
  UPDATE_STATUS_URL,
  VIEW_ORDER_DETAIL_URL,
} from '../shared/constants/urls';
import { Order } from '../shared/models/Order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  create(order: Order) {
    return this.http.post<Order>(ORDER_CREATE_URL, order);
  }

  getNewOrderForCurrentUser(): Observable<Order> {
    return this.http.get<Order>(ORDER_NEW_FOR_CURRENT_USER_URL);
  }

  pay(order: Order): Observable<string> {
    return this.http.post<string>(ORDER_PAY_URL, order);
  }

  trackOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(ORDER_TRACK_BY_URL + id);
  }

  viewOrderDetail(id: number): Observable<Order> {
    return this.http.get<Order>(VIEW_ORDER_DETAIL_URL + id);
  }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(ALL_ORDERS_URL);
  }

  getOrdersForCurrentUser(): Observable<Order[]> {
    return this.http.get<Order[]>(MY_ORDERS_URL);
  }

  deliveryStatus(orderId: any): Observable<any> {
    return this.http.put(UPDATE_STATUS_URL + orderId, {});
  }
}
