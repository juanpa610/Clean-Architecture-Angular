import { Component } from '@angular/core';
import { Album } from '../../../domain/models/Album/album.model';
import { AlbumUseCases } from '../../../application/album/useCases/almbun-use-cases';

@Component({
  selector: 'app-album-list',
  standalone: true,
  templateUrl: './album-list.component.html',
  styleUrl: './album-list.component.scss'
})
export class AlbumListComponent {
  albums: Array<Album> = [];

  constructor(private albumUseCases: AlbumUseCases) {
    this.albumUseCases.getAlbumById(2).subscribe((albums) => {
      console.log(albums)

    });
    this.albumUseCases.getAllAlbum().subscribe((albums) => {
      console.log(albums);
      this.albums = albums.data;
    });
  }

  ngOnInit(): void {
  }
}
