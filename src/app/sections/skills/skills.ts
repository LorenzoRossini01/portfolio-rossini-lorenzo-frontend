import {
  Component,
  ElementRef,
  input,
  viewChild,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SkillItem } from '../../components/skill-item/skill-item';
import { MediaInterface } from '../education/experience';

export interface SkillInterface {
  name: string;
  icon: MediaInterface;
  level?: number;
}

@Component({
  selector: 'app-skills',
  imports: [SkillItem],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
})
export class Skills implements AfterViewInit, OnDestroy {
  skillsSection = viewChild<ElementRef>('skillsSection');
  mySkills = input<SkillInterface[]>([]);

  private scrollTriggerInstance?: ScrollTrigger;

  handleDownloadCV() {
    window.open('assets/documents/CV_Lorenzo_Rossini.pdf', '_blank');
  }

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);

    const section = this.skillsSection()?.nativeElement as HTMLElement;
    if (!section) return;

    const rows = Array.from(section.querySelectorAll('.grid')) as HTMLElement[];
    const sectionTitle = section.querySelector('h3') as HTMLElement;
    const skillItems = Array.from(
      section.querySelectorAll('.skill-item')
    ) as HTMLElement[];

    if (!sectionTitle) {
      console.warn('Skills: Section title non trovato');
      return;
    }

    // Imposta lo stato iniziale
    gsap.set(sectionTitle, { opacity: 0 });
    gsap.set(rows, { scale: 0.7, opacity: 0 });

    const tl = gsap.timeline({
      defaults: {
        ease: 'power3.out',
      },
    });

    // Animazione titolo
    tl.fromTo(
      sectionTitle,
      { opacity: 0, x: 500 },
      { opacity: 1, x: 0, duration: 1 }
    );

    // Animazione griglia con stagger
    tl.fromTo(
      rows,
      { scale: 0.7, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
      },
      '-=0.5'
    );

    this.scrollTriggerInstance = ScrollTrigger.create({
      animation: tl,
      trigger: section,
      start: 'top 70%',
      end: 'center 40%',
      scrub: 1,
      // markers: true,
    });
  }

  ngOnDestroy(): void {
    // Cleanup ScrollTrigger
    this.scrollTriggerInstance?.kill();

    const section = this.skillsSection()?.nativeElement;
    if (section) {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger === section) {
          st.kill();
        }
      });
    }
  }
}
