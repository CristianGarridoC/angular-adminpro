import {IncreaserComponent} from "./increaser.component";
import {DebugElement} from "@angular/core";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {
  DefaultRenderComponent,
  MockBuilder,
  MockedComponentFixture,
  MockRender,
  MockRenderFactory,
  ngMocks
} from "ng-mocks";
import {FormsModule} from "@angular/forms";
import {ComponentsModule} from "../components.module";

describe('IncreaserComponent', function() {
  let fixture: MockedComponentFixture<IncreaserComponent, DefaultRenderComponent<IncreaserComponent>>;
  let debugElement: DebugElement;
  let component: IncreaserComponent;

  beforeEach(() => MockBuilder(IncreaserComponent, ComponentsModule));
  beforeEach(() => {
    //Note: If you want to update in a unit test the inputs, then you need to use point if the property doesn't exist in the current params provided to the MockRender function
    fixture = MockRender(IncreaserComponent, {
      percentageProgress: 0
    } as DefaultRenderComponent<IncreaserComponent>);
    debugElement = fixture.debugElement;
    component = fixture.point.componentInstance;
  });

  it('should render the testbed target component', function () {
    expect(component).toBeTruthy();
    expect(component.percentageProgress).toBe(0);
    expect(component.buttonClass).toBe('btn-primary')
  });

  it('should have been called the event emit when the sum button is clicked and the percentage of progress is less than 100', function () {
    const sumButton: HTMLButtonElement = debugElement.nativeElement.querySelector('#sumButton');
    spyOn(fixture.point.componentInstance.percentageProgressChange, 'emit');
    sumButton.click();
    expect(component.percentageProgressChange.emit).toHaveBeenCalledOnceWith(5);
  });

  it('should have been called the event emit when the subtract button is clicked and the percentage of progress is greater than 0', function () {
    component.percentageProgress = 5;
    fixture.detectChanges();//We need this detectChanges so that the sum button to be updated with the new value disabled
    const subtractButton = fixture.debugElement.nativeElement.querySelector('#subtractButton');
    spyOn(component.percentageProgressChange, 'emit');
    subtractButton.click();
    expect(component.percentageProgressChange.emit).toHaveBeenCalledOnceWith(0);
  });

  it('should have been called the event emit when input value change', function () {
    spyOn(component.percentageProgressChange, 'emit');
    ngMocks.change('#percentProgress', 60);
    expect(component.percentageProgressChange.emit).toHaveBeenCalledOnceWith(60);
  });

  it('should disabled the sum button when percentage of progress is equal to or greater than 100', function () {
    component.percentageProgress = 100;
    const sumButton: HTMLButtonElement = debugElement.nativeElement.querySelector('#sumButton');
    spyOn(component.percentageProgressChange, 'emit');
    sumButton.click();
    fixture.detectChanges(); //We need this detectChanges so that the sum button to be updated with the new value disabled

    expect(component.percentageProgressChange.emit).toHaveBeenCalledOnceWith(100);
    expect(component.percentageProgress).toBe(100);
    expect(sumButton.disabled).toBe(true);
  });

  it('should disabled the subtract button when percentage of progress is equal to or less than 0', function () {
    component.percentageProgress = 1;
    fixture.detectChanges();
    const subtractButton: HTMLButtonElement = debugElement.nativeElement.querySelector('#subtractButton');
    spyOn(component.percentageProgressChange, 'emit');
    subtractButton.click();
    fixture.detectChanges();

    expect(component.percentageProgressChange.emit).toHaveBeenCalledOnceWith(0);
    expect(component.percentageProgress).toBe(0);
    expect(subtractButton.disabled).toBe(true);
  });

  it('should have been triggered the event emit with percentage of progress equal to 100 even when the percentage is greater than that', function () {
    spyOn(component.percentageProgressChange, 'emit');
    ngMocks.change('#percentProgress', 10000000);
    fixture.detectChanges();
    expect(component.percentageProgressChange.emit).toHaveBeenCalledOnceWith(100);
    expect(debugElement.nativeElement.querySelector('#percentProgress').classList).toContain('is-invalid');
  });

  it('should have been called the event emit with percentage of progress equal to 0 even when the percentage is less than that', function () {
    spyOn(component.percentageProgressChange, 'emit');
    ngMocks.change('#percentProgress', -1000);
    fixture.detectChanges();
    expect(component.percentageProgressChange.emit).toHaveBeenCalledOnceWith(0);
    expect(debugElement.nativeElement.querySelector('#percentProgress').classList).toContain('is-invalid');
  });
});

/*describe('IncreaserComponent1', function () {
  let component: IncreaserComponent;
  let fixture: ComponentFixture<IncreaserComponent>;
  let debugElement: DebugElement

  beforeEach(function () {
    TestBed.configureTestingModule({
      declarations: [
        IncreaserComponent
      ],
      imports: [
        FormsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(IncreaserComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should have been called the event emit when the sum button is clicked and the percentage of progress is less than 100', async function () {
    const sumButton: HTMLButtonElement = debugElement.nativeElement.querySelector('#sumButton');
    spyOn(component.updatingPercentageProgress, 'emit');
    sumButton.click();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(component.updatingPercentageProgress.emit).toHaveBeenCalledOnceWith(5);
  });

  it('should have been called the event emit when the subtract button is clicked and the percentage of progress is greater than 0', async function () {
    const params: any = {
      initialPercentageProgress: 5
    };
    const fixture = MockRender(IncreaserComponent, params);
    const subtractButton = fixture.debugElement.nativeElement.querySelector('#subtractButton');
    spyOn(fixture.point.componentInstance.updatingPercentageProgress, 'emit');
    subtractButton.click();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(fixture.point.componentInstance.updatingPercentageProgress.emit).toHaveBeenCalledOnceWith(0);
  });

  it('should have been called the event emit when input value changed', async function () {
    spyOn(component.updatingPercentageProgress, 'emit');
    ngMocks.change('#percentProgress', 90);
    await fixture.whenStable();
    fixture.detectChanges();
    expect(component.updatingPercentageProgress.emit).toHaveBeenCalledOnceWith(90);
  });

});*/
