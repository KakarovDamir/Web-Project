import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from '../app.component';
import { MusicService } from '../musicService';
import { Songs,Artists } from '../models';


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    RouterModule, 
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})


export class SearchComponent implements OnInit {
  songs!: Songs[];
  artist!: Artists;
  filteredItems: any[] = [];
  searchQuery: string = '';
  searched: boolean = false;
  playButton: boolean = true;

  constructor (
    private route: ActivatedRoute, 
    public appComponent: AppComponent,
    private musicService: MusicService
  ){}

  ngOnInit(){
    this.getSongs();
  }

  getSongs(){
    this.musicService.getSongs().subscribe((data) => {
      this.songs = data;
    });
  }
  
  getArtist(id: Number){
    this.musicService.getArtist(id).subscribe((data: Artists) => {
      this.artist = data;
    })
  }

  search(): void {
    this.filteredItems = this.songs.filter(item => 
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
