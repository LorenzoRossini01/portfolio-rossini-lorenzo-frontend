import {
  AfterViewInit,
  Component,
  inject,
  Inject,
  OnInit,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { Hero } from '../../sections/hero/hero';
import { AboutMe } from '../../sections/about-me/about-me';
import { SkillInterface, Skills } from '../../sections/skills/skills';
import { ContactMe } from '../../sections/contact-me/contact-me';
import { MyProjects } from '../../sections/my-projects/my-projects';
import {
  Experience,
  ExperienceInterface,
} from '../../sections/education/experience';
import { Button } from '../../shared/button/button';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { log } from 'console';
import { isPlatformBrowser } from '@angular/common';
import { StrapiService } from '../../services/strapi.service';

@Component({
  selector: 'app-homepage',
  imports: [Hero, AboutMe, Skills, ContactMe, MyProjects, Experience, Button],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css',
})
export class Homepage implements OnInit, AfterViewInit {
  private strapiService = inject(StrapiService);
  ngOnInit(): void {
    this.fetchAboutText();
    this.fetchTechSkills();
    this.fetchEducations();
    this.fetchCertifications();
    this.fetchPreviousJobs();
    this.fetchContactText();
  }

  fetchAboutText() {
    this.strapiService.getAboutMeText().subscribe({
      next: (value) => {
        this.aboutText.set(value.data.text);
      },
      error: (err) => {},
    });
  }

  fetchTechSkills() {
    this.strapiService.getTechSkills().subscribe({
      next: (value) => {
        this.techSkills.set(value.data);
      },
      error: (err) => {},
    });
  }
  fetchEducations() {
    this.strapiService.getEducations().subscribe({
      next: (value) => {
        this.myEducation.set(value.data);
      },
      error: (err) => {},
    });
  }

  fetchContactText() {
    this.strapiService.getContactMeText().subscribe({
      next: (value) => {
        this.contactText.set(value.data.text);
      },
      error: (err) => {},
    });
  }
  fetchCertifications() {
    this.strapiService.getCertifications().subscribe({
      next: (value) => {
        this.myCertification.set(value.data);
      },
      error: (err) => {},
    });
  }
  fetchPreviousJobs() {
    this.strapiService.getPreviousJobs().subscribe({
      next: (value) => {
        this.myPreviousJobs.set(value.data);
      },
      error: (err) => {},
    });
  }

  aboutText = signal<string>('');

  techSkills = signal<SkillInterface[]>([]);

  myEducation = signal<ExperienceInterface[]>([]);

  myCertification = signal<ExperienceInterface[]>([]);

  myPreviousJobs = signal<ExperienceInterface[]>([]);
  contactText = signal<string>('');

  handleDownloadCV() {
    window.open('assets/documents/CV_Lorenzo_Rossini.pdf', '_blank');
  }

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    gsap.registerPlugin(ScrollTrigger);
    const buttonEl1 = document.querySelector(
      '#cv-button-1 button'
    ) as HTMLElement;
    const buttonEl2 = document.querySelector(
      '#cv-button-2 button'
    ) as HTMLElement;
    if (!buttonEl1 && !buttonEl2) return;

    gsap.fromTo(
      buttonEl1,
      { x: -200, autoAlpha: 0 },
      {
        keyframes: [
          { x: 0, autoAlpha: 1, ease: 'power3.out', duration: 0.4 },
          { x: 200, autoAlpha: 0, ease: 'power3.in', duration: 0.4 },
        ],
        duration: 1,
        scrollTrigger: {
          trigger: buttonEl1,
          start: 'top 90%',
          end: 'bottom 10%',
          scrub: true,
          toggleActions: 'play none none reverse',
        },
      }
    );
    gsap.fromTo(
      buttonEl2,
      { x: -200, autoAlpha: 0 },
      {
        keyframes: [
          { x: 0, autoAlpha: 1, ease: 'power3.out', duration: 0.4 },
          { x: 200, autoAlpha: 0, ease: 'power3.in', duration: 0.4 },
        ],
        duration: 1,
        scrollTrigger: {
          trigger: buttonEl2,
          start: 'top 90%',
          end: 'bottom 10%',
          scrub: true,
          toggleActions: 'play none none reverse',
        },
      }
    );
  }
}
