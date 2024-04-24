import { Component,OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { Artists, Albums } from '../models';
import { MusicService } from '../musicService';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})


export class HomeComponent implements OnInit {
  albums!: Albums[];
  artists!: Artists[];

  constructor(private musicService: MusicService,){}

  ngOnInit() {
    this.getAlbums();
    this.getArtists();
  }

  getArtists(){
    this.musicService.getArtists().subscribe((data) => 
      {
        this.artists = data;
      })
  }

  getAlbums(){
    this.musicService.getAlbums().subscribe((data) =>
      {
        this.albums = data;
      })
  }
}
