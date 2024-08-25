import { Component, OnInit } from '@angular/core';
import { Tag } from '../../../shared/models/Tag';
import { FoodsService } from '../../../services/foods.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.scss',
})
export class TagsComponent implements OnInit {
  tags?: Tag[];
  constructor(private foodService: FoodsService) {}
  ngOnInit(): void {
    this.foodService.getAllTags().subscribe((serverTags) => {
      this.tags = serverTags;
    });
  }
}
