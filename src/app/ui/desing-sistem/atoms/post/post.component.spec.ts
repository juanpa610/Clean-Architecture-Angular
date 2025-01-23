import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostComponent } from './post.component';
import { PostUseCases } from '../../../../application/Post/almbun-use-cases';
import { PostGateway } from '../../../../domain/gateways/Post.gateway';
import { PostService } from '../../../../infraestructure/driven-adapters/post/post.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { Post } from '../../../../domain/interfaces/Post.interface';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  let spyPostUseCases: jasmine.SpyObj<PostUseCases>;

  const mockPost: Post = { id: 1, userId: 1, title: 'Test Post', body: 'Test Body' };
  beforeEach(async () => {
    spyPostUseCases = jasmine.createSpyObj('PostUseCases', ['getPost', 'setPostSubject']);

    spyPostUseCases.getPost.and.returnValue(of(mockPost));

    await TestBed.configureTestingModule({
      imports: [PostComponent, HttpClientTestingModule],
      providers: [
        PostUseCases,
        { provide: PostGateway, useClass: PostService },
        { provide: PostUseCases, useValue: spyPostUseCases },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should call getPost on OnInit ', () => {

    component.ngOnInit();
    expect(spyPostUseCases.getPost).toHaveBeenCalled();
    component.subjectPost$.subscribe((post) => {
      expect(post).toEqual(mockPost);
    });
  });

  it('should set hasError to true if getPost is failed ', () => {
    spyPostUseCases.getPost.and.returnValue(throwError(() => new Error('Test Error')));
    fixture.detectChanges();
    component.ngOnInit();

    expect(component.hasError).toBeTrue();
  });

  it('should send 0 as id on changePost', () => {
    const mockPost: Post = { id: 11, userId: 1, title: 'Test', body: 'Test' };
    spyPostUseCases.getPost.and.returnValue(of(mockPost));

    fixture.detectChanges();

    component.subjectPost$.subscribe((post) => {
      expect(post).toEqual(mockPost);
    });

    spyOn(Math, 'random').and.returnValue(0);

    component.changePost();

    expect(spyPostUseCases.getPost).toHaveBeenCalledWith(11);
  });

  it('should send 11 as parameter id in getPost in changePost', () => {
    const mockPost: Post = { id: 1, userId: 1, title: 'Test', body: 'Test' };
    spyPostUseCases.getPost.and.returnValue(of(mockPost));

    spyOn(Math, 'floor').and.returnValue(2);

    component.changePost();
    fixture.detectChanges();

    expect(spyPostUseCases.getPost).toHaveBeenCalledWith(2);
  });

});
