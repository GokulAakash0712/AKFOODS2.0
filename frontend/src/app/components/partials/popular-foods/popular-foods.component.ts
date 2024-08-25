import { Component, OnInit } from '@angular/core';
import { FoodsService } from '../../../services/foods.service';
import { Food } from '../../../shared/models/Food';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from '../../../services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-popular-foods',
  templateUrl: './popular-foods.component.html',
  styleUrl: './popular-foods.component.scss',
})
export class PopularFoodsComponent implements OnInit {
  foods: Food[] = [];
  constructor(
    private foodService: FoodsService,
    private cartService: CartService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params) => {
      let foodObservable: Observable<Food[]>;

      if (params['searchTerm']) {
        foodObservable = this.foodService.getAllFoodsBySearchTerm(
          params['searchTerm']
        );
      } else if (params['tag']) {
        foodObservable = this.foodService.getAllFoodsByTag(params['tag']);
      } else {
        foodObservable = this.foodService.allfoods();
      }

      // Subscribe to the observable to set the foods array
      foodObservable.subscribe((foods) => {
        this.foods = foods;
      });
    });
  }
  ngOnInit(): void {
    // this.foodService.allfoods().subscribe((data) => {
    //   this.foods = data;
    // });
  }
  addToCart(food: Food): void {
    this.cartService.addToCart(food);
    this.toastrService.success('Added Successfully!');
  }
}
