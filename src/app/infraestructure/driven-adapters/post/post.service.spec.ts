import { TestBed } from '@angular/core/testing';

import { PostService } from './post.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Post } from '../../../domain/interfaces/Post.interface';
import { Subject } from 'rxjs';

describe('PostService', () => {
  let service: PostService;
  let httpMock: HttpTestingController;
  let mockUrlApi: string = 'https://jsonplaceholder.typicode.com/';


  beforeEach(() => {
    // postSubject = new Subject<Post>();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostService]
    });
    service = TestBed.inject(PostService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    TestBed.resetTestingModule();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch posts by ID ', () => {
    const mockPost : Post = {
      userId: 1,
      id: 1,
      title: 'Test Post',
      body: 'Test Body'
    };

    service.getPost(1).subscribe( (post : Post) => {
      expect(post).toEqual(mockPost);
    })

    const mockSpy = httpMock.expectOne(`${mockUrlApi}posts/1`);

    expect(mockSpy.request.method).toBe('GET');
    mockSpy.flush(mockPost);
    httpMock.verify();
  });

  it('should fetch post subject save post', () => {
    const testValue: Post = {
      userId: 1,
      id: 1,
      title: 'Test Post',
      body: 'Test Body'
    };

    // spyOn(mockSpy, 'next').and.callThrough();

    service.getPostSubject().subscribe((value) => {
      expect(value).toBe(testValue);
    });

    service.setPostSubject(testValue);
  });

  it('should fetch post subjectPost', () => {
    const testValue: Post = {
      userId: 1,
      id: 1,
      title: 'Test Post',
      body: 'Test Body'
    };

    const mockSpy = spyOn(service['post'], 'next')

    service.setPostSubject(testValue);

    expect(mockSpy).toHaveBeenCalled();
    expect(mockSpy).toHaveBeenCalledWith(testValue);
  });

});
