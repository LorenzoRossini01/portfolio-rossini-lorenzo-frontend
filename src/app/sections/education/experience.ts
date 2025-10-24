import { Component, ElementRef, input, signal, ViewChild } from '@angular/core';

import { ExperienceCard } from '../../components/experience-card/experience-card';

export interface ExperienceInterface {
  institution: string;
  degree: string;
  period: string;
  image: string;
  link?: string;
  details: string;
}

@Component({
  selector: 'app-experience',
  imports: [ExperienceCard],
  templateUrl: './experience.html',
  styleUrl: './experience.css',
})
export class Experience {
  myExperience = input.required<ExperienceInterface[]>();
  title = input('');
}
