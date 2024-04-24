import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Songs } from '../models';
import { AppComponent } from '../app.component';
import { MusicService } from '../musicService';
import { Artists } from '../models';


@Component({
  selector: 'app-artist',
  standalone: true,
  imports: [
    RouterModule, 
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule
  ],
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})

export class ArtistComponent implements OnInit{
  artist!: Artists;
  songs!: Songs[];
  playButton!: boolean;

  constructor(private route: ActivatedRoute, 
    public appComponent: AppComponent,
    private musicService: MusicService
  ) { }

  ngOnInit() {
    this.getArtist(Number(this.route.snapshot.paramMap.get('artistId')!));
    this.getArtistSongs(Number(this.route.snapshot.paramMap.get('artistId')!));
  }

  getArtist(id: Number){
    this.musicService.getArtist(id).subscribe((data: Artists) => {
      this.artist = data;
    })
  }

  getArtistSongs(id: Number){
    this.musicService.getArtistSongs(id).subscribe((data: Songs[])=> {
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
