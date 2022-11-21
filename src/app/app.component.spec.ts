import { AppComponent } from './app.component';
import {MockBuilder, MockedComponentFixture, MockRender} from "ng-mocks";
import {AppModule} from "./app.module";

describe('AppComponent', () => {
  let fixture: MockedComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeAll(() => {
    //In order to be able to override the spy in the window methods you have to declare theses in the object as jasmine.createSpy
    Object.defineProperty(window, 'customHidePreloader', {
      value: jasmine.createSpy(),
      writable: true,
      configurable: true
    });
  });
  beforeEach(() => MockBuilder(AppComponent, AppModule));
  beforeEach(() => {
    fixture = MockRender(AppComponent);
    component = fixture.point.componentInstance;
  });
  afterAll(() => {
    //when you define a property in the global window object you have to delete it, if not it can affect the other tests
    delete (window as any).customHidePreloader;
  });

  it('should render the target component', function () {
    expect(component).toBeTruthy();
  });

  it('should call the customInitFunction when ngOnInit is triggered', function () {
    //if you want to override the spy you have to do this:
    //(window as any).yourProperty = jasmine.createSpy().and.throwError('comes from jasmine test');
    component.ngOnInit();
    expect((window as any).customHidePreloader).toHaveBeenCalled();
  });
});
