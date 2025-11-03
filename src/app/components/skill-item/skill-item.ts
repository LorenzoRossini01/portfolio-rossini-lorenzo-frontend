import { AfterViewInit, Component, input, signal } from '@angular/core';
import { SkillInterface } from '../../sections/skills/skills';

import { gsap } from 'gsap';

@Component({
  selector: 'app-skill-item',
  imports: [],
  templateUrl: './skill-item.html',
  styleUrl: './skill-item.css',
})
export class SkillItem implements AfterViewInit {
  skill = input.required<SkillInterface>();
  imageLoaded = signal<boolean>(false);

  ngAfterViewInit(): void {}
}
