import {Component, OnDestroy} from '@angular/core';
import {ActivationEnd, Router} from "@angular/router";
import {filter, map, Subscription, take} from "rxjs";

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html'
})
export class BreadcrumbsComponent implements  OnDestroy{
  protected title: string = '';
  protected subscriptions: Subscription[] = [];

  constructor(
    private readonly router: Router
  ) {
    this.subscriptions.push(this.setTitlePage());
  }

  protected setTitlePage(): Subscription {
    return this.router.events.pipe(
      filter(event => event instanceof ActivationEnd && !(event as ActivationEnd).snapshot.firstChild),
      map(routeData => (routeData as ActivationEnd).snapshot.data)
    ).subscribe(data => {
      this.title = data['title'];
      document.title = this.concatTitle('AdminPro', this.title);
    });
  }

  protected concatTitle(webapp: string, page: string): string {
    if(!page){
      return webapp;
    }
    return `${webapp} - ${page}`
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}
