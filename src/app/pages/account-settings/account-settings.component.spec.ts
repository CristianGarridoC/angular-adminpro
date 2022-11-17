import {
  DefaultRenderComponent,
  MockBuilder,
  MockedComponentFixture,
  MockInstance,
  MockProvider,
  MockRender,
  ngMocks
} from "ng-mocks";
import {AccountSettingsComponent} from "./account-settings.component";
import {DebugElement} from "@angular/core";
import {ComponentsModule} from "../../components/components.module";
import {SettingsService} from "../../services/settings.service";
import {ComponentFixture, TestBed} from "@angular/core/testing";

describe('AccountSettings', () => {
  let fixture: MockedComponentFixture<AccountSettingsComponent, DefaultRenderComponent<AccountSettingsComponent>>;
  // let fixture: ComponentFixture<AccountSettingsComponent>;
  let component: AccountSettingsComponent;
  let debugElement: DebugElement;
  let service: SettingsService;

  /*beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountSettingsComponent],
      providers: [
        MockProvider(SettingsService)
      ]
    });

    fixture = TestBed.createComponent(AccountSettingsComponent);
    service = TestBed.inject(SettingsService);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });*/

  beforeEach(() => MockBuilder(AccountSettingsComponent, ComponentsModule));
  beforeEach(() => {
    fixture = MockRender(AccountSettingsComponent, {} as DefaultRenderComponent<AccountSettingsComponent>);
    component = fixture.point.componentInstance;
    debugElement = fixture.debugElement;
    service = ngMocks.findInstance(fixture, SettingsService);
  });

  it('should select the default theme provided by the service', function () {
    const theme = 'blue-dark'
    const spy = spyOnProperty(service, 'defaultTheme').and.returnValue(theme);
    component.ngOnInit();
    fixture.detectChanges();
    const aElement: HTMLElement = debugElement.nativeElement.querySelector(`a.selector[data-theme="${theme}"]`);
    const aElements: HTMLElement[] = debugElement.nativeElement.querySelectorAll(`a.selector:not([data-theme="${theme}"])`);
    expect(spy).toHaveBeenCalled();
    expect(aElement).toBeTruthy();
    expect(aElement.classList).toContain('working');
    aElements.forEach(element => expect(element.classList).not.toContain('working'));
  });

  it('should change the current theme when the "a" element is clicked', function () {
    const theme = 'purple-dark';
    spyOn(service, 'saveThemeInLocalStorage');
    // spyOnProperty(service, 'defaultTheme').and.returnValue(theme);
    let aElement = debugElement.nativeElement.querySelector(`a.selector[data-theme="${theme}"]`);
    aElement.click();
    fixture.detectChanges();

    expect(service.saveThemeInLocalStorage).toHaveBeenCalledOnceWith(theme);
    expect(aElement.classList).toContain('working');
  });
});
