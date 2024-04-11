import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { ArtistComponent } from './artist/artist.component';
import { AlbumComponent } from './album/album.component';
import { PlAlbumComponent } from './pl-album/pl-album.component';


export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'search', component: SearchComponent},
    {path: 'playlist', component: PlaylistComponent},
    {path: 'artist/:artistName', component: ArtistComponent},
    {path: 'album/:albumTitle', component: AlbumComponent},
    {path: 'pl_album/:playlistTitle', component: PlAlbumComponent},
    {path: '**', redirectTo: 'home'}
];
