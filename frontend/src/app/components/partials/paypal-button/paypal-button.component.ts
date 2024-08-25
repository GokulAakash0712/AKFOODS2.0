import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Order } from '../../../shared/models/Order';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../services/cart.service';
import { OrderService } from '../../../services/order.service';
import { Router } from '@angular/router';

//window.paypal
declare var paypal: any;

@Component({
  selector: 'app-paypal-button',
  templateUrl: './paypal-button.component.html',
  styleUrl: './paypal-button.component.scss',
})
export class PaypalButtonComponent implements OnInit {
  @Input()
  order!: Order;

  @ViewChild('paypal', { static: true })
  paypalElement!: ElementRef;

  constructor(
    private orderService: OrderService,
    private cartService: CartService,
    private router: Router,
    private toastrService: ToastrService
  ) {}
  ngOnInit(): void {
    const self = this;
    paypal
      .Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: 'USD',
                  value: self.order.totalPrice,
                },
              },
            ],
          });
        },

        onApprove: async (data: any, actions: any) => {
          const payment = await actions.order.capture();
          this.order.paymentId = payment.id;
          self.orderService.pay(this.order).subscribe({
            next: (orderId: any) => {
              this.cartService.clearCart();
              this.router.navigateByUrl('/user/all-orders');
              this.toastrService.success('Payment Successfully');
            },
            error: (error: any) => {
              this.toastrService.error('Payment Save Failed');
            },
          });
        },

        onError: (err: any) => {
          this.toastrService.error('Payment Failed');
          console.log(err);
        },
      })
      .render(this.paypalElement.nativeElement);
  }
}
