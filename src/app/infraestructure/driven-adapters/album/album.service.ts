import { Injectable } from '@angular/core';
import { AlbumGateway } from '../../../domain/models/Album/gateway/album.gateway';
import { Observable } from 'rxjs';
import { Album } from '../../../domain/models/Album/album.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlbumService extends AlbumGateway {
  
  private urlApi = 'https://jsonplaceholder.typicode.com/albums/';

  constructor(private httpClient: HttpClient) {
    super();
  }

  getByID(id: String): Observable<Album> {
    return this.httpClient.get<Album>(this.urlApi + id).pipe((res) => res);
  }

  getAll(): Observable<Array<Album>> {
    console.log('3 paso desde el servico ');
    return this.httpClient.get<Array<Album>>(this.urlApi).pipe((res) => res);
  }

  saveNew(_alb: Album): Observable<void> {
    throw new Error('Method not implemented.');
  }
  
}
