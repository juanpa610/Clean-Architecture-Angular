import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumListComponent } from './album-list.component';
import { AlbumUseCases } from '../../../application/album/useCases/almbun-use-cases';
import { AlbumGateway } from '../../../domain/gateways/album.gateway';
import { AlbumService } from '../../../infraestructure/driven-adapters/album/album.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PostGateway } from '../../../domain/gateways/Post.gateway';
import { PostService } from '../../../infraestructure/driven-adapters/post/post.service';

describe('AlbumListComponent', () => {
  let component: AlbumListComponent;
  let fixture: ComponentFixture<AlbumListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlbumListComponent, HttpClientTestingModule],
      providers: [
        AlbumUseCases,
        { provide: AlbumGateway, useClass: AlbumService },
        { provide: PostGateway, useClass: PostService },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlbumListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
