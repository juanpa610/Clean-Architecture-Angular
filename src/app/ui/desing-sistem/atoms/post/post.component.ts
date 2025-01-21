import { Component, inject, OnInit } from '@angular/core';
import { PostUseCases } from '../../../../application/Post/almbun-use-cases';
import { CommonModule } from '@angular/common';
import { catchError, Observable } from 'rxjs';
import { Post } from '../../../../domain/interfaces/Post.interface';
import { post } from 'aws-amplify/api';

@Component({
  selector: 'app-post',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit {

  hasError: boolean = false;

  private postUseCases = inject(PostUseCases);
  // post$: Observable<Post> = this.postUseCases.getPost(1);
  post$!: Observable<Post>;
  // subjectPost$: Observable<Post> = this.postUseCases.getPostSubject();
  subjectPost$!: Observable<Post>;

  ngOnInit(): void {
    this.subjectPost$ = this.postUseCases.getPost(1).pipe(
      result => {
        return result;
      },
      catchError(error => {
        console.error(error);
        this.hasError = true;
        throw new Error(error);
      }
    ));
  }

  changePost() {
    const mockId = Math.floor(Math.random() * 10);
    const resultPromisePost$ = this.postUseCases.getPost(mockId == 0 ? 11 : mockId ).pipe();
    this.subjectPost$ = resultPromisePost$;
    resultPromisePost$.subscribe((post) => {
      this.postUseCases.setPostSubject(post);
    });
  }

}