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
  selector: 'app-about-me',
  standalone: true,
  templateUrl: './about-me.html',
  styleUrls: ['./about-me.css'],
})
export class AboutMe implements AfterViewInit {
  aboutSection = viewChild<ElementRef>('aboutSection');
  socialIcons = viewChild<ElementRef>('socialIcons');

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    gsap.registerPlugin(ScrollTrigger);

    const section = this.aboutSection()?.nativeElement as HTMLElement;
    const photoCol = section.querySelector('.photo-col') as HTMLElement;
    const textCol = section.querySelector('.text-col') as HTMLElement;
    const sectionTitle = section.querySelector('.section-title') as HTMLElement;
    const icons = this.aboutSection()?.nativeElement.querySelectorAll(
      '.social-icon'
    ) as NodeListOf<HTMLElement>;

    const tl = gsap.timeline();

    // Animazione testo legata allo scroll
    tl.from(sectionTitle, {
      autoAlpha: 0,
      x: 500,
      duration: 1,
      ease: 'power3.out',
    });

    // Animazione foto legata allo scroll
    tl.from(photoCol, {
      autoAlpha: 0,
      x: -1000,
      y: 500,
      duration: 1,
      ease: 'power3.out',
    });

    tl.from(textCol, {
      autoAlpha: 0,
      x: 500,
      y: 500,
      duration: 1,
      ease: 'power3.out',
    });

    ScrollTrigger.create({
      animation: tl,
      trigger: this.aboutSection()?.nativeElement,
      toggleActions: 'restart pause reverse pause',
      start: '30% center',
      end: '+=500',
      scrub: true,
      pin: true,
    });

    icons.forEach((icon, index) => {
      icon.addEventListener('mouseenter', () => {
        icons.forEach((ic, i) => {
          const distance = Math.abs(i - index); // distanza dall'icona attiva
          gsap.to(ic, {
            scale: i === index ? 1.3 : 1 + 0.1 / distance, // icona centrale più grande
            rotation: i === index ? 10 : 5 / distance, // rotazione più intensa al centro
            duration: 0.3,
            delay: distance * 0.05, // ritardo in base alla distanza
            ease: 'power2.out',
          });
        });
      });

      icon.addEventListener('mouseleave', () => {
        icons.forEach((ic, i) => {
          const distance = Math.abs(i - index);
          gsap.to(ic, {
            scale: 1,
            rotation: 0,
            duration: 0.3,
            delay: distance * 0.05,
            ease: 'power2.out',
          });
        });
      });
    });
  }
}
