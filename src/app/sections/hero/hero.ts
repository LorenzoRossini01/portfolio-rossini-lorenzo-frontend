import {
  AfterViewInit,
  Component,
  ElementRef,
  viewChild,
  OnDestroy,
} from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.html',
  styleUrls: ['./hero.css'],
})
export class Hero implements AfterViewInit, OnDestroy {
  heroSection = viewChild<ElementRef<HTMLDivElement>>('heroSection');
  private scrollTriggerInstance?: ScrollTrigger;
  private arrowLoop?: gsap.core.Tween;
  private mainTimeline?: gsap.core.Timeline;

  constructor() {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  }
  ngAfterViewInit(): void {
    const section = this.heroSection()?.nativeElement;
    if (!section) return;

    // Split del testo in caratteri
    const headings = section.querySelectorAll('h1, h2');
    headings?.forEach((heading) => {
      const text = heading.textContent || '';
      heading.innerHTML = text
        .split('')
        .map((char) => {
          const displayChar = char === ' ' ? '&nbsp;' : char;
          return `<span class="char">${displayChar}</span>`;
        })
        .join('');
    });

    const downArrow = section.querySelector(
      '.down-arrow'
    ) as HTMLElement | null;
    if (!downArrow) {
      console.warn('Nessuna freccia trovata nel DOM');
      return;
    }

    downArrow.addEventListener('click', () => {
      gsap.to(window, {
        scrollTo: { y: section.offsetHeight, autoKill: true },
        duration: 1,
        ease: 'power2.inOut',
      });
    });

    const letters = Array.from(section.querySelectorAll('.char'));

    // Setup base
    gsap.set(letters, { opacity: 0, y: 20 });
    gsap.set(downArrow, { opacity: 0, y: 0 });

    //Animazione principale (titoli + freccia)
    this.mainTimeline = gsap.timeline({
      defaults: {
        ease: 'power3.out',
      },
      paused: true,
    });

    this.mainTimeline
      .to(letters, {
        opacity: 1,
        y: 0,
        stagger: {
          amount: 0.8,
          from: 'start',
        },
        duration: 0.6,
      })
      .to(
        downArrow,
        {
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          onComplete: () => {
            this.arrowLoop?.play();
          },
        },
        '-=0.2'
      );

    // Loop continuo della freccia
    this.arrowLoop = gsap.to(downArrow, {
      y: 20,
      repeat: -1,
      yoyo: true,
      paused: true,
      ease: 'power1.inOut',
      duration: 0.8,
    });

    ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      end: '80% 20%',
      // markers: true,
      toggleActions: 'play reverse play reverse',
      animation: this.mainTimeline,
      onToggle: (self) => {
        if (self.isActive) {
          this.arrowLoop?.play();
        } else {
          this.arrowLoop?.pause();
        }
      },
    });

    // Gestione scomparsa freccia durante scroll
    this.scrollTriggerInstance = ScrollTrigger.create({
      trigger: section,
      start: 'bottom center',
      end: 'bottom top',
      // markers: true,
      onEnter: () => {
        // Scroll verso il basso: nascondi la freccia
        this.arrowLoop?.pause();
        gsap.to(downArrow, {
          y: 100,
          opacity: 0,
          duration: 0.4,
          ease: 'power2.in',
        });
      },
      onLeaveBack: () => {
        // Torna indietro: ripristina la freccia
        gsap.to(downArrow, {
          y: 0,
          opacity: 1,
          duration: 0.3,
          ease: 'power2.out',
          onComplete: () => {
            this.arrowLoop?.play();
          },
        });
      },
    });

    // Avvia l'animazione se la sezione è già visibile al caricamento
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.8) {
      this.mainTimeline.play();
    }
  }

  ngOnDestroy(): void {
    // Cleanup delle animazioni
    this.arrowLoop?.kill();
    this.mainTimeline?.kill();
    this.scrollTriggerInstance?.kill();

    // Pulisci tutti gli ScrollTrigger della sezione
    const section = this.heroSection()?.nativeElement;
    if (section) {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === section) {
          st.kill();
        }
      });
    }
  }
}
