import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Songs,Albums } from '../models';
import { AppComponent } from '../app.component';
import { MusicService } from '../musicService';


@Component({
  selector: 'app-album',
  standalone: true,
  imports: [
    RouterModule, 
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule
  ],
  templateUrl: './album.component.html',
  styleUrl: './album.component.css'
})

export class AlbumComponent implements OnInit {
  album!: Albums;
  songs!: Songs[];
  playButton!: boolean;

  constructor(
    private route: ActivatedRoute, 
    public appComponent: AppComponent,
    private musicService: MusicService
  ) { }

  ngOnInit() {
    this.playButton = true;

    this.getAlbum(Number(this.route.snapshot.paramMap.get('albumId')!));
    this.getAlbumSongs(Number(this.route.snapshot.paramMap.get('albumId')!));
  }

  getAlbum(id: Number) {
    this.musicService.getAlbum(id).subscribe((data: Albums) => {
      this.album = data;
    })
  }

  getAlbumSongs(id: Number) {
    this.musicService.getAlbumSongs(id).subscribe((data: Songs[])=> {
      this.songs = data;
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
