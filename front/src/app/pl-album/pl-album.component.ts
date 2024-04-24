import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppComponent } from '../app.component';
import { Songs, PlayList } from '../models';
import { MusicService } from '../musicService';

@Component({
  selector: 'app-pl-album',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    FormsModule
  ],
  templateUrl: './pl-album.component.html',
  styleUrl: './pl-album.component.css'
})

export class PlAlbumComponent implements OnInit {
  playlist!: PlayList;
  songs!: Songs[];
  playButton!: boolean;

  allSongs!: Songs[];
  filteredItems: Songs[] = [];
  searchQuery: string = '';
  searched: boolean = false;
  arr: Number[] = [];

  constructor(
    private route: ActivatedRoute, 
    public appComponent: AppComponent,
    private musicService: MusicService
  ) { }

  ngOnInit(): void {
    this.getPlaylist(Number(this.route.snapshot.paramMap.get('playlistId')));
    this.getPlaylistSongs(Number(this.route.snapshot.paramMap.get('playlistId')));
    this.getAllSongs();
  }

  addtoPlaylist(song: Songs){
    let a = Number(this.route.snapshot.paramMap.get('playlistId'));
    this.arr = song.playlist;
    this.arr.push(a);
    song.playlist = this.arr;
    this.musicService.updateSong(song).subscribe((data)=>{
      this.getPlaylistSongs(Number(this.route.snapshot.paramMap.get('playlistId')));
    })
  }

  getAllSongs(){
    this.musicService.getSongs().subscribe((data: Songs[])=>{
      this.allSongs = data;
    })
  }

  getPlaylist(id: Number){
    this.musicService.getPlaylist(id).subscribe((data: PlayList) => {
      this.playlist = data;
    })
  }

  getPlaylistSongs(id: Number){
    if (id === 1){
      this.musicService.getSongs().subscribe((data: Songs[])=>{
        this.songs = data.filter(song=> song.liked === true);
      })
    }
    else{
      this.musicService.getPlaylistSongs(id).subscribe((data) => {
        this.songs = data;
      })
    }
  }

  search(): void {
    this.filteredItems = this.allSongs.filter(item => 
      item.title.toLowerCase().includes(this.searchQuery.toLowerCase()),
    );
    if(this.searchQuery == ""){
      this.searched = false;
    }
    else{
      this.searched = true;
    }
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
