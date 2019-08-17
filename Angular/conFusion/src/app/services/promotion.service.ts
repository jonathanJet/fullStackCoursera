import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';


import { baseURL } from '../shared/baseurl';
import { Promotion } from '../shared/promotion';

import { ProcessHTTPMsgService } from './process-httpmsg.service';
import {Dish} from "../shared/dish";


@Injectable({
  providedIn: 'root'
})
export class PromotionService {


    constructor(private http: HttpClient,
                private processHTTPMsgService: ProcessHTTPMsgService) { }

    getPromotions(): Observable<Promotion[]> {
        return this.http.get<Promotion[]>(baseURL + 'promotions')
            .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    getPromotion(id: number): Observable<Promotion> {
        return this.http.get<Promotion>(baseURL+'promotions/'+id).pipe(catchError(this.processHTTPMsgService.handleError));
    }

    getFeaturedPromotion(): Observable<Promotion> {
        return this.http.get<Promotion>(baseURL+'promotions?featured=true').pipe(map(promotion => promotion[0]))
            .pipe(catchError(this.processHTTPMsgService.handleError));
    }


    /*getPromotions(): Promotion[] {
        return PROMOTIONS;
    }

    getPromotion(id: string): Promotion {
        return PROMOTIONS.filter((promo) => (promo.id === id))[0];
    }

    getFeaturedPromotion(): Promotion {
        return PROMOTIONS.filter((promotion) => promotion.featured)[0];
    }*/

    /*getPromotions(): Promise<Promotion[]> {
        return new Promise(resolve=> {
            // Simulate server latency with 2 second delay
            setTimeout(() => resolve(PROMOTIONS), 2000);
        });
    }

    getPromotion(id: string): Promise<Promotion> {
        return new Promise(resolve=> {
            // Simulate server latency with 2 second delay
            setTimeout(() => resolve(PROMOTIONS.filter((promotion) => (promotion.id === id))[0]), 2000);
        });
    }

    getFeaturedPromotion(): Promise<Promotion> {
        return  new Promise(resolve=> {
            // Simulate server latency with 2 second delay
            setTimeout(() => resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]), 2000);
        });
    }*/


}
