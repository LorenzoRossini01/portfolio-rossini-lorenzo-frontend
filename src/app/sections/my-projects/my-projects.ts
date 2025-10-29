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
        console.log(value.data);
      },
      error: (err) => {},
    });
  }

  categories = signal([{ label: 'Web Development', value: 'web-development' }]);

  allProjects = signal([
    {
      title: 'Portfolio Website',
      description:
        'A personal portfolio website to showcase my projects and skills.',
      category: 'web-development',
      link: '',
      cover_image: 'https://picsum.photos/200/300',
    },
    {
      title: 'Portfolio Website',
      description:
        'A personal portfolio website to showcase my projects and skills.',
      category: 'web-development',
      link: '',
      cover_image: 'https://picsum.photos/200/300',
    },
    {
      title: 'Portfolio Website',
      description:
        'A personal portfolio website to showcase my projects and skills.',
      category: 'web-development',
      link: '',
      cover_image: 'https://picsum.photos/200/300',
    },
    {
      title: 'E-commerce Platform',
      description: 'An online platform for buying and selling products.',
      category: 'web-development',
      link: '',
      cover_image: 'https://picsum.photos/200/301',
    },
    {
      title: 'Mobile App Design',
      description: 'A user-friendly mobile app design for a fitness tracker.',
      category: 'product-design',
      link: '',
      cover_image: 'https://picsum.photos/200/302',
    },
    {
      title: 'Logo Design',
      description: 'A modern logo design for a tech startup.',
      category: 'product-design',
      link: '',
      cover_image: 'https://picsum.photos/200/303',
    },
    {
      title: 'Blog Writing',
      description: 'Writing engaging blog posts on various tech topics.',
      category: 'other',
      link: '',
      cover_image: 'https://picsum.photos/200/304',
    },
  ]);

  activeCategory = signal('web-development');
  filteredProjects = computed(() =>
    this.allProjects().filter((p) => p.category === this.activeCategory())
  );

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

  private projectTriggers: ScrollTrigger[] = [];

  private initProjectAnimations() {
    this.projectTriggers.forEach((t) => t.kill());
    this.projectTriggers = [];

    const section = this.myProject.nativeElement;
    const sectionTitle = section.querySelector('h3');
    const categoryTitles = section.querySelectorAll('h4');
    const cards = section.querySelectorAll(
      '.project-card'
    ) as NodeListOf<HTMLElement>;
    gsap.from(window, {
      duration: 0.5,
      scrollTo: { x: 0, y: '#projects', offsetY: 100 },
    });
    // reset posizione delle card
    gsap.set(cards, {
      autoAlpha: 0,
      y: 500,
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
    });

    // animazione titolo + categorie
    gsap.from([sectionTitle, ...categoryTitles], {
      autoAlpha: 0,
      y: 100,
      duration: 1,
      stagger: 0.5,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    // timeline per le card
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: '30% center',
        end: `+=${this.filteredProjects().length * 600}`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    });

    // animazione "stack" card una sopra l'altra
    cards.forEach((card, i) => {
      tl.to(
        card,
        {
          autoAlpha: 1,
          y: 0,
          ease: 'power3.out',
          duration: 1,
        },
        i * 0.5
      );
    });

    this.projectTriggers.push(tl.scrollTrigger!);
  }
}
