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
   * Starts the animation for taking a card from the deck.
   * Sets the pickCardAnimation property to true.
   */
  takeCard() {
    this.pickCardAnimation = true;
  }
}
