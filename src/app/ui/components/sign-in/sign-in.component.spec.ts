import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInComponent } from './sign-in.component';
import { AuthService } from '../../../infraestructure/driven-adapters/auth/auth.service';
import { Router } from '@angular/router';
import { signOut } from 'aws-amplify/auth';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  const mockSignInService = jasmine.createSpyObj('AuthService', ['signIn', 'getCurrentSession', 'getCurrentUser']);
  const route = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignInComponent],
      providers: [
        { provide: AuthService, useValue: mockSignInService },
        { provide: Router, useValue: route },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fire required field validation for UserName', () => {
    component.signInForm.controls['userName'].setValue('');
    expect(component.signInForm.controls['userName'].valid).toBeFalsy();
  });

  it('should not proceed if form is invalid', async () => {
    component.signInForm.setValue({
      userName: '',
      password: '',
    });

    await component.onSubmit(); 
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.signInForm.valid).toBeFalsy();
    expect(mockSignInService.signIn).not.toHaveBeenCalled();
    expect(component.isLoading).toBe(false);
  });

  it('should fire minlength 8 characters validation for Password', async () => {
    component.signInForm.setValue({
      userName: 'juanja',
      password: 'juan',
    });

    const mockIsSignedIn = { isSignedIn: false };
    mockSignInService.signIn.and.returnValue(Promise.resolve(mockIsSignedIn));

    await component.onSubmit();
    await fixture.whenStable();
    
    fixture.detectChanges();

    const controlPasswordForm = component.signInForm.controls['password'];
    expect(controlPasswordForm.status).toEqual('INVALID');
    expect(controlPasswordForm.errors?.["minlength"].requiredLength).toEqual(8);
  });

  it('should fire required fields validation for form', async () => {
    component.signInForm.controls['userName'].setValue('');
    component.signInForm.controls['password'].setValue('');

    await component.onSubmit();
    fixture.detectChanges();

    await fixture.whenStable();

    expect(component.signInForm.valid).toBeFalsy();
  });

  it('should fire required fields validation for FORM', async () => {
    component.signInForm.controls['userName'].setValue('jaramilloorregojuanpablo@gmail.com');
    component.signInForm.controls['password'].setValue('juanjara');

    await component.onSubmit();
    fixture.detectChanges();

    await fixture.whenStable();

    expect(component.signInForm.valid).toBeTruthy();
  });

  it('debería navegar a "list-albums" si el usuario está autenticado', async () => {
    component.signInForm.setValue({
      userName: 'name test user',
      password: 'test password',
    });

    const mockUser = { isSignedIn: true };
    mockSignInService.signIn.and.returnValue(Promise.resolve(mockUser));

    mockSignInService.getCurrentSession.and.returnValue(Promise.resolve('mockIdToken no calledd'));
    mockSignInService.getCurrentUser.and.returnValue(Promise.resolve({
      username: 'name Test user',
      userId: '12345',
    }));

    const setDataAutoSignInSpy = spyOn(component, 'setDataAutoSignIn').and.callThrough();

    await component.onSubmit();
    fixture.detectChanges();

    expect(route.navigate).toHaveBeenCalledWith(['list-albums']);
    expect(component.isLoading).toBe(false);
    expect(setDataAutoSignInSpy).toHaveBeenCalled();
  });

  it('debería guardar datos en sessionStorage si el usuario está autenticaro', async () => {
    component.signInForm.setValue({
      userName: 'name test user',
      password: 'test password',
    });

    spyOn(window, 'alert');

    const mockUser = { isSignedIn: true };
    mockSignInService.signIn.and.returnValue(Promise.resolve(mockUser));

    mockSignInService.getCurrentSession.and.returnValue(Promise.resolve('mockIdToken'));
    mockSignInService.getCurrentUser.and.returnValue(Promise.resolve({
      username: 'testuser',
      userId: '12345',
    }));

    const setDataAutoSignInSpy = spyOn(component, 'setDataAutoSignIn').and.callThrough();

    fixture.detectChanges();

    await component.onSubmit();

    await fixture.whenStable();

    expect(setDataAutoSignInSpy).toHaveBeenCalled();

    expect(sessionStorage.getItem('current_session_token')).toBeTruthy();
    expect(sessionStorage.getItem('current_user_id')).toBeTruthy();
    expect(sessionStorage.getItem('current_user_name')).toBeTruthy();

    expect(window.alert).toHaveBeenCalledWith('Logueado exitosamente.');
  });


  it('Should handle errors if service method signIn fail', async () => {
    component.signInForm.setValue({
      userName: 'name test user',
      password: 'test password',
    });

    mockSignInService.signIn.and.returnValue(Promise.reject('Error en getCurrentSession'));
    spyOn(console, 'error');

    await component.onSubmit();

    expect(console.error).toHaveBeenCalledWith('Error en getCurrentSession');
  });

});
