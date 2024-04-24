import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Albums, Artists, PlayList, Songs } from './models';

@Injectable({
  providedIn: 'root'
})

export class MusicService {
  BASE_URL = 'http://localhost:8000'

  constructor(private http: HttpClient) { }

// ------------------------Artists------------------------------------------------------------

  getArtists(): Observable<Artists[]> {
    return this.http.get<Artists[]>(`${this.BASE_URL}/api/artists`);
  }

  getArtistSongs(id: Number): Observable<Songs[]> {
    return this.http.get<Songs[]>(`${this.BASE_URL}/api/artists/${id}/songs`)
  }

  getArtist(id: Number): Observable<Artists> {
    return this.http.get<Artists>(`${this.BASE_URL}/api/artists/${id}`)
  }

//-------------------------Albums-------------------------------------------------------------

  getAlbums(): Observable<Albums[]> {
    return this.http.get<Albums[]>(`${this.BASE_URL}/api/albums`)
  }

  getAlbumSongs(id : Number): Observable<Songs[]> {
    return this.http.get<Songs[]>(`${this.BASE_URL}/api/albums/${id}/songs`)
  }

  getAlbum(id: Number): Observable<Albums> {
    return this.http.get<Albums>(`${this.BASE_URL}/api/albums/${id}`)
  }

//-------------------------Songs-------------------------------------------------------------- 

  getSongs(): Observable<Songs[]> {
    return this.http.get<Songs[]>(`${this.BASE_URL}/api/songs`)
  }

  getSong(id: Number): Observable<Songs> {
    return this.http.get<Songs>(`${this.BASE_URL}/api/songs/${id}`)
  }

  updateSong(song: Songs): Observable<Songs> {
    return this.http.put<Songs>(`${this.BASE_URL}/api/songs/${song.id}/`, song);
  }

// ------------------------PlayList-----------------------------------------------------------

  getPlaylists(): Observable <PlayList[]> {
    return this.http.get<PlayList[]>(`${this.BASE_URL}/api/playlists`)
  }

  getPlaylistSongs(id: Number): Observable<Songs[]> {
    return this.http.get<Songs[]>(`${this.BASE_URL}/api/playlists/${id}/songs`)
  }

  getPlaylist(id: Number): Observable<PlayList> {
    return this.http.get<PlayList>(`${this.BASE_URL}/api/playlists/${id}`)
  }

  creatPlaylist(img_url: string, title: string): Observable<PlayList> {
    return this.http.post<PlayList>(`${this.BASE_URL}/api/playlists/`, {img_url, title});
  }

  deletePlaylist(id: Number): Observable<PlayList> {
    return this.http.delete<PlayList>(`${this.BASE_URL}/api/playlists/${id}/`);
  }
}