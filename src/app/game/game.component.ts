import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../game-info/game-info.component';
import {MatCardModule} from '@angular/material/card';


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    PlayerComponent,
    MatIconModule,
    GameInfoComponent,
    MatCardModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})


export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string = '';
  game: Game = new Game();


  constructor(public dialog: MatDialog) { }


  /**
   * Called after the component's properties have been initialized.
   * Resets the game state to a new game.
   */
  ngOnInit(): void {
    this.newGame();
  }


  /**
   * Resets the game state to a new game.
   * Creates a new Game instance and assigns it to the game property.
   */
  newGame() {
    this.game = new Game();
  }


  /**
   * Animates the taking of a card from the stack.
   * If the animation is not already running, it pops the top card from the stack and sets the currentCard property.
   * It then sets the pickCardAnimation property to true and waits for 1000ms before adding the currentCard to the playedCards and resetting the pickCardAnimation property to false.
   */
  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop() as string;
      this.pickCardAnimation = true;

      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
      }, 1000);
    }
  }


  /**
   * Opens a dialog to add a player to the game.
   * After the dialog is closed, it will log a message to the console.
   */
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(name => {
      this.game.players.push(name);
    });
  }
}