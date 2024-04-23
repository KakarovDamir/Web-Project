import { Component, OnInit } from '@angular/core';
import { PlayList } from '../models';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { POSTS3 } from '../fake-db2';
import { AppComponent } from '../app.component';
import { Songs } from '../models';
import { POSTS4 } from '../fake-db3';

@Component({
  selector: 'app-pl-album',
  standalone: true,
  imports: [CommonModule, RouterModule,FormsModule],
  templateUrl: './pl-album.component.html',
  styleUrl: './pl-album.component.css'
})
export class PlAlbumComponent implements OnInit {
  playlist!: PlayList;
  songs!: Songs[];
  playButton!: boolean;

  constructor(private route: ActivatedRoute, public appComponent: AppComponent) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const playlistTitle = params.get('playlistTitle');
      this.playlist = POSTS4.find((playlist) => playlist.title == playlistTitle) as PlayList;
    })

    this.route.paramMap.subscribe((params) => {
      let playlistTitle = params.get('playlistTitle');
      if (playlistTitle?.toLowerCase() == 'liked songs') {
        this.songs = POSTS3.filter((song) => song.liked == true) as Songs[];
      }
      else{
        this.songs = POSTS3.filter((song) => song.playlist_title == playlistTitle) as Songs[];
      }
    })
  }

  playSong(id: Number) {
    this.appComponent.getId(id);
    if(this.playButton == false){
      this.playButton = true;
    }
    else{
      this.appComponent.pause();
      this.playButton = false;
    }
  }
}
