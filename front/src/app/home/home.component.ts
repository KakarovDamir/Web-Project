import { Component,OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Albums } from '../models';
import { CommonModule } from '@angular/common';
import { POSTS } from '../fake-db';
import { Artists } from '../models';
import { POSTS2 } from '../models';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  albums!: Albums[];
  artists!: Artists[];
  constructor(){}

  ngOnInit() {
    this.albums = POSTS;
    this.artists = POSTS2;
  }
}
