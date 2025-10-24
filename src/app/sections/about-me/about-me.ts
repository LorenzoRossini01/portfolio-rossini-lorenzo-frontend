import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-about-me',
  standalone: true,
  templateUrl: './about-me.html',
  styleUrls: ['./about-me.css'],
})
export class AboutMe implements AfterViewInit {
  @ViewChild('aboutSection', { static: true }) aboutSection!: ElementRef;
  @ViewChild('socialIcons', { static: true }) socialIcons!: ElementRef;

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);

    const section = this.aboutSection.nativeElement as HTMLElement;
    const photoCol = section.querySelector('.photo-col') as HTMLElement;
    const textCol = section.querySelector('.text-col') as HTMLElement;
    const sectionTitle = section.querySelector('.section-title') as HTMLElement;
    const icons = this.aboutSection.nativeElement.querySelectorAll(
      '.social-icon'
    ) as NodeListOf<HTMLElement>;

    // Stati iniziali
    gsap.set(photoCol, { opacity: 0, x: -1000, y: 500 });
    gsap.set(textCol, { opacity: 0, x: 1000, y: 500 });
    gsap.set(sectionTitle, { opacity: 0, x: 1000, y: 500 });

    // Animazione foto legata allo scroll
    gsap.to(photoCol, {
      opacity: 1,
      x: 0,
      y: 0,
      duration: 1,
      scrollTrigger: {
        trigger: section,
        start: 'top 80%', // quando parte l'animazione
        end: 'top 30%', // quando finisce
        scrub: true, // segue lo scroll in tempo reale
      },
    });

    // Animazione testo legata allo scroll
    gsap.to(sectionTitle, {
      opacity: 1,
      x: 0,
      y: 0,
      duration: 1,
      delay: 0.15,
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'top 30%',
        scrub: true,
      },
    });
    gsap.to(textCol, {
      opacity: 1,
      x: 0,
      y: 0,
      duration: 1,
      delay: 0.15,
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'top 30%',
        scrub: true,
      },
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
