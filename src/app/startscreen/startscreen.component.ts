import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-startscreen',
  standalone: true,
  imports: [],
  templateUrl: './startscreen.component.html',
  styleUrl: './startscreen.component.scss'
})


export class StartscreenComponent implements OnInit {


  constructor(private router: Router) { }


  /**
   * Lifecycle hook that is called after Angular has finished initializing all the components.
   * Called once by Angular after the first change detection check.
   */
  ngOnInit(): void {
  }


  /**
   * Navigate to the game page to start a new game.
   */
  newGame() {
    // Start a new game
    this.router.navigateByUrl('/game');
  }
}
