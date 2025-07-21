import { Component, OnInit } from '@angular/core';
import { CustomSlicePipe } from '../../pipes/custom-slice-pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-practice',
  imports: [CustomSlicePipe, FormsModule],
  templateUrl: './practice.component.html',
  styleUrl: './practice.component.css',
})
export class PracticeComponent {
  start: number = 0;

  hi = 'Dilip is a Great Human';

  end: number = this.hi.length;

  constructor() {
    console.log(this.end);
  }
}
