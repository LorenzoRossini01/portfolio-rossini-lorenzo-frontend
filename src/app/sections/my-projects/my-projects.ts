import {
  Component,
  ElementRef,
  ViewChild,
  Inject,
  PLATFORM_ID,
  computed,
  signal,
  inject,
  OnInit,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ProjectCard } from '../../components/project-card/project-card';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { StrapiService } from '../../services/strapi.service';

@Component({
  selector: 'app-my-projects',
  imports: [ProjectCard],
  templateUrl: './my-projects.html',
  styleUrls: ['./my-projects.css'],
})
export class MyProjects implements OnInit {
  private strapiService = inject(StrapiService);
  @ViewChild('myProject', { static: true }) myProject!: ElementRef;

  ngOnInit() {
    this.fetchProjects();
  }

  fetchProjects() {
    this.strapiService.getProjects().subscribe({
      next: (value) => {
        this.allProjects.set(value.data);
      },
      error: (err) => {},
    });
  }

  categories = signal('Web Development');

  allProjects = signal([]);

  activeCategory = signal('web-development');

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  handleCategorySelect(value: string) {
    this.activeCategory.set(value);

    // aspetta che Angular aggiorni il DOM
    requestAnimationFrame(() => {
      // uccidi solo i trigger relativi alla sezione dei progetti
      ScrollTrigger.getAll()
        .filter((t) => t.trigger?.id === 'projects') // o qualunque selettore specifico
        .forEach((t) => t.kill());

      this.initProjectAnimations();
    });
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    this.initProjectAnimations();
  }

  private initProjectAnimations() {
    const section = this.myProject.nativeElement as HTMLElement;
    const sectionTitle = section.querySelector('h3');
    const sectionSubtitle = section.querySelector('h4');
    const cards = section.querySelectorAll(
      '.project-card'
    ) as NodeListOf<HTMLElement>;

    if (!section || cards.length === 0) return;

    // kill eventuali trigger vecchi

    // inizializza stack
    cards.forEach((card, i) => {
      gsap.set(card, {
        autoAlpha: 1,
        y: 500,
        scale: 0.9,
        position: 'absolute',
        top: 0,
        width: '100%',
        zIndex: cards.length - i, // prima sotto, ultima sopra
        pointerEvents: 'none',
      });
    });

    const sectionScrollLength = cards.length * 300;

    // timeline unica
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'center 80%',
        end: `+=${sectionScrollLength}`,
        scrub: true,
        pin: true,
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
          `-=${0.1}` // leggero overlap tra fade-in/fade-out
        );
      }
    });
  }
}
