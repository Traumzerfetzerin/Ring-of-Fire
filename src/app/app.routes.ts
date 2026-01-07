import { Routes, RouterModule } from '@angular/router';
import { StartscreenComponent } from './startscreen/startscreen.component';
import { GameComponent } from './game/game.component';


export const routes: Routes = [
    { path: '', component: StartscreenComponent },
    { path: 'game/:id', component: GameComponent },
];


export class AppRoutingModule { }