import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../../../services/order.service';
import { Order } from '../../../../shared/models/Order';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrl: './payment-page.component.scss',
})
export class PaymentPageComponent implements OnInit {
  order: Order = new Order();
  constructor(private orderService: OrderService, private router: Router) {}
  ngOnInit(): void {
    this.orderService.getNewOrderForCurrentUser().subscribe({
      next: (order) => {
        this.order = order;
      },
      error: () => {
        this.router.navigateByUrl('/user/checkout-page');
      },
    });
  }
}
