import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  input,
  PLATFORM_ID,
  viewChild,
  ViewChild,
} from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MarkdownPipe } from '../../pipes/markdown-pipe';
import { SocialLinks } from '../../components/social-links/social-links';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [MarkdownPipe, SocialLinks],
  templateUrl: './about-me.html',
  styleUrls: ['./about-me.css'],
})
export class AboutMe implements AfterViewInit {
  aboutText = input.required<string>();
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
  }
}
