import { Component, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-add-player',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './dialog-add-player.component.html',
  styleUrl: './dialog-add-player.component.scss'
})


export class DialogAddPlayerComponent implements OnInit {
  name: string = '';


  constructor(private dialogRef: MatDialogRef<DialogAddPlayerComponent>) { }


  /**
   * Lifecycle hook that is called after Angular has finished initializing all the components.
   * Called once by Angular after the first change detection check.
   */
  ngOnInit(): void {
  }


  /**
   * Closes the dialog.
   */
  onNoClick(): void {
    this.dialogRef.close();
  }
}
