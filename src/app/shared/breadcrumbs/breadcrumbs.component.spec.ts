import {MockBuilder, MockedComponentFixture, MockRender, MockService} from "ng-mocks";
import {BreadcrumbsComponent} from "./breadcrumbs.component";
import {DebugElement} from "@angular/core";
import {SharedModule} from "../shared.module";
import {ActivationEnd, Router} from "@angular/router";
import {asyncScheduler, EMPTY, scheduled} from 'rxjs';
import {fakeAsync, tick} from "@angular/core/testing";

describe('BreadCrumbs', () => {
  let fixture: MockedComponentFixture<BreadcrumbsComponent>;
  let component: BreadcrumbsComponent;
  let debugElement: DebugElement;
  let routerService: Router = MockService(Router, {
    events: EMPTY
  });
  const scheduleRouterEvent = (title: string | null) => {
    const routerEvent = MockService(ActivationEnd, {
      snapshot: {
        data: {
          title: title
        }
      }
    } as unknown as ActivationEnd);
    (routerService as any).events = scheduled([routerEvent], asyncScheduler);
  };

  beforeEach(() => MockBuilder(BreadcrumbsComponent, SharedModule).provide({ provide: Router, useValue: routerService }));
  beforeEach(() => {
    fixture = MockRender(BreadcrumbsComponent);
    component = fixture.point.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('should render the target component', function () {
    expect(component).toBeTruthy();
  });

  it('should render the current title of the component', fakeAsync(() => {
    scheduleRouterEvent('test');
    component.ngOnInit();
    tick();
    fixture.detectChanges();
    const h3Title = debugElement.nativeElement.querySelector('h3.text-themecolor');
    const liTitle = debugElement.nativeElement.querySelector('li.breadcrumb-item.active');
    expect(h3Title.textContent).toBe('test');
    expect(liTitle.textContent).toBe('test');
    expect(document.title).toBe('AdminPro - test')
  }));

  it('should render the title even if it does not have one', fakeAsync(() => {
    scheduleRouterEvent(null);
    component.ngOnInit();
    tick();
    fixture.detectChanges();
    const h3Title = debugElement.nativeElement.querySelector('h3.text-themecolor');
    const liTitle = debugElement.nativeElement.querySelector('li.breadcrumb-item.active');
    expect(h3Title).toBeFalsy();
    expect(liTitle).toBeFalsy();
    expect(document.title).toBe('AdminPro')
  }));

});

