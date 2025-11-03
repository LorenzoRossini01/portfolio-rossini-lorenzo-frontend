import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExperienceInterface } from '../sections/education/experience';
import { SkillInterface } from '../sections/skills/skills';
import { environment } from '../../environments/environment';
import { ProjectInterface } from '../sections/my-projects/my-projects';

@Injectable({
  providedIn: 'root',
})
export class StrapiService {
  private readonly baseUrl = `${environment.apiBaseUrl}/api`;

  constructor(private http: HttpClient) {}

  getAboutMeText(): Observable<{ data: { text: string } }> {
    return this.http.get<{ data: { text: string } }>(
      `${this.baseUrl}/about-me-text`
    );
  }
  getTechSkills(): Observable<{ data: SkillInterface[] }> {
    return this.http.get<{ data: SkillInterface[] }>(
      `${this.baseUrl}/tech-skills?populate=*`
    );
  }
  getCertifications(): Observable<{ data: ExperienceInterface[] }> {
    return this.http.get<{ data: ExperienceInterface[] }>(
      `${this.baseUrl}/certifications?populate=*`
    );
  }
  getEducations(): Observable<{ data: ExperienceInterface[] }> {
    return this.http.get<{ data: ExperienceInterface[] }>(
      `${this.baseUrl}/educations?populate=*`
    );
  }
  getPreviousJobs(): Observable<{ data: ExperienceInterface[] }> {
    return this.http.get<{ data: ExperienceInterface[] }>(
      `${this.baseUrl}/previous-jobs?populate=*`
    );
  }

  getContactMeText(): Observable<{ data: { text: string } }> {
    return this.http.get<{ data: { text: string } }>(
      `${this.baseUrl}/contact-me-text`
    );
  }
  getProjects(): Observable<{ data: ProjectInterface[] }> {
    return this.http.get<{ data: ProjectInterface[] }>(
      `${this.baseUrl}/projects?populate=*`
    );
  }
}
