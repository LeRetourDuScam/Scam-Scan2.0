import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contactForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    // Initialisation du formulaire avec FormBuilder et FormControl
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Message envoyé :', this.contactForm.value);
      // Code pour envoyer les données au backend
    } else {
      console.log('Formulaire invalide');
    }
  }
}
