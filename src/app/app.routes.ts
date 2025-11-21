import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartscreenComponent } from './startscreen/startscreen.component';
import { GameComponent } from './game/game.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


export const routes: Routes = [
    { path: '', component: StartscreenComponent },
    { path: 'game', component: GameComponent },
];


@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        MatButtonModule,
        MatIconModule
    ],
    exports: [RouterModule]
})


export class AppRoutingModule { }