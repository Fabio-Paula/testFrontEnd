import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change data inputs', () => {
    const spy = jest.spyOn(component, 'sendDataLogin');
    component.sendDataLogin();
    expect(spy).toHaveBeenCalled();
  });

  it('should reveal password', () => {
    const spy = jest.spyOn(component, 'handleRevealPassword');
    component.handleRevealPassword();
    expect(spy).toHaveBeenCalled();
  });

  it('should correctly handle valid login credentials', () => {
    component.username = 'testuser';
    component.password = '123';

    component.sendDataLogin();

    expect(localStorage.getItem('login'));
  });

  it('should correctly handle invalid login credentials', () => {
    component.username = 'test';
    component.password = '123456';

    component.sendDataLogin();

    expect(!localStorage.getItem('login'));
  });
});
