import {MockBuilder, MockedComponentFixture, MockRender} from "ng-mocks";
import {SidebarComponent} from "./sidebar.component";
import {SharedModule} from "../shared.module";
import {DebugElement} from "@angular/core";
import {IMenu} from "../../interfaces/IMenu";

describe('SidebarComponent', function () {
  let fixture: MockedComponentFixture<SidebarComponent>;
  let component: SidebarComponent;
  let debugElement: DebugElement;

  beforeEach(() => MockBuilder(SidebarComponent, SharedModule));
  beforeEach(() => {
    fixture = MockRender(SidebarComponent);
    component = fixture.point.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('should render target component', function () {
    expect(component).toBeTruthy();
  });

  it('should render menu item in the view', function () {
    const menu:IMenu[] = [
      {
        title: 'test title',
        icon: 'test-icon',
        subMenuItems: []
      }
    ];
    component["menuItems"] = menu;
    fixture.detectChanges();
    const menuItems = debugElement.nativeElement.querySelectorAll('.menuItems');
    const icon = menuItems[0].querySelector('i');
    const title = menuItems[0].querySelector('.menu-item-title');
    const itemsCount = menuItems[0].querySelector('.menu-items-count');

    expect(menuItems.length).toBe(1);
    expect(icon.className).toBe('test-icon');
    expect(title.textContent).toContain('test title');
    expect(itemsCount.textContent).toBe('0');
  });

  it('should render submenu item in the view', function () {
    const menu:IMenu[] = [
      {
        title: 'test',
        icon: 'test',
        subMenuItems: [
          {
            title: 'submenu 1',
            path: '/'
          }
        ]
      }
    ];
    component["menuItems"] = menu;
    fixture.detectChanges();
    const subMenu = debugElement.nativeElement.querySelector('.menuItems > ul');
    const li_Items = subMenu.querySelectorAll('li');
    const a_item = li_Items[0].querySelector('a');

    expect(li_Items.length).toBe(1);
    expect(a_item.textContent).toContain('submenu 1');
  });

});
