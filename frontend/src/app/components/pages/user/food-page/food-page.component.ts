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
  currentRating = 0;
  stars = [1, 2, 3, 4, 5];

  count1:any;
  count2:any;
  count3:any;
  count4:any;
  count5:any;

  totalRatings:any ;

  constructor(
    private activatedRoute: ActivatedRoute,
    private foodService: FoodsService,
    private cartService: CartService,
    private router: Router,
    private toastrService: ToastrService
  ) {
    this.activatedRoute.params.subscribe((params) => {
      if (params['id'])
        this.foodService.getFoodById(params['id']).subscribe((serverFood) => {
          this.food = serverFood;
          this.calculateRatingDistribution();
        });
    });
  }

  ngOnInit(): void { }

  calculateRatingDistribution() {
    const individualRatings = this.food.individualRatings;
    this.totalRatings = individualRatings?.length;

    this.count1 = individualRatings?.filter(rating => rating === 1).length;
    this.count2 = individualRatings?.filter(rating => rating === 2).length;
    this.count3 = individualRatings?.filter(rating => rating === 3).length;
    this.count4 = individualRatings?.filter(rating => rating === 4).length;
    this.count5 = individualRatings?.filter(rating => rating === 5).length;
  }

  getProgress(count: number): number{
    return this.totalRatings ? (count / this.totalRatings) * 100 : 0;
  }

  setRating(star: number) {
    this.currentRating = star;
  }

  submitRating() {
    if (this.currentRating > 0) {
      const foodId = this.food.id;
      const payload = { rating: this.currentRating };

      this.foodService.updateFoodRating(foodId, payload).subscribe((response) => {
        this.toastrService.success('Thanks for rating!');
        this.food = response;
        this.calculateRatingDistribution();
      }, (error) => {
        this.toastrService.error('Rating Failed!');
      })
    } else {
      this.toastrService.warning('Please select a rating');
    }
    this.currentRating = 0;
  }

  addToCart() {
    this.cartService.addToCart(this.food);
    this.toastrService.success('Food Added Successfully!');
    this.router.navigateByUrl('/user/cart-page');
  }
}
