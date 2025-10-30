import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  Inject,
  input,
  PLATFORM_ID,
  signal,
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
import { MarkdownPipe } from '../../pipes/markdown-pipe';
import { ContactService } from '../../services/contact.service';
import { SocialLinks } from '../../components/social-links/social-links';

@Component({
  selector: 'app-contact-me',
  imports: [Button, ReactiveFormsModule, MarkdownPipe, SocialLinks],
  templateUrl: './contact-me.html',
  styleUrl: './contact-me.css',
})
export class ContactMe implements AfterViewInit {
  contactText = input.required<string>();

  private contactService = inject(ContactService);
  isSending = signal(false);
  success = signal(false);
  errorMessage = signal<string | null>(null);
  @ViewChild('contactMe', { static: false }) contactMeSection!: ElementRef;

  // contactMeSection = viewChild<ElementRef>('contactMe');
  contactForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    message: new FormControl('', Validators.required),
    privacy: new FormControl(false, Validators.required),
  });

  handleFormSubmit() {
    this.isSending.set(true);
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    const formValue = this.contactForm.value;
    const payload = {
      name: formValue.name ?? '',
      email: formValue.email ?? '',
      message: formValue.message ?? '',
    };
    this.contactService.sendMessage(payload).subscribe({
      next: () => {
        this.isSending.set(false);
        this.success.set(true);
        // console.log(payload);
      },
      error: (err) => {
        console.error('Errore invio:', err);
        this.errorMessage.set(
          'Si è verificato un errore durante l’invio del messaggio.'
        );
        this.isSending.set(false);
      },
    });
    this.contactForm.reset();
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
