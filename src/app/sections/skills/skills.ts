import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-skills',
  imports: [],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
})
export class Skills {
  @ViewChild('skillsSection', { static: true }) skillsSection!: ElementRef;
  mySkills = signal([
    { name: 'HTML5', icon: 'html5.png' },
    { name: 'HTML5', icon: 'html5.png' },
    { name: 'HTML5', icon: 'html5.png' },
    { name: 'HTML5', icon: 'html5.png' },
    { name: 'HTML5', icon: 'html5.png' },
    { name: 'HTML5', icon: 'html5.png' },
    { name: 'HTML5', icon: 'html5.png' },
    { name: 'HTML5', icon: 'html5.png' },
    { name: 'HTML5', icon: 'html5.png' },
    { name: 'HTML5', icon: 'html5.png' },
    { name: 'HTML5', icon: 'html5.png' },
    { name: 'HTML5', icon: 'html5.png' },
    { name: 'HTML5', icon: 'html5.png' },
    { name: 'HTML5', icon: 'html5.png' },
    { name: 'HTML5', icon: 'html5.png' },
    { name: 'HTML5', icon: 'html5.png' },
    { name: 'HTML5', icon: 'html5.png' },
    { name: 'HTML5', icon: 'html5.png' },
    { name: 'HTML5', icon: 'html5.png' },
    { name: 'HTML5', icon: 'html5.png' },
    { name: 'HTML5', icon: 'html5.png' },
    { name: 'HTML5', icon: 'html5.png' },
    { name: 'HTML5', icon: 'html5.png' },
    { name: 'HTML5', icon: 'html5.png' },
    { name: 'HTML5', icon: 'html5.png' },
  ]);

  handleDownloadCV() {
    window.open('assets/documents/CV_Lorenzo_Rossini.pdf', '_blank');
  }

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);

    const section = this.skillsSection.nativeElement as HTMLElement;
    const rows = Array.from(section.querySelectorAll('.grid')) as HTMLElement[];

    // Animazione riga per riga
    rows.forEach((row) => {
      const icons = Array.from(row.children) as HTMLElement[];

      gsap.set(icons, { opacity: 0, y: 50 }); // stato iniziale
      gsap.to(icons, {
        opacity: 1,
        y: 0,
        stagger: 0.2, // delay tra le icone
        duration: 0.6,
        scrollTrigger: {
          trigger: row,
          start: 'top 80%',
          end: 'top 60%',
          toggleActions: 'play none none none',
          scrub: true,
        },
      });
    });
  }
}
