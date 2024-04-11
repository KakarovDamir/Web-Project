import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Songs } from '../models';
import { POSTS3 } from '../fake-db2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  songs!: Songs[];
  filteredItems: any[] = [];
  searchQuery: string = '';
  searched: boolean = false;
  playButton: boolean = true;

  constructor (private route: ActivatedRoute, public appComponent: AppComponent){}

  ngOnInit(){
    this.songs = POSTS3;
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
