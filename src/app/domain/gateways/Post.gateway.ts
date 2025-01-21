import { Observable } from "rxjs";
import { Post } from "../interfaces/Post.interface";

export abstract class PostGateway {
    abstract getPost(id: number): Observable<Post>;
    abstract getPostSubject(): Observable<Post>;
    abstract setPostSubject(post: Post): void;
}