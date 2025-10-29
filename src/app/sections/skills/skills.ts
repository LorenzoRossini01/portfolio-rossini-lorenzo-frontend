import {
  Component,
  ElementRef,
  Inject,
  input,
  PLATFORM_ID,
  signal,
  ViewChild,
} from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SkillItem } from '../../components/skill-item/skill-item';
import { isPlatformBrowser } from '@angular/common';
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
export class Skills {
  @ViewChild('skillsSection', { static: true }) skillsSection!: ElementRef;
  mySkills = input<SkillInterface[]>([]);

  handleDownloadCV() {
    window.open('assets/documents/CV_Lorenzo_Rossini.pdf', '_blank');
  }
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    gsap.registerPlugin(ScrollTrigger);
    const section = this.skillsSection.nativeElement as HTMLElement;
    const rows = Array.from(section.querySelectorAll('.grid')) as HTMLElement[];
    const sectionTitle = section.querySelector('h3');

    const tl = gsap.timeline();

    tl.from(sectionTitle, {
      autoAlpha: 0,
      x: 500,
      duration: 1,
      ease: 'power3.out',
    });

    // Animazione riga per riga
    rows.forEach((row) => {
      const icons = Array.from(row.children) as HTMLElement[];

      gsap.set(icons, { y: 0 }); // stato iniziale
      tl.from(icons, {
        autoAlpha: 0,
        y: 50,
      });
    });

    tl.from(rows, {
      scale: 0.7,
    });
    ScrollTrigger.create({
      animation: tl,
      trigger: section,
      start: 'center 70%',
      end: '+=700',
      toggleActions: 'restart pause reverse pause',
      scrub: true,
      pin: true,
    });

    const skillItem = document.querySelectorAll('.skill-item');

    skillItem?.forEach((el) =>
      el.addEventListener('mouseenter', (event) => {
        const rect = el.getBoundingClientRect();
        const x = (event as MouseEvent).clientX - rect.left;
        const y = (event as MouseEvent).clientY - rect.top;
        const fromTop = y;
        const fromBottom = rect.height - y;
        const fromLeft = x;
        const fromRight = rect.width - x;

        const min = Math.min(fromTop, fromBottom, fromLeft, fromRight);
        let direction = '';

        switch (min) {
          case fromTop:
            direction = 'top';
            gsap.from(el, {
              scale: 1.2,

              ease: 'bounce.out',
            });
            break;
          case fromBottom:
            direction = 'bottom';
            gsap.from(el, {
              scale: 1.2,

              ease: 'bounce.out',
            });
            break;
          case fromLeft:
            direction = 'left';
            gsap.from(el, {
              rotationY: 180,
              // scale: 1.2,

              ease: 'bounce.out',
            });
            break;
          case fromRight:
            direction = 'right';
            gsap.from(el, {
              rotationY: -180,
              // scale: 1.2,

              ease: 'bounce.out',
            });
            break;
        }
      })
    );
    skillItem?.forEach((el) =>
      el.addEventListener('mouseleave', () => {
        gsap.to(el, {
          rotationY: 0,
          rotationX: 0,
          scale: 1,
          ease: 'power3.out',
        });
      })
    );
  }
}
