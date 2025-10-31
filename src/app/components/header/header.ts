import { Component, signal } from '@angular/core';
import { Button } from '../../shared/button/button';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
gsap.registerPlugin(ScrollToPlugin);

@Component({
  selector: 'app-header',
  imports: [Button],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  drawerOpen = signal(false);
  theme = signal<'light' | 'dark'>('light');

  headerNavLink() {
    return [
      { label: 'About', path: '#about' },
      { label: 'Works', path: '#works' },
      { label: 'Education', path: '#education' },
      { label: 'Projects', path: '#projects' },
      { label: 'Contact', path: '#contact' },
    ];
  }

  activeLink = signal('');

  scrollToSection(link: any) {
    const el = document.querySelector(link.path);
    this.activeLink.set(link.label);

    if (el) {
      switch (link.path) {
        case '#about':
          gsap.to(window, {
            duration: 2,
            ease: 'power3.out',
            scrollTo: { y: '#about', offsetY: 100, autoKill: true },
          });
          break;
        case '#works':
          gsap.to(window, {
            duration: 2,
            ease: 'power3.out',
            scrollTo: { y: '#works', offsetY: 100, autoKill: true },
          });
          break;
        case '#education':
          gsap.to(window, {
            duration: 2,
            ease: 'power3.out',
            scrollTo: { y: '#education', offsetY: -120, autoKill: true },
          });
          break;
        case '#projects':
          gsap.to(window, {
            duration: 2,
            ease: 'power3.out',
            scrollTo: { y: '#projects', offsetY: 0, autoKill: true },
          });
          break;
        case '#contact':
          gsap.to(window, {
            duration: 2,
            ease: 'power3.out',
            scrollTo: { y: '#contact', offsetY: -1000, autoKill: true },
          });
          break;
        default:
          gsap.to(window, {
            duration: 2,
            ease: 'power3.out',
            scrollTo: { y: 0, offsetY: 0, autoKill: true },
          });
          break;
      }
    }
  }

  handleGotToContact() {
    const el = document.querySelector('#contact');
    if (el)
      gsap.to(window, {
        duration: 2,
        ease: 'power3.out',
        scrollTo: { y: '#contact', offsetY: -1000, autoKill: true },
      });
    this.drawerOpen.set(false);
  }

  ngOnInit() {}

  toggleTheme() {
    const newTheme = this.theme() === 'light' ? 'dark' : 'light';
    this.theme.set(newTheme);
    document.documentElement.classList.remove('dark');
    if (newTheme === 'dark') document.documentElement.classList.add('dark');
    if (newTheme === 'light') {
      document.documentElement.classList.add('light-mode-force');
      setTimeout(
        () => document.documentElement.classList.remove('light-mode-force'),
        50
      );
    }
  }
}
