//import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsComponent } from './rxjs.component';
import {MockBuilder, MockedComponentFixture, MockRender} from "ng-mocks";
import {PagesModule} from "../pages.module";
import {fakeAsync, tick} from "@angular/core/testing";

/*describe('RxjsComponent', () => {
  let component: RxjsComponent;
  let fixture: ComponentFixture<RxjsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RxjsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RxjsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});*/

describe('RxjsComponent', () => {
  let fixture: MockedComponentFixture<RxjsComponent>;
  //let fixture: ComponentFixture<RxjsComponent>;
  let component: RxjsComponent;

  /*beforeEach(() => {
    const ngModule = MockBuilder(RxjsComponent, PagesModule).build();
    TestBed.configureTestingModule(ngModule);
    return TestBed.compileComponents();
  });*/
  beforeEach(() => MockBuilder(RxjsComponent, PagesModule))
  beforeEach(() => {
    /*fixture = TestBed.createComponent(RxjsComponent);
    component = fixture.componentInstance;*/
    fixture = MockRender(RxjsComponent, null, false);
    component = fixture.point.componentInstance;
  });

  it('should emit even numbers', fakeAsync(() => {
    const events: number[] = [];
    spyOn(console, 'log').and.callFake((data) => {
      events.push(data);
    });
    fixture.detectChanges();
    tick(5000);
    expect(events.length).toBeGreaterThan(0);
    expect(events).toEqual([2,4,6,8,10]);
  }));

})
