import { Component } from '@angular/core';
import { Album } from '../../../domain/models/Album/album.model';
import { AlbumUseCases } from '../../../application/album/useCases/almbun-use-cases';
import { AuthService } from '../../../infraestructure/driven-adapters/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-album-list',
  standalone: true,
  templateUrl: './album-list.component.html',
  styleUrl: './album-list.component.scss'
})
export class AlbumListComponent {

  albums: Array<Album> = [];

  constructor(private albumUseCases: AlbumUseCases, private authService: AuthService, private route: Router) {
    this.albumUseCases.getAlbumById(2).subscribe((albums) => {
      // console.log(albums)
    });
    this.albumUseCases.getAllAlbum().subscribe((albums) => {
      // console.log(albums);
      this.albums = albums.data;
    });
  }

  ngOnInit(): void {
  }

  async signOut() {
    await this.authService.signOut();
    this.route.navigate(['sign-in']);
  }
}
