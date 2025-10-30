import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  PLATFORM_ID,
  viewChild,
} from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-social-links',
  imports: [],
  templateUrl: './social-links.html',
  styleUrl: './social-links.css',
})
export class SocialLinks implements AfterViewInit {
  socialLinks = viewChild<ElementRef>('socialLinks');

  ngAfterViewInit(): void {
    const icons = this.socialLinks()?.nativeElement.querySelectorAll(
      '.social-icon'
    ) as NodeListOf<HTMLElement>;

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
