import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../../services/order.service';
import { Order } from '../../../../shared/models/Order';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.scss',
})
export class AllOrdersComponent implements OnInit {
  orders: Order[] = [];
  showOrderDetails = false;
  selectedOrder: Order | null = null;
  constructor(
    private orderService: OrderService,
    private toastrService: ToastrService
  ) {}
  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getAllOrders().subscribe({
      next: (data) => {
        this.orders = data;
      },
      error: (error) => {
        console.error('Error fetching orders', error);
      },
    });
  }

  viewOrderDetails(orderId: number): void {
    this.orderService.viewOrderDetail(orderId).subscribe((order) => {
      this.selectedOrder = order;
      this.showOrderDetails = true;
    });
  }

  closeOrderDetails(): void {
    this.showOrderDetails = false;
    this.selectedOrder = null;
  }

  delivered(orderId: any): void {
    this.orderService.deliveryStatus(orderId).subscribe({
      next: () => {
        if (this.selectedOrder?.id === orderId) {
          this.selectedOrder!.status = 'DELIVERED';
        }
        this.loadOrders();
        this.toastrService.success('Order marked as delivered!');
      },
      error: (error) => {
        this.toastrService.error("Already marked as delivered!");
      },
    });
  }
}
