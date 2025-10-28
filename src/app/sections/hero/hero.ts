import {
  AfterViewInit,
  Component,
  ElementRef,
  viewChild,
  ViewChild,
} from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.html',
  styleUrls: ['./hero.css'],
  host: { ngSkipHydration: '' }, // ← evita problemi di hydration
})
export class Hero implements AfterViewInit {
  heroSection = viewChild<ElementRef<HTMLDivElement>>('heroSection');
  ngAfterViewInit(): void {
    const headings =
      this.heroSection()?.nativeElement.querySelectorAll('h1,h2');

    headings?.forEach((heading) => {
      const text = heading.textContent || '';
      heading.innerHTML = text
        .split('')
        .map((char) => {
          return `<span class="char">${char}</span>`;
        })
        .join('');
    });

    const letters = headings
      ? Array.from(headings).flatMap((heading) =>
          Array.from(heading.querySelectorAll('.char'))
        )
      : [];

    gsap.set(letters, {
      y: 0,
      x: 0,
      autoAlpha: 0,
    });

    if (headings) {
      gsap.from(headings, {
        y: -50,
        duration: 1.5,
        stagger: 0.5,
      });
    }

    gsap.to(letters, {
      autoAlpha: 1,
      ease: 'power3.out',
      stagger: 0.05,
      duration: 1,
    });
  }
}
