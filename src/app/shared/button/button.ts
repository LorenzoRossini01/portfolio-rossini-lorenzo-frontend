import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  label = input.required<string>();
  downloadIcon = input<boolean>(false);
  onClick = output();

  handleButtonClick() {
    this.onClick.emit();
  }
}
