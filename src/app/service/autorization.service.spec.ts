import { TestBed } from '@angular/core/testing';

import { autorizationService } from './autorization.service';

describe('AutorizationService', () => {
  let service: autorizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(autorizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set login in localStorage and redirect to /home', () => {
    // Mockando localStorage.setItem
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    // Criando um mock para window.location
    const originalLocation = window.location;

    // Define um mock para a propriedade href
    const locationMock = {
      ...originalLocation,
      href: '',
    };

    Object.defineProperty(window, 'location', {
      value: locationMock,
      writable: true,
    });

    // Chamar a função authorized
    service.authorized();

    // Verificar se localStorage.setItem foi chamado corretamente
    expect(setItemSpy).toHaveBeenCalledWith('login', 'true');

    // Verificar se window.location.href foi alterado
    expect(window.location.href).toBe('/home');

    // Restaurar a localização original
    Object.defineProperty(window, 'location', {
      value: originalLocation,
      writable: true,
    });
    
    setItemSpy.mockRestore();
  });

  it('should clear localStorage on logout', () => {
    const clearSpy = jest.spyOn(Storage.prototype, 'clear');

    service.logout();

    expect(clearSpy).toHaveBeenCalled();

    clearSpy.mockRestore();
  });
});
