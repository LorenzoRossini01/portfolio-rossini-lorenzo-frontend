import { Component, Inject, PLATFORM_ID, signal } from '@angular/core';
import { Hero } from '../../sections/hero/hero';
import { AboutMe } from '../../sections/about-me/about-me';
import { Skills } from '../../sections/skills/skills';
import { ContactMe } from '../../sections/contact-me/contact-me';
import { MyProjects } from '../../sections/my-projects/my-projects';
import { Experience } from '../../sections/education/experience';
import { Button } from '../../shared/button/button';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { log } from 'console';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-homepage',
  imports: [Hero, AboutMe, Skills, ContactMe, MyProjects, Experience, Button],
  templateUrl: './homepage.html',
  styleUrl: './homepage.css',
})
export class Homepage {
  myEducation = signal([
    {
      institution: 'Boolean',
      degree: 'Full Stack Web Developer Master',
      period: 'November 2023 - May 2024',
      image: 'boolean-logo.png',
      details:
        'An intensive 700-hour full-time course combining theoretical and practical lessons. I learned the fundamentals of web development, both front-end (HTML, CSS, JS, Vue.js) and back-end (PHP, MySQL, Laravel).',
    },
    {
      institution: 'Politecnico di Milano',
      degree: "Bachelor's Degree in Industrial Product Design",
      period: 'September 2020 - September 2023',
      image: 'polimi-logo.png',
      details:
        'A program that combines theoretical and practical courses, through which I learned the principles of good design and the entire process from project brief to production-ready solutions. Working on team-based projects helped me develop strong collaboration skills and a solid problem-solving mindset.',
    },
    {
      institution: 'Enrico Fermi High School, Cantù (CO)',
      degree: 'High School Diploma – Applied Sciences',
      period: 'September 2015 - June 2020',
      image: 'fermi-logo.png',
      details:
        'This experience introduced me to computer science and basic algorithms. The scientific subjects strengthened my logical and analytical thinking approach.',
    },
  ]);

  myCertification = signal([
    {
      institution: 'Udemy',
      degree: 'Angular – The Complete Guide 2025',
      period: 'July 2025 - September 2025',
      image: 'udemy-logo.png',
      link: 'https://www.udemy.com/certificate/UC-d9ac7fbf-9b14-41e4-a8c3-da019634d2ed/',
      details:
        'Taught by Maximilian Schwarzmüller, this course is fully updated to the latest version of Angular and covers standalone components, signals, and all the newest features. It starts from the basics, including TypeScript fundamentals, and includes a complete real-world project. It also explores older versions of Angular, making it useful in any professional context.',
    },
    {
      institution: 'Udemy',
      degree: 'Understanding TypeScript',
      period: 'June 2025 - July 2025',
      image: 'udemy-logo.png',
      link: 'https://www.udemy.com/certificate/UC-60737f45-382f-47a3-8cf1-73d0252b4401/',
      details:
        'Also taught by Maximilian Schwarzmüller, this course covers TypeScript from the ground up, from basic types to advanced topics like decorators, generics, and Webpack configurations. It demonstrates how to use TypeScript with Angular, React, and Node.js, improving code quality and safety. Includes hands-on exercises and real-world projects.',
    },
    {
      institution: 'Udemy',
      degree: 'JavaScript – The Complete Guide 2025',
      period: 'May 2025 - June 2025',
      image: 'udemy-logo.png',
      link: 'https://www.udemy.com/certificate/UC-437d5b1a-ff55-48f3-ae66-99fbfb8f358d/',
      details:
        'A complete course by Maximilian Schwarzmüller, teaching JavaScript from the very basics to advanced concepts. It covers modern syntax, data structures, OOP, asynchronous programming, DOM manipulation, HTTP, Node.js, and performance optimization. Includes projects, quizzes, and insights into frameworks like React.js. Perfect for both beginners and those seeking a full reference guide.',
    },
  ]);

  myPreviousJobs = signal([
    {
      institution: 'Accenture',
      degree: 'Frontend Developer Intern',
      period: 'February 2025 - May 2025',
      image: 'accenture-logo.png',
      details:
        'Worked as a Frontend Developer intern, contributing to web application interfaces and gaining hands-on experience with modern technologies in a professional team environment. Improved my technical and problem-solving skills through real projects and code reviews.',
    },
    {
      institution: 'Accenture',
      degree: 'Frontend Developer Intern',
      period: 'September 2024 - February 2025',
      image: 'accenture-logo.png',
      details:
        'First internship experience in frontend development. Collaborated with senior developers and designers on responsive web projects. Learned to work effectively in an Agile team and gained a deep understanding of modern development workflows.',
    },
  ]);

  handleDownloadCV() {
    window.open('assets/documents/CV_Lorenzo_Rossini.pdf', '_blank');
  }

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

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
      { x: -200, autoAlpha: 0 },
      {
        keyframes: [
          { x: 0, autoAlpha: 1, ease: 'power3.out', duration: 0.4 },
          { x: 200, autoAlpha: 0, ease: 'power3.in', duration: 0.4 },
        ],
        duration: 1,
        scrollTrigger: {
          trigger: buttonEl1,
          start: 'top 90%',
          end: 'bottom 10%',
          scrub: true,
          toggleActions: 'play none none reverse',
        },
      }
    );
    gsap.fromTo(
      buttonEl2,
      { x: -200, autoAlpha: 0 },
      {
        keyframes: [
          { x: 0, autoAlpha: 1, ease: 'power3.out', duration: 0.4 },
          { x: 200, autoAlpha: 0, ease: 'power3.in', duration: 0.4 },
        ],
        duration: 1,
        scrollTrigger: {
          trigger: buttonEl2,
          start: 'top 90%',
          end: 'bottom 10%',
          scrub: true,
          toggleActions: 'play none none reverse',
        },
      }
    );
  }
}
