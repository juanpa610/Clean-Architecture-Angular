import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Album } from '../../../domain/models/Album/album.model';
import { HttpClient } from '@angular/common/http';
import { AlbumGateway } from '../../../domain/gateways/album.gateway';

@Injectable({
  providedIn: 'root'
})
export class AlbumService extends AlbumGateway {
  
  private urlApi = 'https://jsonplaceholder.typicode.com/albums/';

  constructor(private httpClient: HttpClient) {
    super();
  }

  getByID(id: number): Observable<Album> {
    return this.httpClient.get<Album>(this.urlApi + id).pipe((res) => res);
  }

  getAll(): Observable<Array<Album>> {
    return this.httpClient.get<Array<Album>>(this.urlApi).pipe((res) => res);
  }

  saveNew(_alb: Album): Observable<void> {
    throw new Error('Method not implemented.');
  }
}
