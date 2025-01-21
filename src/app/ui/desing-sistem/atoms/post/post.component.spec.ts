import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostComponent } from './post.component';
import { PostUseCases } from '../../../../application/Post/almbun-use-cases';
import { PostGateway } from '../../../../domain/gateways/Post.gateway';
import { PostService } from '../../../../infraestructure/driven-adapters/post/post.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostComponent, HttpClientTestingModule],
      providers: [
        PostUseCases,
        { provide: PostGateway, useClass: PostService },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
