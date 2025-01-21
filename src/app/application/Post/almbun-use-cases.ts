import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostGateway } from '../../domain/gateways/Post.gateway';
import { Post } from '../../domain/interfaces/Post.interface';


@Injectable({
    providedIn: 'root'
})
export class PostUseCases {
    constructor(private _postGateWay: PostGateway) { }

    getPost(id: number): Observable<Post> {
        return this._postGateWay.getPost(id);
    }
    getPostSubject(): Observable<Post> {
        return this._postGateWay.getPostSubject();
    }
    setPostSubject(post: Post): void {
        this._postGateWay.setPostSubject(post);
    }
}

