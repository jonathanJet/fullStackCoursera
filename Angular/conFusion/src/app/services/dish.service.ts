import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { baseURL } from '../shared/baseurl';
import { Dish } from '../shared/dish';


@Injectable({
  providedIn: 'root'
})

export class DishService {

    getDishes(): Observable<Dish[]> {
        return this.http.get<Dish[]>(baseURL + 'dishes');
    }

    getDish(id: number): Observable<Dish> {
        return this.http.get<Dish>(baseURL + 'dishes/' + id);
    }

    getFeaturedDish(): Observable<Dish> {
        return this.http.get<Dish[]>(baseURL + 'dishes?featured=true').pipe(map(dishes => dishes[0]));
    }

    getDishIds(): Observable<number[] | any> {
        return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)));
    }

  constructor(private http: HttpClient) { }


}