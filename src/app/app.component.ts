import { Component, OnInit } from '@angular/core';
import { Album } from './domain/models/Album/album.model';
import { AlbumUseCases } from './domain/useCases/almbun-use-cases';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [RouterOutlet],
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  albums: Array<Album> = [];

  constructor(private albumUseCases: AlbumUseCases ) {
    console.log('primer paso desde el componete ');
    this.albumUseCases.getAllAlbum().subscribe( (albums: Album[]) => {
      this.albums = albums;
      
    });
  }

  ngOnInit(): void {
  }

}
