import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import {catchError, delay, map} from 'rxjs/operators';

import { Leader } from '../shared/leader';
import { baseURL } from '../shared/baseurl'
import {HttpClient} from "@angular/common/http";
import {ProcessHTTPMsgService} from "./process-httpmsg.service";




@Injectable({
  providedIn: 'root'
})
export class LeaderService {

    constructor(private http : HttpClient,private processHTTPMsgService : ProcessHTTPMsgService ) { }


    getLeaders(): Observable<Leader[]> {
        return this.http.get<Leader[]>(baseURL+'leadership')
            .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    getLeader(id: number): Observable<Leader> {
        return this.http.get<Leader>(baseURL+'leadership/'+id)
            .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    getFeaturedLeader(): Observable<Leader> {
        return this.http.get<Leader>(baseURL+'leadership?featured=true').pipe(map(leader => leader[0]))
            .pipe(catchError(this.processHTTPMsgService.handleError));
    }

    /*getLeaders(): Promise<Leader[]> {
        return Promise.resolve(LEADERS);
    }

    getLeader(id: string): Promise<Leader> {
        return Promise.resolve(LEADERS.filter((leader) => (leader.id === id))[0]);
    }

    getFeaturedLeader(): Promise<Leader> {
        return Promise.resolve(LEADERS.filter((leader) => leader.featured)[0]);
    }*/

    /*getLeaders(): Promise<Leader[]> {
        return new Promise(resolve=> {
            // Simulate server latency with 2 second delay
            setTimeout(() => resolve(LEADERS), 2000);
        });
    }

    getLeader(id: string): Promise<Leader> {
        return new Promise(resolve=> {
            // Simulate server latency with 2 second delay
            setTimeout(() => resolve(LEADERS.filter((leader) => (leader.id === id))[0]), 2000);
        });
    }

    getFeaturedLeader(): Promise<Leader> {
        return  new Promise(resolve=> {
            // Simulate server latency with 2 second delay
            setTimeout(() => resolve(LEADERS.filter((leader) => leader.featured)[0]), 2000);
        });
    }*/

    /*getLeaders(): Observable<Leader[]> {
        return of(LEADERS).pipe(delay(2000));
    }

    getLeader(id: string): Observable<Leader> {
        return of(LEADERS.filter((leader) => (leader.id === id))[0]).pipe(delay(2000));
    }

    getFeaturedLeader(): Observable<Leader> {
        return of(LEADERS.filter((leader) => leader.featured)[0]).pipe(delay(2000));
    }*/


}
