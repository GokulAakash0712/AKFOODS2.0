import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import {
  ALL_FOODS_URL,
  CREATE_FOODS_URL,
  DELETE_FOODS_URL,
  FOODS_BY_ID_URL,
  FOODS_BY_SEARCH_URL,
  FOODS_BY_TAG_URL,
  FOODS_TAGS_URL,
  UPDATE_FOODS_URL,
} from '../shared/constants/urls';
import { Food } from '../shared/models/Food';
import { Tag } from '../shared/models/Tag';

@Injectable({
  providedIn: 'root',
})
export class FoodsService {
  constructor(private http: HttpClient) {}
  allfoods(): Observable<any> {
    return this.http.get(ALL_FOODS_URL);
  }

  addFoods(
    name: string,
    description: string,
    tags: string,
    price: number,
    image: File
  ): Observable<any> {
    const foodsData = new FormData();
    foodsData.append('name', name);
    foodsData.append('description', description);
    foodsData.append('tags', tags);
    foodsData.append('price', price.toString());
    foodsData.append('image', image, name);

    return this.http.post<{ food: Food }>(CREATE_FOODS_URL, foodsData);
  }

  getAllFoodsBySearchTerm(searchTerm: string) {
    return this.http.get<Food[]>(FOODS_BY_SEARCH_URL + searchTerm);
  }

  getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(FOODS_TAGS_URL);
  }

  getAllFoodsByTag(tag: string): Observable<Food[]> {
    return tag === 'All'
      ? this.allfoods()
      : this.http.get<Food[]>(FOODS_BY_TAG_URL + tag);
  }

  getFoodById(foodId: string): Observable<Food> {
    return this.http.get<Food>(FOODS_BY_ID_URL + foodId);
  }

  updateFood(id: string, foodData: any): Observable<any> {
    return this.http.put(UPDATE_FOODS_URL + id, foodData);
  }

  deleteFood(id: string): Observable<any> {
    return this.http.delete(DELETE_FOODS_URL + id);
  }
}
