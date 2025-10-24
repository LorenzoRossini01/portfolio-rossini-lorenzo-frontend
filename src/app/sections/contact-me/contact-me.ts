import { Component } from '@angular/core';
import { Button } from '../../shared/button/button';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-contact-me',
  imports: [Button, ReactiveFormsModule],
  templateUrl: './contact-me.html',
  styleUrl: './contact-me.css',
})
export class ContactMe {
  contactForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    message: new FormControl(''),
    privacy: new FormControl(false, Validators.required),
  });

  handleFormSubmit() {
    if (this.contactForm.valid) {
      console.log(this.contactForm.value);
      // Here you can add your logic to send the form data to your server or email service
    }
  }
}
