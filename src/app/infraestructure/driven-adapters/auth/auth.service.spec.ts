import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SignInOutput } from 'aws-amplify/auth';


describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let authServiceSpy: jasmine.SpyObj<AuthService>;


  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['signUp', 'confirmSignUp', 'signIn', 'autoSignIn', 'getCurrentUser', 'getCurrentSession', 'getCurrentUser', 'signOut',]);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, {
        provide: AuthService,
        useValue: authServiceSpy
      }]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call the API amplify to sign in', async () => {
    let mockUserData = {
      userName: 'test',
      password: 'test'
    };

    const mockSignInOutput: SignInOutput = {
      isSignedIn: true,
      nextStep: {
        signInStep: 'DONE',
      }
    };
    authServiceSpy.signIn.and.returnValue(Promise.resolve(mockSignInOutput));

    let response = await service.signIn(mockUserData);

    expect(response).toEqual(mockSignInOutput);
    expect(authServiceSpy.signIn).toHaveBeenCalledWith(mockUserData);
  });

});
