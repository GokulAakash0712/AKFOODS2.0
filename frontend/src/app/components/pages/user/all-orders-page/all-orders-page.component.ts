import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { OrderService } from '../../../../services/order.service';
import { Order } from '../../../../shared/models/Order';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

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

    this.activeRoute.fragment.subscribe((data) => {
      this.jumpToSection(data);
    });
  }

  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  private platformId = inject(PLATFORM_ID);

  
  jumpToSection(section: any) {
    if (isPlatformBrowser(this.platformId)) {
      document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
