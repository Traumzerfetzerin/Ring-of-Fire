import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { doc, docData } from '@angular/fire/firestore';
import { collection, addDoc } from '@angular/fire/firestore';
import { Game } from '../../models/game';


@Component({
  selector: 'app-startscreen',
  standalone: true,
  imports: [],
  templateUrl: './startscreen.component.html',
  styleUrl: './startscreen.component.scss'
})


export class StartscreenComponent implements OnInit {
  constructor(private firestore: Firestore, private router: Router) { }


  /**
   * Lifecycle hook that is called after Angular has finished initializing all the components.
   * Called once by Angular after the first change detection check.
   */
  ngOnInit(): void {
  }


  /**
   * Creates a new game in the Firestore and navigates to the game page with the given game ID.
   * If an error occurs while creating the game, it will be logged to the console.
   */
  newGame() {
    const game = new Game();
    const gamesCollection = collection(this.firestore, 'games');

    addDoc(gamesCollection, game.toJson())
      .then((docRef) => {
        console.log('Game created with ID:', docRef.id);
        this.router.navigateByUrl('/game/' + docRef.id);
      })
      .catch((error) => {
        console.error('Error creating game:', error);
      });
  }
}
