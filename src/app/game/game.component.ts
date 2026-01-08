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
import { updateDoc } from '@angular/fire/firestore';



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
  game: Game = new Game();
  gameId: string = '';


  constructor(private route: ActivatedRoute, private firestore: Firestore, public dialog: MatDialog) { }


  /**
   * Lifecycle hook that is called after Angular has finished initializing all the components.
   * Subscribes to route parameters to get the game ID from the URL.
   * If no game ID is provided, creates a new game.
   * If a game ID is provided, subscribes to the game document in the Firestore and updates the game state based on the document's data.
   */
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.gameId = params['id'];

      if (!this.gameId) {
        this.newGame();
        return;
      }

      const gameDocRef = doc(this.firestore, 'games', this.gameId);

      docData(gameDocRef).subscribe((game: any) => {
        if (!game) return;

        this.game.currentPlayer = game.currentPlayer;
        this.game.players = game.players;
        this.game.playedCards = game.playedCards;
        this.game.stack = game.stack;
        this.game.pickCardAnimation = game.pickCardAnimation;
        this.game.currentCard = game.currentCard;
      });
    });
  }


  /**
   * Creates a new game and resets all game state.
   * This method is called when the user navigates to the game page without a valid game ID.
   */
  newGame() {
    this.game = new Game();
  }


  /**
   * Tries to take a card from the deck.
   * If the card picking animation is not running, pops a card from the deck and updates the game state.
   * If the animation is running, does nothing.
   * After the animation finishes (after 1 second), updates the game state by adding the taken card to the played cards and resetting the animation state.
   */
  takeCard() {
    if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop() as string;
      this.game.pickCardAnimation = true;

      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      
      this.updateGameInFirestore();

      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
        this.updateGameInFirestore();
      }, 1000);
    }
  }


  /**
   * Opens a dialog for adding a new player to the game.
   * The dialog will pass the entered player name to the afterClosed() subscription.
   * If the entered name is not empty, the player will be added to the game and the game state will be updated in the Firestore.
   */
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(name => {
      if (name && name.length > 0) {
        this.game.players.push(name);
        this.updateGameInFirestore();
      }
    });
  }


  /**
   * Updates the game state in the Firestore.
   * If no game ID is provided, the method does nothing.
   * @returns {void}
   */
  updateGameInFirestore() {
    if (!this.gameId) return;

    const gameDocRef = doc(this.firestore, 'games', this.gameId);
    updateDoc(gameDocRef, this.game.toJson());
  }
}
