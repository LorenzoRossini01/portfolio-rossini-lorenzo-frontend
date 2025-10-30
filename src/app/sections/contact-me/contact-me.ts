import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  input,
  OnDestroy,
  signal,
  viewChild,
  ViewChild,
} from '@angular/core';
import { Button } from '../../shared/button/button';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
export class ContactMe implements AfterViewInit, OnDestroy {
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

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);

    const section = this.contactMeSection?.nativeElement;
    if (!section) return;

    const pinWrapper = section.querySelector('.pin-wrapper');
    const sectiontitle = section.querySelector('h3');
    const contactFormEl = section.querySelector('.contact-form');
    const textCol = section.querySelector('.text-col');

    // Aspetta che il DOM sia completamente renderizzato
    setTimeout(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=300',
          scrub: true,
          pin: pinWrapper,
          pinSpacing: true,
          anticipatePin: 1,
          refreshPriority: -1, // Calcola dopo altri ScrollTrigger
          // markers: true,
          onRefresh: (self) => {
            console.log('Start:', self.start, 'End:', self.end);
          },
        },
      });

      tl.from(sectiontitle, {
        autoAlpha: 0,
        x: 1000,
        duration: 1,
        ease: 'power3.out',
      })
        .from(
          textCol,
          {
            autoAlpha: 0,
            x: 1000,
            y: 500,
            duration: 1,
            ease: 'power3.out',
          },
          '-=0.5'
        )
        .from(
          contactFormEl,
          {
            autoAlpha: 0,
            x: -1000,
            y: 500,
            duration: 1,
            ease: 'power3.out',
          },
          '-=0.5'
        );

      // Forza un refresh dopo la creazione
      ScrollTrigger.refresh();
    }, 100);
  }

  ngOnDestroy(): void {
    // Pulisci tutti gli ScrollTrigger di questo componente
    ScrollTrigger.getAll().forEach((st) => {
      if (st.vars.trigger === this.contactMeSection?.nativeElement) {
        st.kill();
      }
    });
  }
}
