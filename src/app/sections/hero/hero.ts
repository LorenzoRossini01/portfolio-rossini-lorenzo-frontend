import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  PLATFORM_ID,
  viewChild,
  ViewChild,
} from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.html',
  styleUrls: ['./hero.css'],
})
export class Hero implements AfterViewInit {
  heroSection = viewChild<ElementRef<HTMLDivElement>>('heroSection');

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    gsap.registerPlugin(ScrollTrigger);

    const section = this.heroSection()?.nativeElement;
    if (!section) return;

    const headings = section.querySelectorAll('h1,h2');
    headings?.forEach((heading) => {
      const text = heading.textContent || '';
      heading.innerHTML = text
        .split('')
        .map((char) => `<span class="char">${char}</span>`)
        .join('');
    });

    const downArrow = section.querySelector(
      '.down-arrow'
    ) as HTMLElement | null;
    if (!downArrow) {
      console.warn('Nessuna freccia trovata nel DOM');
      return;
    }

    const letters = Array.from(section.querySelectorAll('.char'));

    // setup base
    gsap.set(letters, { autoAlpha: 1 });
    gsap.set(downArrow, { autoAlpha: 0, y: 0 });

    // 1️⃣ animazione dei titoli
    const tl = gsap.timeline({
      onComplete: () => {
        // mostra la freccia solo quando i titoli hanno finito
        gsap.to(downArrow, { autoAlpha: 1, duration: 0.4 });
        arrowLoop.play();
      },
    });

    tl.from(letters, {
      autoAlpha: 0,
      ease: 'power3.out',
      stagger: 0.2,
      duration: 1.5,
    });

    // 2️⃣ loop continuo della freccia
    const arrowLoop = gsap.to(downArrow, {
      y: 50,
      repeat: -1,
      yoyo: true,
      paused: true, // parte solo dopo l'apparizione
      ease: 'power1.in',
      duration: 0.8,
    });

    // 3️⃣ gestione scroll
    ScrollTrigger.create({
      trigger: section,
      start: 'center center',
      end: '+=500',
      scrub: true,
      // pin: true,
      onEnter: () => {
        // ferma il loop
        arrowLoop.pause(0);
        // animazione verso il basso
        gsap.to(downArrow, {
          y: 150,
          autoAlpha: 0,
          duration: 0.5,
          ease: 'power3.in',
        });
      },
      onLeaveBack: () => {
        // se torni indietro, riparte il loop
        gsap.to(downArrow, { y: 0, autoAlpha: 1, duration: 0.1 });
        arrowLoop.play();
      },
    });
  }
}
