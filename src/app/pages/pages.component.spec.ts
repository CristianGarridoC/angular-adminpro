import {MockBuilder, MockedComponentFixture, MockRender, ngMocks} from "ng-mocks";
import {PagesComponent} from "./pages.component";
import {PagesModule} from "./pages.module";
import {SettingsService} from "../services/settings.service";
import {HeaderComponent} from "../shared/header/header.component";
import {SidebarComponent} from "../shared/sidebar/sidebar.component";
import {BreadcrumbsComponent} from "../shared/breadcrumbs/breadcrumbs.component";

describe('PagesComponent', () => {
  let fixture: MockedComponentFixture<PagesComponent>;
  let component: PagesComponent;
  let service: SettingsService;

  beforeAll(() => {
    //In order to be able to override the spy in the window methods you have to declare theses in the object as jasmine.createSpy
    Object.defineProperty(window, 'customInitFunction', {
      value: jasmine.createSpy(),
      writable: true,
      configurable: true
    });
  });
  beforeEach(() => MockBuilder(PagesComponent, PagesModule));
  beforeEach(() => {
    fixture = MockRender(PagesComponent);
    component = fixture.point.componentInstance;
    service = ngMocks.findInstance(SettingsService);
  });
  afterAll(() => {
    //when you define a property in the global window object you have to delete it, if not it can affect the other tests
    delete (window as any).customInitFunction;
  });

  it('should render the target component with its children components', function () {
    const appHeader = ngMocks.findInstance(HeaderComponent);
    const appSidebar = ngMocks.findInstance(SidebarComponent);
    const appBreadCrumbs = ngMocks.findInstance(BreadcrumbsComponent);
    expect(component).toBeTruthy();
    expect(appHeader).toBeTruthy();
    expect(appSidebar).toBeTruthy();
    expect(appBreadCrumbs).toBeTruthy();
  });

  it('should set the default theme provided by the service', function () {
    spyOn(service, 'setLinkTheme');
    component.ngOnInit();
    expect(service.setLinkTheme).toHaveBeenCalled();
    expect((window as any).customInitFunction).toHaveBeenCalled();
  });
});
