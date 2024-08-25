import { Component, OnInit } from '@angular/core';
import { Food } from '../../../../shared/models/Food';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodsService } from '../../../../services/foods.service';
import { CartService } from '../../../../services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrl: './food-page.component.scss',
})
export class FoodPageComponent implements OnInit {
  food!: Food;
  constructor(
    activatedRoute: ActivatedRoute,
    foodService: FoodsService,
    private cartService: CartService,
    private router: Router,
    private toastrService: ToastrService
  ) {
    activatedRoute.params.subscribe((params) => {
      if (params['id'])
        foodService.getFoodById(params['id']).subscribe((serverFood) => {
          this.food = serverFood;
        });
    });
  }

  ngOnInit(): void {}

  addToCart() {
    this.cartService.addToCart(this.food);
    this.toastrService.success('Food Added Successfully!');
    this.router.navigateByUrl('/user/cart-page');
  }
}
