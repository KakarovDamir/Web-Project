import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { ArtistComponent } from './artist/artist.component';


export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path:'search', component: SearchComponent},
    {path: 'playlist', component: PlaylistComponent},
    {path: 'artist/:artistName', component: ArtistComponent},
    {path: '**', redirectTo: 'home'}
];
