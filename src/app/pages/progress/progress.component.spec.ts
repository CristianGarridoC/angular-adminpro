import {ProgressComponent} from "./progress.component";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {DebugElement} from "@angular/core";
import {IncreaserComponent} from "../../components/increaser/increaser.component";
import {MockComponent, ngMocks} from "ng-mocks";

describe('ProgressComponent', function () {
  let component: ProgressComponent;
  let fixture: ComponentFixture<ProgressComponent>;
  let debugElement: DebugElement;

  beforeEach(async function () {
    await TestBed.configureTestingModule({
      declarations: [
        ProgressComponent,
        MockComponent(IncreaserComponent)
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should render target component', function () {
    expect(component).toBeTruthy();
  });

  it('should render children components', function () {
    const mocksComponents: IncreaserComponent[] = ngMocks.findInstances(IncreaserComponent);
    expect(mocksComponents.length).toBe(2);
    mocksComponents.forEach((component: IncreaserComponent) => {
      expect(component).toBeTruthy();
    });
  });

  it('should increase percentage progress when the event of the child component has been emitted', async function () {
    const mockComponentOne: IncreaserComponent = ngMocks.findInstance('#increaser-one', IncreaserComponent);
    mockComponentOne.percentageProgressChange.emit(60);
    const progressBar: HTMLElement = debugElement.nativeElement.querySelector('#percentageProgressOne');
    const progressBarTwo: HTMLElement = debugElement.nativeElement.querySelector('#percentageProgressTwo');
    await fixture.whenStable();
    fixture.detectChanges();
    expect(mockComponentOne).toBeTruthy();
    expect(progressBar.style.width).toBe('60%');
    expect(progressBarTwo.style.width).toBe('50%');
  });

});
