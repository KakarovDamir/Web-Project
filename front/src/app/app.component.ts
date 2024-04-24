import { Component, OnInit, numberAttribute } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MusicService } from './musicService';
import { HomeComponent } from './home/home.component';  
import { Songs } from './models';
import { PlaylistComponent } from './playlist/playlist.component';
import { PlAlbumComponent } from './pl-album/pl-album.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule, 
    HomeComponent,
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit{
  title = 'Music';
  songs!: Songs[];
  song!: Songs
  id!: number;
  audioPlayer!: HTMLAudioElement;
  playButton!: boolean;
  currentTime: number = 0;
  volume: number = 100;
  liked!: boolean;
  
  constructor(
    private route: ActivatedRoute,
    private musicService: MusicService,
  ) { }

  ngOnInit() {
    this.audioPlayer = document.getElementById('audioPlayer') as HTMLAudioElement;
    this.audioPlayer.load();
    this.id = 7;
    this.playButton = true;

    this.getSongs();
    this.getSong(this.id);

    this.audioPlayer.addEventListener('ended', () => {
      this.nextSong();
      this.playButton = true;
    });

    this.audioPlayer.addEventListener('timeupdate', () => {
      this.currentTime = this.audioPlayer.currentTime;
    });
  }

  getSongs() {
    this.musicService.getSongs().subscribe((songs: Songs[]) => {
      this.songs = songs;
      this.liked = this.song.liked;
    });
  }

  getSong(id: number){
    this.musicService.getSong(id).subscribe((song: Songs) => {
      this.song = song;
    });
    this.liked = this.song.liked;
  }

  seekTo(time: number) {
    this.audioPlayer.currentTime = time;
  }

  changeVolume(event: Event) {
    const target = event.target as HTMLInputElement;
    this.audioPlayer.volume = parseInt(target.value) / 100;
  }
  
  updateCurrentTime(event: Event) {
    const target = event.target as HTMLInputElement;
    this.seekTo(parseInt(target.value));
  }

  playMusic() {
    this.playButton = false;
    this.audioPlayer.play();
    setInterval(() => {
      this.currentTime = this.audioPlayer.currentTime;
    }, 1000);
  }

  pause() {
    this.audioPlayer.pause();
    this.playButton = true;
  }

  prevSong() {
    if (this.id == 1) {
      this.id = 19;
    }
    else {
      this.id = this.id - 1;
    }
    this.song = this.songs[this.id];
    this.liked = this.song.liked;
  }

  nextSong() {
    if (this.id == 19) {
      this.id = 1;
    }
    else {
      this.id = this.id + 1;
    }
    this.song = this.songs[this.id];
    this.liked = this.song.liked;
  }

  getId(ID: Number){
    this.song = this.songs[Number(ID)-1];
    this.liked = this.song.liked;
    this.id = numberAttribute(ID);
  }

  addLikedSong() {
    this.song.liked = !this.song.liked;
    this.liked = !this.liked;
    this.musicService.updateSong(this.song).subscribe(() => {
      this.getSongs();
    });
  }
}
