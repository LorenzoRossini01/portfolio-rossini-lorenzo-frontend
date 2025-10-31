import {
  AfterViewInit,
  Component,
  DestroyRef,
  inject,
  OnDestroy,
  OnInit,
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

import { StrapiService } from '../../services/strapi.service';
import { catchError, forkJoin, of, Subject, takeUntil, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-homepage',
  imports: [Hero, AboutMe, Skills, ContactMe, MyProjects, Experience, Button],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css',
})
export class Homepage implements OnInit, AfterViewInit, OnDestroy {
  private strapiService = inject(StrapiService);
  private destroyRef = inject(DestroyRef);

  loadingProgress = signal<number>(0);
  isLoading = signal<boolean>(true);

  aboutText = signal<string>('');
  techSkills = signal<SkillInterface[]>([]);
  myEducation = signal<ExperienceInterface[]>([]);
  myCertification = signal<ExperienceInterface[]>([]);
  myPreviousJobs = signal<ExperienceInterface[]>([]);
  contactText = signal<string>('');
  allProjects = signal<any[]>([]);

  ngOnInit(): void {
    this.loadAllContent();
  }

  private loadAllContent() {
    const requests = [
      this.strapiService.getAboutMeText().pipe(
        tap((res) => this.aboutText.set(res.data.text)),
        catchError(() => of(null))
      ),
      this.strapiService.getTechSkills().pipe(
        tap((res) => this.techSkills.set(res.data)),
        catchError(() => of(null))
      ),
      this.strapiService.getEducations().pipe(
        tap((res) => this.myEducation.set(res.data)),
        catchError(() => of(null))
      ),
      this.strapiService.getCertifications().pipe(
        tap((res) => this.myCertification.set(res.data)),
        catchError(() => of(null))
      ),
      this.strapiService.getPreviousJobs().pipe(
        tap((res) => this.myPreviousJobs.set(res.data)),
        catchError(() => of(null))
      ),
      this.strapiService.getContactMeText().pipe(
        tap((res) => this.contactText.set(res.data.text)),
        catchError(() => of(null))
      ),
      this.strapiService.getProjects().pipe(
        tap((res) => this.allProjects.set(res.data)),
        catchError(() => of(null))
      ),
    ];

    const total = requests.length;
    let completed = 0;

    requests.forEach((req) => {
      req
        .pipe(
          tap(() => {
            completed++;
            this.loadingProgress.set(Math.floor((completed / total) * 100));
          })
        )
        .subscribe();
    });

    forkJoin(requests)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.loadingProgress.set(100);
        setTimeout(() => this.isLoading.set(false), 300);
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
    // this.destroy$.next();
    // this.destroy$.complete();
  }
}
