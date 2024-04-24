import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MusicService } from '../musicService';
import { PlayList } from '../models';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [
    RouterModule, 
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule
  ],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.css'
})

export class PlaylistComponent implements OnInit {
  playlists!: PlayList[];
  isDropdownOpen = false;
  newItem!: PlayList;
  url: string = '';
  title: string = '';

  constructor(private musicService: MusicService) {}

  ngOnInit(): void {
    this.getPlaylists();
  }

  getPlaylists(){
    this.musicService.getPlaylists().subscribe((data) => {
      this.playlists = data;
    })
  }
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  addItem() {
    if (this.url !=='' && this.title !== '') {
      this.musicService.creatPlaylist(this.url, this.title).subscribe(data => {
        this.getPlaylists();
        this.url = '';
        this.title = '';
      })
    }else{
      alert('Please enter URL and Title');
    }
  }
  removeItem(id: number) {
    this.musicService.deletePlaylist(id).subscribe(data => {
      this.getPlaylists();
    })
  }
}
