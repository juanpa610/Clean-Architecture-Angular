import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { Album } from '../../../domain/models/Album/album.model';
import { TestBed } from '@angular/core/testing';

import { AlbumService } from './album.service';
describe('AlbumService', () => {
  let service: AlbumService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AlbumService],
    });
    service = TestBed.inject(AlbumService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch an album by ID', () => {
    const mockAlbum: Album = { userId: 1, id: 1, title: 'Test Album' };

    service.getByID(1).subscribe((album) => {
      expect(album).toEqual(mockAlbum);
    });

    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/albums/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockAlbum);
  });


  it('should fetch all albums', () => {
    const mockAlbums: Album[] = [
      { userId: 1, id: 1, title: 'Album 1' },
      { userId: 1, id: 2, title: 'Album 2' },
    ];

    service.getAll().subscribe((albums) => {
      expect(albums.length).toBe(2);
      expect(albums).toEqual(mockAlbums);
    });

    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/albums/');
    expect(req.request.method).toBe('GET');
    req.flush(mockAlbums);
  });

  it('should throw an error when saveNew is called', () => {
    expect(() => service.saveNew({ userId: 1, id: 1, title: 'New Album' })).toThrowError('Method not implemented.');
  });

  it('should handle HTTP errors for getByID', () => {
    const errorMessage = '404 Not Found';

    service.getByID(1).subscribe(
      () => fail('Expected an error, but got a response'),
      (error) => {
        expect(error.status).toBe(404);
        expect(error.statusText).toBe('Not Found');
      }
    );

    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/albums/1');
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });
});
