import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../../services/order.service';
import { Order } from '../../../../shared/models/Order';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-order-track-page',
  templateUrl: './order-track-page.component.html',
  styleUrl: './order-track-page.component.scss',
})
export class OrderTrackPageComponent implements OnInit {
  order!: Order;
  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService
  ) {}
  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if (!params['orderId']) return;

    this.orderService.trackOrderById(params['orderId']).subscribe((order) => {
      this.order = order;
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
