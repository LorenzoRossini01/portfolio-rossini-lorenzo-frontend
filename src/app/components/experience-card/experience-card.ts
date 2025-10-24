import { Component, ElementRef, input, ViewChild } from '@angular/core';
import { ExperienceInterface } from '../../sections/education/experience';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-experience-card',
  imports: [],
  templateUrl: './experience-card.html',
  styleUrl: './experience-card.css',
})
export class ExperienceCard {
  experience = input.required<ExperienceInterface>();
  @ViewChild('card', { static: true }) card!: ElementRef;

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);

    const element = this.card.nativeElement as HTMLElement;
    const textCol = element.querySelector('div:nth-child(1)') as HTMLElement;
    const imgCol = element.querySelector('div:nth-child(2)') as HTMLElement;

    // Stati iniziali: testo da destra, immagine da sinistra
    gsap.set(textCol, { opacity: 0, x: 100 });
    gsap.set(imgCol, { opacity: 0, x: -100 });

    // Animazione legata allo scroll
    gsap.to(textCol, {
      opacity: 1,
      x: 0,
      duration: 1,
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        end: 'top 50%',
        scrub: true,
      },
    });

    gsap.to(imgCol, {
      opacity: 1,
      x: 0,
      duration: 1,
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        end: 'top 50%',
        scrub: true,
      },
    });
  }
}
