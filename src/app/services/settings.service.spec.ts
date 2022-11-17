import {SettingsService} from "./settings.service";
import anything = jasmine.anything;
import {MockProvider, MockService} from "ng-mocks";

describe('SettingsService', () => {
  let sut: SettingsService;

  beforeEach(() => {
    sut = new SettingsService();
  });

  it('should defaultTheme getter return default theme value when local storage is null', () => {
    spyOn(localStorage, 'getItem').withArgs('app-theme').and.returnValue(null);
    const result = sut.defaultTheme;
    expect(result).toBe('purple-dark');
    expect(localStorage.getItem).toHaveBeenCalledOnceWith('app-theme');
  });

  it('should defaultTheme getter return the current value from local storage when it has a valid value', () => {
    spyOn(localStorage, 'getItem').withArgs('app-theme').and.returnValue('test-theme');
    const result = sut.defaultTheme;
    expect(result).toBe('test-theme');
    expect(localStorage.getItem).toHaveBeenCalledOnceWith('app-theme');
  });

  it('should save theme in local storage successfully', () => {
    const theme = 'test';
    const htmlLink = MockService(HTMLLinkElement);
    spyOn(document, 'querySelector').withArgs('#app-theme').and.returnValue(htmlLink);
    //TODO: Create a HTMLService to be able to mock the document and not create multiple instances of settings in each test
    sut = new SettingsService();

    const spy = spyOnProperty(htmlLink, 'href', 'set').and.callThrough();
    spyOn(localStorage, 'setItem').withArgs('app-theme', anything());
    spyOn(localStorage, 'getItem').withArgs('app-theme').and.returnValue(theme);

    sut.saveThemeInLocalStorage(theme);

    expect(htmlLink.href).toBe(`./assets/css/colors/${theme}.css`);
    expect(localStorage.setItem).toHaveBeenCalledOnceWith('app-theme', anything());
    expect(localStorage.getItem).toHaveBeenCalledOnceWith('app-theme');
    expect(spy).toHaveBeenCalled();
    //expect((sut as any).linkTheme.href).toBe(`./assets/css/colors/${theme}.css`); //Accessing to private property WORKS!!
  });

  it('should not modify the global style if not exist in the current context', function () {
    sut.setLinkTheme()
    expect((sut as any).linkTheme).toBeNull();
  });
});
