import {
  AfterViewInit,
  Component,
  ElementRef,
  input,
  viewChild,
} from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MarkdownPipe } from '../../pipes/markdown-pipe';
import { SocialLinks } from '../../components/social-links/social-links';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [MarkdownPipe, SocialLinks],
  templateUrl: './about-me.html',
  styleUrls: ['./about-me.css'],
})
export class AboutMe implements AfterViewInit {
  aboutText = input.required<string>();
  aboutSection = viewChild<ElementRef>('aboutSection');
  socialIcons = viewChild<ElementRef>('socialIcons');
  private scrollTriggerInstance?: ScrollTrigger;
  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);

    const section = this.aboutSection()?.nativeElement as HTMLElement;
    if (!section) return;

    const photoCol = section.querySelector('.photo-col') as HTMLElement;
    const textCol = section.querySelector('.text-col') as HTMLElement;
    const sectionTitle = section.querySelector('.section-title') as HTMLElement;

    // Verifica che tutti gli elementi esistano
    if (!photoCol || !textCol || !sectionTitle) {
      console.warn('AboutMe: Alcuni elementi non sono stati trovati nel DOM');
      return;
    }

    // Imposta lo stato iniziale
    gsap.set([sectionTitle, photoCol, textCol], {
      opacity: 0,
    });

    const tl = gsap.timeline({
      defaults: {
        ease: 'power3.out',
      },
    });

    // Animazioni in sequenza con overlap
    tl.fromTo(
      sectionTitle,
      { opacity: 0, x: 500 },
      { opacity: 1, x: 0, duration: 1 }
    )
      .fromTo(
        photoCol,
        { opacity: 0, x: -1000, y: 500 },
        { opacity: 1, x: 0, y: 0, duration: 1 },
        '-=0.5'
      )
      .fromTo(
        textCol,
        { opacity: 0, x: 500, y: 500 },
        { opacity: 1, x: 0, y: 0, duration: 1 },
        '-=0.7'
      );

    this.scrollTriggerInstance = ScrollTrigger.create({
      animation: tl,
      trigger: section,
      start: 'top 70%',
      end: 'center center',
      scrub: 1,
      toggleActions: 'play none none reverse',
    });
  }

  ngOnDestroy(): void {
    // Cleanup
    this.scrollTriggerInstance?.kill();
  }
}
