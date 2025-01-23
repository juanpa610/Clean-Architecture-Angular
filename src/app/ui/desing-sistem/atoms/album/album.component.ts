import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Album } from '../../../../domain/models/Album/album.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-album',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit, OnChanges {
  @Input() album!: Album;
  @Output() delete = new EventEmitter<Album>();

  constructor() { }

  ngOnInit(): void {
    // console.log('Album initialized:', this.album);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes);
    // if (changes['album']) {
    //   // this.updateAlbum(changes['album'].currentValue);
    // }
  }

  deleteAlbum(alb: Album): void {
    const album: Album = {
      id: alb.id,
      userId: alb.userId,
      title: alb.title
    }
    this.delete.emit(alb);
  }
}
