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

  beforeEach(() => MockBuilder(PagesComponent, PagesModule));
  beforeEach(() => {
    fixture = MockRender(PagesComponent);
    component = fixture.point.componentInstance;
    service = ngMocks.findInstance(SettingsService);
  });

  it('should render the target component', function () {
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
  });
});
