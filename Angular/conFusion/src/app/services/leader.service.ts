import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

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

    getLeaders(): Observable<Leader[]> {
        return of(LEADERS).pipe(delay(2000));
    }

    getLeader(id: string): Observable<Leader> {
        return of(LEADERS.filter((leader) => (leader.id === id))[0]).pipe(delay(2000));
    }

    getFeaturedLeader(): Observable<Leader> {
        return of(LEADERS.filter((leader) => leader.featured)[0]).pipe(delay(2000));
    }


    constructor() { }
}
