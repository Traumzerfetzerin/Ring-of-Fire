import { Component, OnInit, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from '../game-info/game-info.component';
import { MatCardModule } from '@angular/material/card';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { doc, docData } from '@angular/fire/firestore';


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    PlayerComponent,
    MatIconModule,
    GameInfoComponent,
    MatCardModule
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})


export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string = '';
  game: Game = new Game();


  constructor(private route: ActivatedRoute, private firestore: Firestore, public dialog: MatDialog) { }


  /**
   * Lifecycle hook that is called after Angular has finished initializing all the components.
   * Called once by Angular after the first change detection check.
   * If the route parameter 'id' is present, it will load the game from the Firestore.
   * If the route parameter 'id' is not present, it will create a new game.
   */
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const gameId = params['id'];

      if (!gameId) {
        this.newGame();
        return;
      }

      const gameDocRef = doc(this.firestore, `games/${gameId}`);

      docData(gameDocRef).subscribe((game: any) => {
        if (!game) return;

        this.game.currentPlayer = game.currentPlayer;
        this.game.players = game.players;
        this.game.playedCards = game.playedCards;
        this.game.stack = game.stack;
      });

    });
  }


  /**
   * Starts a new game.
   * Initializes a new Game object and adds it to the 'games' collection in Firestore.
   * @return {void} No return value.
   */
  newGame() {
    this.game = new Game();

    const gamesRef = collection(this.firestore, 'games');
    addDoc(gamesRef, this.game.toJson());
  }


  /**
   * Tries to take a card from the deck.
   * If the takeCard animation is not currently running, takes the top card from the deck,
   * starts the animation, increments the current player index, and schedules a function to be called after 1000ms.
   * The scheduled function adds the taken card to the played cards list and stops the animation.
   * If the animation is currently running, does nothing.
   */
  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop() as string;
      this.pickCardAnimation = true;

      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;

      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardAnimation = false;
      }, 1000);
    }
  }


  /**
   * Opens a dialog to add a new player to the game.
   * When the dialog is closed, adds the entered name to the players list if it is not empty.
   */
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(name => {
      if (name && name.length > 0) {
        this.game.players.push(name);
      }
    });
  }
}
