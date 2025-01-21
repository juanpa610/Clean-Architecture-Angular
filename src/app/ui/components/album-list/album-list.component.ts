import { Component, inject } from '@angular/core';
import { Album } from '../../../domain/models/Album/album.model';
import { AlbumUseCases } from '../../../application/album/useCases/almbun-use-cases';
import { AuthService } from '../../../infraestructure/driven-adapters/auth/auth.service';
import { Router, } from '@angular/router';
import { PostComponent } from '../../desing-sistem/atoms/post/post.component';
import { PostUseCases } from '../../../application/Post/almbun-use-cases';
import { Post } from '../../../domain/interfaces/Post.interface';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AlbumComponent } from "../../desing-sistem/atoms/album/album.component";

@Component({
  selector: 'app-album-list',
  imports: [PostComponent, CommonModule, AlbumComponent],
  standalone: true,
  templateUrl: './album-list.component.html',
  styleUrl: './album-list.component.scss'
})
export class AlbumListComponent {

  private postUseCases = inject(PostUseCases);
  albums: Array<Album> = [];
  subjectPost$: Observable<Post> = this.postUseCases.getPostSubject();

  constructor(private albumUseCases: AlbumUseCases, private authService: AuthService, private route: Router) {
    this.albumUseCases.getAlbumById(2).subscribe((albums) => {
      // console.log(albums)
    });
    this.albumUseCases.getAllAlbum().subscribe((albums) => {
      console.log(albums);
      this.albums = albums.data;
    });
  }

  ngOnInit(): void {
  }

  async signOut() {
    await this.authService.signOut();
    this.route.navigate(['sign-in']);
  }

  deleteAlbum($event: Album) {
    let album : Album = $event;
    let indexOfAlbum = this.albums.findIndex( album => album.id === $event.id);
    
    if (indexOfAlbum === -1) {
      return;
    }
    this.albums.splice(indexOfAlbum, 1);

    // this.albums = this.albums.filter((album) => album.id !== $event.id);
  }
}
