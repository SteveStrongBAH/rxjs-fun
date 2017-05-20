import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { createTimerCache } from './caching-fns';
import { Hero } from './hero';

@Injectable()
export class TimerCacheService {

  /** Observable cache of heroes */
  heroes: Observable<Hero[]>;

  constructor(private http: Http) {

    let count = 1; // for demo
    const expirationPeriod = 4000; // ms

    // Initial value is optional. This one is for the demo.
    const initialHeroes: Hero[] = [{name: 'Hero Zero', count: 0}];

    const source = this.http.get('hero.json')
      .delay(1000) // demo: pretend server is slow
      .map(res => res.json() as Hero[])

      // Todo: add error handling
      // Demo: tweak the heroes so we can see that we got "new" daa
      .map(heroes => heroes.map(h => {
        h.count = count++;
        return h;
      }));

    this.heroes = createTimerCache<Hero[]>(source, expirationPeriod, initialHeroes);
  }
}
