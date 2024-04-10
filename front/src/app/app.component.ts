import { Component, OnInit, numberAttribute } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';  
import { Songs } from './models';
import { POSTS3 } from './fake-db2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, HomeComponent,CommonModule, FormsModule, ReactiveFormsModule ],
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
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.audioPlayer = document.getElementById('audioPlayer') as HTMLAudioElement;
    this.audioPlayer.load();
    this.id = 7;
    this.songs = POSTS3;
    this.playButton = true;

    this.route.paramMap.subscribe((params) => {
      this.song = POSTS3.find((song) => song.id == this.id) as Songs;
    })

    this.audioPlayer.addEventListener('ended', () => {
      this.nextSong();
      this.playButton = true;
    });

    this.audioPlayer.addEventListener('timeupdate', () => {
      this.currentTime = this.audioPlayer.currentTime;
    });
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
      this.id = POSTS3.length;
    }
    else {
      this.id = this.id - 1;
    }
    this.song = POSTS3.find((song) => song.id == this.id) as Songs;
  }

  nextSong() {
    if (this.id == POSTS3.length) {
      this.id = 1;
    }
    else {
      this.id = this.id + 1;
    }
    this.song= POSTS3.find((song) => song.id == this.id) as Songs;
  }

  getId(ID: Number){
    this.route.paramMap.subscribe((params) => {
      this.song = POSTS3.find((song) => song.id == ID) as Songs;
    })
    this.id = numberAttribute(ID);
  }
}
