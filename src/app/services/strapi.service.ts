import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { ExperienceInterface } from '../sections/education/experience';
import { SkillInterface } from '../sections/skills/skills';
import { environment } from '../../environments/environment';
import { ProjectInterface } from '../sections/my-projects/my-projects';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root',
})
export class StrapiService {
  private readonly baseUrl = `${environment.apiBaseUrl}/api`;

  constructor(private http: HttpClient, private cache: CacheService) {}

  getAboutMeText(): Observable<{ data: { text: string } }> {
    const cacheKey = 'aboutText';
    const cached = this.cache.get<{ text: string }>(cacheKey);
    if (cached) {
      return of({ data: cached });
    }
    return this.http
      .get<{ data: { text: string } }>(`${this.baseUrl}/about-me-text`)
      .pipe(tap((res) => this.cache.set(cacheKey, res.data, 60)));
  }
  getTechSkills(): Observable<{ data: SkillInterface[] }> {
    const cacheKey = 'techSkills';
    const cached = this.cache.get<SkillInterface[]>(cacheKey);
    if (cached) {
      return of({ data: cached });
    }
    return this.http
      .get<{ data: SkillInterface[] }>(`${this.baseUrl}/tech-skills?populate=*`)
      .pipe(tap((res) => this.cache.set(cacheKey, res.data, 60)));
  }
  getCertifications(): Observable<{ data: ExperienceInterface[] }> {
    const cacheKey = 'certifications';
    const cached = this.cache.get<ExperienceInterface[]>(cacheKey);
    if (cached) {
      return of({ data: cached });
    }
    return this.http
      .get<{ data: ExperienceInterface[] }>(
        `${this.baseUrl}/certifications?populate=*`
      )
      .pipe(tap((res) => this.cache.set(cacheKey, res.data, 60)));
  }
  getEducations(): Observable<{ data: ExperienceInterface[] }> {
    const cacheKey = 'educations';
    const cached = this.cache.get<ExperienceInterface[]>(cacheKey);
    if (cached) {
      return of({ data: cached });
    }
    return this.http
      .get<{ data: ExperienceInterface[] }>(
        `${this.baseUrl}/educations?populate=*`
      )
      .pipe(tap((res) => this.cache.set(cacheKey, res.data, 60)));
  }
  getPreviousJobs(): Observable<{ data: ExperienceInterface[] }> {
    const cacheKey = 'previousJobs';
    const cached = this.cache.get<ExperienceInterface[]>(cacheKey);
    if (cached) {
      return of({ data: cached });
    }
    return this.http
      .get<{ data: ExperienceInterface[] }>(
        `${this.baseUrl}/previous-jobs?populate=*`
      )
      .pipe(tap((res) => this.cache.set(cacheKey, res.data, 60)));
  }

  getContactMeText(): Observable<{ data: { text: string } }> {
    const cacheKey = 'contactText';
    const cached = this.cache.get<{ text: string }>(cacheKey);
    if (cached) {
      return of({ data: cached });
    }
    return this.http
      .get<{ data: { text: string } }>(`${this.baseUrl}/contact-me-text`)
      .pipe(tap((res) => this.cache.set(cacheKey, res.data, 60)));
  }
  getProjects(): Observable<{ data: ProjectInterface[] }> {
    return this.http.get<{ data: ProjectInterface[] }>(
      `${this.baseUrl}/projects?populate=*`
    );
  }
}
