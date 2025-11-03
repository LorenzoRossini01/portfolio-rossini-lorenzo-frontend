import { Component, input } from '@angular/core';
import { ProjectInterface } from '../../sections/my-projects/my-projects';

@Component({
  selector: 'app-project-card',
  imports: [],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css',
})
export class ProjectCard {
  project = input.required<ProjectInterface>();
}
