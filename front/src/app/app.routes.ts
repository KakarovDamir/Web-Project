import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { ArtistComponent } from './artist/artist.component';
import { AlbumComponent } from './album/album.component';
import { PlAlbumComponent } from './pl-album/pl-album.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';


export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'search', component: SearchComponent},
    {path: 'playlist', component: PlaylistComponent},
    {path: 'artist/:artistId', component: ArtistComponent},
    {path: 'album/:albumId', component: AlbumComponent},
    {path: 'pl_album/:playlistId', component: PlAlbumComponent},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    {path: '**', redirectTo: 'home'}
];
