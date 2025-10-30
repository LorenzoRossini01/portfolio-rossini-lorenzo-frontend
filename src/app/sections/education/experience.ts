import {
  AfterViewInit,
  Component,
  ElementRef,
  input,
  ViewChild,
  viewChild,
} from '@angular/core';

import { ExperienceCard } from '../../components/experience-card/experience-card';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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
  @ViewChild('experienceSection') experienceSection!: ElementRef;

  myExperience = input.required<ExperienceInterface[]>();
  title = input('');

  ngAfterViewInit() {
    gsap.registerPlugin(ScrollTrigger);
    const section = this.experienceSection?.nativeElement;
    if (!section) return;

    const sectionTitle = section.querySelector('h3');

    gsap.from(sectionTitle, {
      autoAlpha: 0,
      x: 500,
      duration: 0.5,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'top center',
        // markers: true,
        toggleActions: 'restart pause reverse pause',
        scrub: true,
      },
    });
  }
}
