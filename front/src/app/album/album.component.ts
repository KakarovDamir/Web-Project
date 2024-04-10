import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Albums } from '../models';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Songs } from '../models';
import { POSTS3 } from '../fake-db2';
import { POSTS } from '../fake-db';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-album',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './album.component.html',
  styleUrl: './album.component.css'
})
export class AlbumComponent implements OnInit {
  album!: Albums;
  songs!: Songs[];
  playButton!: boolean;

  constructor(private route: ActivatedRoute, public appComponent: AppComponent) { }

  ngOnInit() {
    this.playButton = true;

    this.route.paramMap.subscribe((params) => {
      const albumTitle = params.get('albumTitle');
      this.album = POSTS.find((album) => album.title == albumTitle) as Albums;
    })

    this.route.paramMap.subscribe((params) => {
      const albumTitle = params.get('albumTitle');
      this.songs = POSTS3.filter((song) => song.album_name == albumTitle) as Songs[];
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
