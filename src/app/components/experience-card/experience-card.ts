import {
  Component,
  ElementRef,
  Inject,
  input,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { ExperienceInterface } from '../../sections/education/experience';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-experience-card',
  imports: [],
  templateUrl: './experience-card.html',
  styleUrl: './experience-card.css',
})
export class ExperienceCard {
  experience = input.required<ExperienceInterface>();
  @ViewChild('card', { static: true }) card!: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    gsap.registerPlugin(ScrollTrigger);
    const element = this.card.nativeElement as HTMLElement;
    const textCol = element.querySelector('div:nth-child(1)') as HTMLElement;
    const imgCol = element.querySelector('div:nth-child(2)') as HTMLElement;

    // Stati iniziali: testo da destra, immagine da sinistra

    // Animazione legata allo scroll
    gsap.from(textCol, {
      autoAlpha: 0,
      x: -1000,
      duration: 1,
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        end: '+=200',
        scrub: true,
      },
    });

    gsap.from(imgCol, {
      autoAlpha: 0,
      x: 1000,
      duration: 1,
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        end: '+=200',
        scrub: true,
      },
    });
  }
}
