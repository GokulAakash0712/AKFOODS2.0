import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../../services/order.service';
import { Order } from '../../../../shared/models/Order';

@Component({
  selector: 'app-all-orders-page',
  templateUrl: './all-orders-page.component.html',
  styleUrl: './all-orders-page.component.scss',
})
export class AllOrdersPageComponent implements OnInit {
  orders: Order[]=[];
  constructor(private orderService: OrderService) {}
  ngOnInit(): void {
    this.orderService.getOrdersForCurrentUser().subscribe({
      next: (orders) => {
        this.orders = orders;
      },
      error: (error) => {
        console.error('Error fetching orders', error);
      },
    });
  }
}
