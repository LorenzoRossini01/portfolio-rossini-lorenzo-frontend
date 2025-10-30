import {
  Component,
  ElementRef,
  ViewChild,
  signal,
  inject,
  OnInit,
  AfterViewInit,
  OnDestroy,
  input,
  effect,
} from '@angular/core';
import { ProjectCard } from '../../components/project-card/project-card';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { StrapiService } from '../../services/strapi.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-my-projects',
  imports: [ProjectCard],
  templateUrl: './my-projects.html',
  styleUrls: ['./my-projects.css'],
})
export class MyProjects implements AfterViewInit, OnDestroy {
  @ViewChild('myProject', { static: true }) myProject!: ElementRef;

  allProjects = input<any[]>([]);
  categories = signal('Web Development');

  constructor() {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    effect(() => {
      const projects = this.allProjects();

      if (projects && projects.length > 0) {
        setTimeout(() => {
          this.initProjectAnimations();
        }, 100);
      }
    });
  }

  ngAfterViewInit(): void {}

  private initProjectAnimations() {
    const section = this.myProject.nativeElement as HTMLElement;
    const sectionTitle = section.querySelector('h3');
    const sectionSubtitle = section.querySelector('h4');
    const cards = section.querySelectorAll(
      '.project-card'
    ) as NodeListOf<HTMLElement>;

    if (!section || cards.length === 0) return;

    // Crea un wrapper da pinnare

    // inizializza stack
    cards.forEach((card, i) => {
      gsap.set(card, {
        autoAlpha: 1,
        y: 500,
        scale: 0.9,
        position: 'absolute',
        top: 0,
        width: '100%',
        zIndex: cards.length - i,
        pointerEvents: 'none',
      });
    });

    const sectionScrollLength = cards.length * 300;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: `+=${sectionScrollLength}`,
        scrub: true,
        pin: section,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        // markers: true,
      },
    });

    // animazione titoli
    tl.from([sectionTitle, sectionSubtitle], {
      autoAlpha: 0,
      y: 100,
      duration: 1,
      ease: 'power3.out',
    });

    // animazione stack card
    cards.forEach((card, i) => {
      tl.to(card, {
        autoAlpha: 1,
        y: 0,
        zIndex: cards.length + i,
        scale: 1,
        pointerEvents: 'auto',
        duration: 1.5,
        ease: 'power2.out',
        delay: 0.5,
        snap: '1',
      });

      if (i > 0) {
        const prevCard = cards[i - 1];
        tl.to(
          prevCard,
          {
            autoAlpha: 0,
            pointerEvents: 'none',
            duration: 0.5,
            ease: 'power1.out',
          },
          `-=${0.1}` // leggero overlap
        );
      }
    });

    // Aggiorna ScrollTrigger
    ScrollTrigger.refresh();
  }

  ngOnDestroy(): void {
    // Pulisci tutti gli ScrollTrigger di questo componente
    ScrollTrigger.getAll().forEach((st) => {
      if (st.vars.trigger === this.myProject?.nativeElement) {
        st.kill();
      }
    });
  }
}
