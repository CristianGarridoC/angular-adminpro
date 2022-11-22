import {Component, OnDestroy, OnInit} from '@angular/core';
import {filter, interval, map, Observable, retry, Subscription, take} from "rxjs";

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html'
})
export class RxjsComponent implements OnInit, OnDestroy {
  protected subscriptions: Subscription[] = [];

  constructor() {
  }

  ngOnInit(): void {
    // this.subscriptions.push(
    //   this.returnObservable()
    //   .pipe(
    //     retry(1)
    //   )
    //   .subscribe({
    //     next: value => console.log('Next', value),
    //     complete: async () => {
    //       await new Promise(resolve => {
    //         setTimeout(() => console.info('Complete'), 2000);
    //       });
    //     },
    //     error: err => console.warn('Error', err)
    //   })
    // );

    this.subscriptions.push(this.returnMappedObservable().subscribe(console.log));
  }

  protected returnMappedObservable(): Observable<number>{
    return interval(500)
           .pipe(
             take(10),
             map(value => value + 1),
             filter(value => value % 2 === 0)
           );
  }

  protected returnObservable(): Observable<number> {
    return new Observable<number>(observer => {
      let i = -1; //if we declare 'i' outside the observable it will keep the current value otherwise will be restarted
      const interval = setInterval(() => {
        i++;
        observer.next(i);

        if(i === 5){
          clearInterval(interval);
          observer.complete();
          //console.log('after complete observer'); //This will execute after the complete callback
        }

        if(i === 2){
          clearInterval(interval); //Always clean the interval because it will continue working for a few seconds after complete or error the observer
          observer.error('there was an error');
          //console.log('after error observer'); //This will execute after the error callback
        }

        //console.log('interval working'); //This will execute after emit some event in the observer
      }, 1000)
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      if(subscription){
        subscription.unsubscribe();
      }
    });
  }

}
