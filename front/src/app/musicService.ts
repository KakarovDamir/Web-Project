import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Songs } from './models';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  private currentSongSubject: BehaviorSubject<Songs | null>;
  public currentSong: Observable<Songs | null>;

  constructor() {
    this.currentSongSubject = new BehaviorSubject<Songs | null>(null);
    this.currentSong = this.currentSongSubject.asObservable();
  }

  public setCurrentSong(song: Songs): void {
    this.currentSongSubject.next(song);
  }
}
