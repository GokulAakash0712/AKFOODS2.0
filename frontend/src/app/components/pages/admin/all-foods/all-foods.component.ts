import { Component, OnInit } from '@angular/core';
import { FoodsService } from '../../../../services/foods.service';
import { Food } from '../../../../shared/models/Food';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-foods',
  templateUrl: './all-foods.component.html',
  styleUrl: './all-foods.component.scss',
})
export class AllFoodsComponent implements OnInit {
  foods: Food[] = [];
  alertForm = false;
  foodToDelete: string | null = null;
  constructor(private foodService: FoodsService, private router: Router) {}
  ngOnInit(): void {
    this.foodService.allfoods().subscribe((data) => {
      this.foods = data;
    });
  }

  editFood(id: string): void {
    this.router.navigate([`/admin/editfood/${id}`]);
  }

  alertFormOpen(foodId:string):void {
    this.alertForm = true;
    this.foodToDelete = foodId;
  }

  alertFormClose() {
    this.alertForm = false;
    this.foodToDelete = null;
  }

  deleteFood(): void {
     if (this.foodToDelete) {
       this.foodService.deleteFood(this.foodToDelete).subscribe(() => {
         this.foods = this.foods.filter(
           (food) => food.id !== this.foodToDelete
         );
         this.alertFormClose();
       });
     }
  }
}
