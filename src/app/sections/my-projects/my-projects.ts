import {
  Component,
  ElementRef,
  ViewChild,
  signal,
  OnDestroy,
  input,
  effect,
} from '@angular/core';
import { ProjectCard } from '../../components/project-card/project-card';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { MediaInterface } from '../education/experience';
import { SkillInterface } from '../skills/skills';

export interface ProjectInterface {
  client: string;
  cover_image: MediaInterface;
  description: string;
  description_excerpt: string;
  gallery: MediaInterface[];
  id: number;
  project_type: string;
  project_url: string;
  repository_url: string;
  slug: string;
  tech_skill: SkillInterface[];
  title: string;
}

@Component({
  selector: 'app-my-projects',
  imports: [ProjectCard],
  templateUrl: './my-projects.html',
  styleUrls: ['./my-projects.css'],
})
export class MyProjects implements OnDestroy {
  @ViewChild('myProject', { static: true }) myProject!: ElementRef;

  allProjects = input<ProjectInterface[]>([]);
  categories = signal('Web Development');

  constructor() {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    effect(() => {
      const projects = this.allProjects();
      console.log(projects);

      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === this.myProject?.nativeElement) {
          st.kill();
        }
      });

      if (projects && projects.length > 0) {
        setTimeout(() => {
          this.initProjectAnimations();
        }, 100);
      }
    });
  }

  private initProjectAnimations() {
    const section = this.myProject.nativeElement as HTMLElement;

    const pinWrapper = section.querySelector('.pin-wrapper') as HTMLElement;
    const stage = section.querySelector('.projects-stack') as HTMLElement;
    const sectionTitle = section.querySelector('h3');
    const sectionSubtitle = section.querySelector('h4');
    const cards = section.querySelectorAll(
      '.project-card'
    ) as NodeListOf<HTMLElement>;

    if (!section || !pinWrapper || !stage || cards.length === 0) {
      console.warn('GSAP: Elementi animazione non trovati.');
      return;
    }

    if (sectionTitle) {
      gsap.fromTo(
        sectionTitle,
        { autoAlpha: 0, x: 500 },
        {
          autoAlpha: 1,
          y: 0,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    // inizializza stack
    cards.forEach((card, i) => {
      gsap.set(card, {
        autoAlpha: 1,
        y: 500,
        scale: 0.9,
        position: 'absolute',
        top: 0,
        zIndex: cards.length - i,
        pointerEvents: 'none',
      });
    });

    const sectionScrollLength = cards.length * 500;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: `+=${sectionScrollLength}`,
        scrub: true,
        pin: pinWrapper,
        pinSpacing: true,
        invalidateOnRefresh: true,
        // markers: true,
      },
    });

    if (sectionSubtitle) {
      tl.fromTo(
        sectionSubtitle,
        { autoAlpha: 0, y: 100 },
        { autoAlpha: 1, y: 0, ease: 'power3.out' },
        0
      );
    }

    tl.addLabel('startStack', '+=0.2');

    cards.forEach((card, i) => {
      const startTime = i === 0 ? 'startStack' : '+=0.5';

      tl.to(
        card,
        {
          autoAlpha: 1,
          y: 0,
          zIndex: cards.length + i,
          scale: 1,
          pointerEvents: 'auto',
          ease: 'power2.out',
        },
        startTime
      );

      if (i > 0) {
        const prevCard = cards[i - 1];
        tl.to(
          prevCard,
          {
            autoAlpha: 0,
            pointerEvents: 'none',
            ease: 'power1.out',
          },
          '<'
        );
      }
    });

    if (cards.length > 0) {
      tl.to(
        [cards[cards.length - 1], sectionSubtitle],
        {
          autoAlpha: 0,
          pointerEvents: 'none',
        },
        '+=1.0'
      );
    }
  }

  ngOnDestroy(): void {
    ScrollTrigger.getAll().forEach((st) => {
      if (st.vars.trigger === this.myProject?.nativeElement) {
        st.kill();
      }
    });
  }
}
