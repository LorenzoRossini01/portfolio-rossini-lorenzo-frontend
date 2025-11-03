import {
  AfterViewInit,
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { Hero } from '../../sections/hero/hero';
import { AboutMe } from '../../sections/about-me/about-me';
import { SkillInterface, Skills } from '../../sections/skills/skills';
import { ContactMe } from '../../sections/contact-me/contact-me';
import {
  MyProjects,
  ProjectInterface,
} from '../../sections/my-projects/my-projects';
import {
  Experience,
  ExperienceInterface,
} from '../../sections/education/experience';
import { Button } from '../../shared/button/button';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { StrapiService } from '../../services/strapi.service';
import { forkJoin, Subject } from 'rxjs';

@Component({
  selector: 'app-homepage',
  imports: [Hero, AboutMe, Skills, ContactMe, MyProjects, Experience, Button],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css',
})
export class Homepage implements OnInit, AfterViewInit, OnDestroy {
  private strapiService = inject(StrapiService);
  private destroy$ = new Subject<void>();

  isLoading = signal<boolean>(true);

  aboutText = signal<string>('');
  techSkills = signal<SkillInterface[]>([]);
  myEducation = signal<ExperienceInterface[]>([]);
  myCertification = signal<ExperienceInterface[]>([]);
  myPreviousJobs = signal<ExperienceInterface[]>([]);
  contactText = signal<string>('');
  allProjects = signal<ProjectInterface[]>([]);

  ngOnInit(): void {
    this.loadHeroAndAbout();
    setTimeout(() => {
      this.loadRemainingSections();
    }, 1000);
  }

  private loadHeroAndAbout() {
    this.strapiService.getAboutMeText().subscribe({
      next: (res) => {
        this.aboutText.set(res.data.text);
        this.isLoading.set(false);
      },
    });
  }

  private loadRemainingSections() {
    forkJoin([
      this.strapiService.getTechSkills(),
      this.strapiService.getEducations(),
      this.strapiService.getCertifications(),
      this.strapiService.getPreviousJobs(),
      this.strapiService.getProjects(),
      this.strapiService.getContactMeText(),
    ]).subscribe(([skills, edu, certs, jobs, projects, contact]) => {
      this.techSkills.set(skills.data);
      this.myEducation.set(edu.data);
      this.myCertification.set(certs.data);
      this.myPreviousJobs.set(jobs.data);
      this.allProjects.set(projects.data);
      this.contactText.set(contact.data.text);
      this.isLoading.set(false);
    });
  }

  handleDownloadCV() {
    window.open('assets/documents/CV_Lorenzo_Rossini.pdf', '_blank');
  }

  initAnimation() {
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
      {
        x: -200,
        autoAlpha: 0,
        duration: 1,
        scrollTrigger: {
          trigger: buttonEl1,
          start: 'top bottom',
          end: 'bottom center',
          scrub: true,
          toggleActions: 'play none none reverse',
        },
      },
      {
        keyframes: [
          { x: 0, autoAlpha: 1, ease: 'power3.out' },
          { x: 200, autoAlpha: 0, ease: 'power3.in' },
        ],
        duration: 1,
        scrollTrigger: {
          trigger: buttonEl1,
          start: 'top center',
          end: 'bottom top',
          scrub: true,
          toggleActions: 'play none none reverse',
        },
      }
    );
    gsap.fromTo(
      buttonEl2,
      {
        x: 200,
        autoAlpha: 0,
        duration: 1,
        scrollTrigger: {
          trigger: buttonEl2,
          start: 'top bottom',
          end: 'bottom center',
          scrub: true,
          toggleActions: 'play none none reverse',
        },
      },
      {
        keyframes: [
          { x: 0, autoAlpha: 1, ease: 'power3.out' },
          { x: -200, autoAlpha: 0, ease: 'power3.in' },
        ],
        duration: 1,
        scrollTrigger: {
          trigger: buttonEl2,
          start: 'top center',
          end: 'bottom top',
          scrub: true,
          toggleActions: 'play none none reverse',
        },
      }
    );
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initAnimation();
      ScrollTrigger.refresh();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
