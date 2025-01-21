import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable, Subject } from 'rxjs';
import { Post } from '../../../domain/interfaces/Post.interface';
import { HttpClient } from '@angular/common/http';
import { PostGateway } from '../../../domain/gateways/Post.gateway';

@Injectable({
  providedIn: 'root'
})
export class PostService extends PostGateway {

  private post = new Subject<Post>();

  private urlApi = 'https://jsonplaceholder.typicode.com/';

  constructor(private httpClient: HttpClient) {
    super();
  }
  getPost(id: number): Observable<Post> {
    return this.httpClient.get<Post>(`${this.urlApi}posts/${id}`).pipe(delay(3000));
  }

  getPostSubject(): Observable<Post> {
    return this.post.asObservable();
  }

  setPostSubject(post: Post): void {
    this.post.next(post);
  }

}
