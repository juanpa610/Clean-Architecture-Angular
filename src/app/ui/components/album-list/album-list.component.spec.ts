import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumListComponent } from './album-list.component';
import { AlbumUseCases } from '../../../application/album/useCases/almbun-use-cases';
import { AlbumGateway } from '../../../domain/gateways/album.gateway';
import { AlbumService } from '../../../infraestructure/driven-adapters/album/album.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PostGateway } from '../../../domain/gateways/Post.gateway';
import { PostService } from '../../../infraestructure/driven-adapters/post/post.service';
import { Observable, of } from 'rxjs';
import { Album } from '../../../domain/models/Album/album.model';
import { AuthService } from '../../../infraestructure/driven-adapters/auth/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { ApiResponse } from '../../../domain/interfaces/response.interface';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

fdescribe('AlbumListComponent', () => {
  let dummyAlbumsResponse: ApiResponse<Album[]> = {
    status: 200,
    message: 'Album retrieved successfully',
    data: [
      { userId: 1, id: 1, title: "quidem molest " },
      { userId: 1, id: 2, title: "sunt qui exger" },
      { userId: 1, id: 3, title: "omnis laborum " },
      { userId: 1, id: 4, title: "non esse culpa" },
      { userId: 1, id: 5, title: "eaque aut omni" }
    ],
    metadata: {
      timestamp: new Date(),
      path: ''
    }
  };

  let component: AlbumListComponent;
  let fixture: ComponentFixture<AlbumListComponent>;
  let useCaseSpy: jasmine.SpyObj<AlbumUseCases>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let router: Router;
  let navigateSpy: jasmine.Spy;

  beforeEach(async () => {
    useCaseSpy = jasmine.createSpyObj('AlbumUseCases', ['getAlbumById', 'getAllAlbum']);
    authServiceSpy = jasmine.createSpyObj('AuthService', ['signIn', 'getCurrentSession', 'getCurrentUser']);

    // useCaseSpy.getAllAlbum.and.returnValue(of(dummyAlbumsResponse));

    await TestBed.configureTestingModule({
      imports: [AlbumListComponent, HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      providers: [
        AlbumUseCases,
        { provide: AlbumUseCases, useValue: useCaseSpy },
        { provide: AlbumGateway, useClass: AlbumService },
        { provide: PostGateway, useClass: PostService },
        { provide: AuthService, useValue: authServiceSpy },
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
    navigateSpy = spyOn(router, 'navigate');

    fixture = TestBed.createComponent(AlbumListComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should get all albums in ngOnInit ', () => {
    useCaseSpy.getAllAlbum.and.returnValue(of(dummyAlbumsResponse));

    component.ngOnInit();

    expect(component.albums.length).toBe(5);
    expect(component.albums).toEqual(dummyAlbumsResponse.data);
  });

  xit('should get album by id ', () => {
    let dummyAlbumResponse: ApiResponse<Album> = {
      status: 200,
      message: 'Album retrieved successfully',
      data: { userId: 1, id: 1, title: "quidem molest " },
      metadata: {
        timestamp: new Date(),
        path: ''
      }
    };

    useCaseSpy.getAlbumById.and.returnValue(of(dummyAlbumResponse));

    let album = component.getAlbumById(1);

    expect(album.id).toBe(dummyAlbumResponse.data.id);
    expect(album).toEqual(dummyAlbumResponse.data);
  });

  it('should render album cards for each album', () => {
    useCaseSpy.getAllAlbum.and.returnValue(of(dummyAlbumsResponse));

    fixture.detectChanges();

    const albumCards = fixture.debugElement.queryAll(By.css('[data-test-id="album-card"]'));
    albumCards.forEach((card, index) => {
      const albumTitle = card.query(By.css('[data-test-id="album-title"]'));
      expect(albumTitle.nativeElement.textContent).toEqual(dummyAlbumsResponse.data[index].title);
    });

    expect(albumCards.length).toBe(5);
  });

});
