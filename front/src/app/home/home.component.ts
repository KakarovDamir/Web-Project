import { Component,OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { Artists, Albums } from '../models';
import { MusicService } from '../musicService';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})


export class HomeComponent implements OnInit {
  albums!: Albums[];
  artists!: Artists[];
  logged: boolean = false;
  username: string = "";
  password: string = "";

  constructor(private musicService: MusicService,){}

  ngOnInit() {
    const access = localStorage.getItem("access");
    if(access){
      this.logged = true;
      this.getAlbums();
      this.getArtists();
    }
  }

  login(){
    this.musicService.login(this.username, this.password).subscribe((data) => {
      this.logged = true;
      localStorage.setItem("access", String(data.access));
      localStorage.setItem("refresh", String(data.refresh));
      this.getAlbums();
      this.getArtists();
    })
  }

  logout(){
    this.logged = false;
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
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
