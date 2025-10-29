import { Component, Inject, PLATFORM_ID, signal } from '@angular/core';
import { Button } from '../../shared/button/button';
import { isPlatformBrowser } from '@angular/common';
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
      gsap.to(window, {
        duration: 2,
        ease: 'power3.out',
        scrollTo: { y: link.path, offsetY: 0, autoKill: true },
      });
    }
  }

  handleGotToContact() {
    const el = document.querySelector('#contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    this.drawerOpen.set(false);
  }

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.theme.set('light');
    }
  }

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
