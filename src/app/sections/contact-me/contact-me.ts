import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  PLATFORM_ID,
  ViewChild,
  viewChild,
} from '@angular/core';
import { Button } from '../../shared/button/button';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-contact-me',
  imports: [Button, ReactiveFormsModule],
  templateUrl: './contact-me.html',
  styleUrl: './contact-me.css',
})
export class ContactMe implements AfterViewInit {
  @ViewChild('contactMe', { static: false }) contactMeSection!: ElementRef;

  // contactMeSection = viewChild<ElementRef>('contactMe');
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

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    gsap.registerPlugin(ScrollTrigger);

    const section = this.contactMeSection?.nativeElement;
    if (!section) return;
    const sectiontitle = section.querySelector('h3');
    const contactFormEl = section.querySelector('.contact-form');
    const textCol = section.querySelector('.text-col');

    const tl = gsap.timeline();

    tl.from(sectiontitle, {
      autoAlpha: 0,
      x: 1000,
      duration: 1,
      ease: 'power3.out',
    });
    tl.from(textCol, {
      autoAlpha: 0,
      x: 1000,
      y: 500,
      duration: 1,
      ease: 'power3.out',
    });
    tl.from(contactFormEl, {
      autoAlpha: 0,
      x: -1000,
      y: 500,
      duration: 1,
      ease: 'power3.out',
    });

    ScrollTrigger.create({
      animation: tl,
      trigger: section,
      start: '30% center',
      end: '+=500',
      scrub: true,
      toggleActions: 'play none none reverse',
      pin: true,
    });
  }
}
