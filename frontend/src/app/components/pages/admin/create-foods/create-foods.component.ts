import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FoodsService } from '../../../../services/foods.service';
import { Food } from '../../../../shared/models/Food';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-foods',
  templateUrl: './create-foods.component.html',
  styleUrl: './create-foods.component.scss',
})
export class CreateFoodsComponent implements OnInit {
  form!: FormGroup;
  food!: Food;
  imageData!: string | ArrayBuffer | null;
  isEditMode = false;
  foodId: string | null = null;

  constructor(
    private foodService: FoodsService,
    private toastrService: ToastrService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      tags: ['', Validators.required],
      image: [null, Validators.required],
    });
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.foodId = params.get('id');
      if (this.foodId) {
        this.isEditMode = true;
        this.foodService.getFoodById(this.foodId).subscribe((food) => {
          this.form.patchValue(food);
          this.imageData = food.image;
        });
      }
    });
  }

  onFileSelect(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result;
      };
      reader.readAsDataURL(file);
    }
    this.form.patchValue({ image: file });
  }

  // onSubmit() {
  //   if (this.form.valid) {
  //     const formValue = this.form.value;
  //     const file: File = formValue.image;
  //     const { name, description, tags, price } = formValue;
  //     // console.log('Form values:',{name,description,tags,price,file});

  //     this.foodService
  //       .addFoods(name, description, tags, price, file)
  //       .subscribe({
  //         next: (response) => {
  //           // console.log('Food Created : ', response.food);
  //           this.form.reset();
  //           this.imageData = null;
  //           this.toastrService.success('Food is created Successfully!');
  //         },
  //         error: (err) => {
  //           // console.log('Error creating Food', err);
  //           this.toastrService.error(err.error);
  //         },
  //       });
  //   } else {
  //     // console.log('Form invalid');
  //     this.toastrService.error('Form Invalid');
  //   }
  // }

  onSubmit(): void {
    if (this.form.valid) {
      const formData = new FormData();
      Object.keys(this.form.controls).forEach((key) => {
        formData.append(key, this.form.get(key)?.value);
      });

      if (this.isEditMode && this.foodId) {
        this.foodService.updateFood(this.foodId, formData).subscribe({
          next: () => {
            this.router.navigate(['/admin/allfoods']);
            this.toastrService.success('Food is updated successfully!');
          },
          error: (err) => {
            this.toastrService.error(err.error);
          },
        });
      } else {
        this.foodService
          .addFoods(
            this.form.get('name')?.value,
            this.form.get('description')?.value,
            this.form.get('tags')?.value,
            this.form.get('price')?.value,
            this.form.get('image')?.value
          )
          .subscribe({
            next: () => {
              this.form.reset();
              this.imageData = null;
              this.toastrService.success('Food is created successfully!');
              this.router.navigate(['/admin/allfoods']);
            },
            error: (err) => {
              this.toastrService.error(err.error);
            },
          });
      }
    } else {
      this.toastrService.error('All Fields are Required');
    }
  }
}
