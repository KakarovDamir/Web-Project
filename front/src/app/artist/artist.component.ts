import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Artists, POSTS2 } from '../models';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Songs } from '../models';
import { POSTS3 } from '../fake-db2';

@Component({
  selector: 'app-artist',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit{
  artist!: Artists;
  songs!: Songs[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const artistName = params.get('artistName');
      this.artist = POSTS2.find((artist) => artist.name == artistName) as Artists;
    })

    this.route.paramMap.subscribe((params) => {
      const artistName = params.get('artistName');
      this.songs = POSTS3.filter((artist) => artist.artist_name == artistName) as Songs[];
    })
  }


  playSong(song: Songs){
    const audioElements = document.querySelectorAll('audio');
    
    audioElements.forEach((audio: HTMLAudioElement) => {
      audio.pause();
      audio.currentTime = 0;
    });

    const audioElement = document.querySelector(`audio[src="${song.path}"]`);
    if (audioElement) {
      audioElement;
    }
  }

}
