import { Component, input } from '@angular/core';

export interface ProjectCardInterface {
  title: string;
  description: string;
  category: string;
  link: string;
  cover_image: string;
}

@Component({
  selector: 'app-project-card',
  imports: [],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css',
})
export class ProjectCard {
  project = input.required<ProjectCardInterface>();
}
