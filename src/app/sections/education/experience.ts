import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  input,
  PLATFORM_ID,
  signal,
  viewChild,
  ViewChild,
} from '@angular/core';

import { ExperienceCard } from '../../components/experience-card/experience-card';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isPlatformBrowser } from '@angular/common';
export interface ExperienceInterface {
  institution: string;
  degree: string;
  period: string;
  image: MediaInterface;
  link?: string;
  details: string;
}
export interface MediaInterface {
  id: number;
  url: string;
  alternativeText?: string | null;
  caption?: string | null;
  width?: number;
  height?: number;
  formats?: MediaFormatsInterface;
}

export interface MediaFormatsInterface {
  thumbnail?: MediaFormatInterface;
  small?: MediaFormatInterface;
  medium?: MediaFormatInterface;
  large?: MediaFormatInterface;
}

export interface MediaFormatInterface {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path?: string | null;
  size: number;
  width: number;
  height: number;
}

@Component({
  selector: 'app-experience',
  imports: [ExperienceCard],
  templateUrl: './experience.html',
  styleUrl: './experience.css',
})
export class Experience implements AfterViewInit {
  experienceSection = viewChild<ElementRef>('experienceSection');

  myExperience = input.required<ExperienceInterface[]>();
  title = input('');

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return; // <-- evita errori in SSR

    gsap.registerPlugin(ScrollTrigger);
    const section = this.experienceSection()?.nativeElement;
    if (!section) return;
    const sectionTitle = section.querySelector('h3');
    // const experienceCard = section.querySelectorAll('.experience-card');

    // console.log(experienceCard);

    gsap.from(sectionTitle, {
      autoAlpha: 0,
      x: 500,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top center',
        end: '+=200',
        toggleActions: 'restart pause reverse pause',
        scrub: true,
      },
    });
    // gsap.from([...experienceCard], {
    //   autoAlpha: 0,
    //   x: 1000,
    //   scrollTrigger: {
    //     trigger: section,
    //     start: 'top 80%',
    //     toggleActions: 'restart pause reverse pause',
    //     scrub: true,
    //   },
    // });
  }
}
