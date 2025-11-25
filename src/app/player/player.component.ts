import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';


@Component({
  selector: 'app-player',
  standalone: true,
  imports: [],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})


export class PlayerComponent implements OnInit {


  @Input() name: string = 'Player Name';
  @Input() playerAcitve: boolean = false;


  constructor() { }


  /**
   * Lifecycle hook that is called after Angular has finished initializing all the components.
   * Called once by Angular after the first change detection check.
   */
  ngOnInit(): void {
  }
}
