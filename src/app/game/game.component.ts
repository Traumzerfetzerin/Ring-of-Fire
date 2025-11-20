import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from '../../models/game';


@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})


export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string | undefined;
  game: Game = new Game();


  constructor() { }


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
    console.log(this.game);

  }


  /**
   * Takes the top card from the deck and assigns it to the currentCard property.
   * Sets the pickCardAnimation property to true for 1500ms to prevent the user from taking multiple cards at once.
   */
  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop();
      console.log(this.currentCard);
      this.pickCardAnimation = true;

      setTimeout(() => {
        this.pickCardAnimation = false;
      }, 1500);
    }
  }
}