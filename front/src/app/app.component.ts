import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';  
import { Songs } from './models';
import { POSTS3 } from './fake-db2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, HomeComponent, FormsModule, ReactiveFormsModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Music';
  songs!: Songs[];
  song!: Songs

  constructor(private route: ActivatedRoute){}

  ngOnInit() {
    this.songs = POSTS3;

    this.route.paramMap.subscribe((params) => {
      const songId = Number(params.get('9'));
      this.song = POSTS3.find((song) => song.id == songId) as Songs;
    })
  }
}
