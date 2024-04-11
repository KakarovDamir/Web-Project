import { Component, OnInit } from '@angular/core';
import { PlayList } from '../models';
import { POSTS4 } from '../fake-db3';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.css'
})
export class PlaylistComponent implements OnInit {
  playlists!: PlayList[];

  constructor(){
  }

  ngOnInit(): void {
   this.playlists= POSTS4; 
  }
}
