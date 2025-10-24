import { Component, computed, signal } from '@angular/core';
import { link } from 'fs';
import { ProjectCard } from '../../components/project-card/project-card';

@Component({
  selector: 'app-my-projects',
  imports: [ProjectCard],
  templateUrl: './my-projects.html',
  styleUrl: './my-projects.css',
})
export class MyProjects {
  categories = signal([
    {
      label: 'Web Development',
      value: 'web-development',
    },
    {
      label: 'Product Design',
      value: 'product-design',
    },
    {
      label: 'Other',
      value: 'other',
    },
  ]);

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

  filteredProjects = computed(() => {
    return this.allProjects().filter(
      (project) => project.category === this.activeCategory()
    );
  });
  activeCategory = signal('web-development');

  handleCategorySelect(value: string) {
    this.activeCategory.set(value);
  }
}
