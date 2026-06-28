import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
import {
  Profile,
  Experience,
  Project,
  SocialLink,
  PortfolioData,
  Education,
  Skill,
  CurrentJob
} from '../models/portfolio.models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PortfolioDataService {
  private apiUrl = `${environment.apiUrl}/public/portfolio`;

  constructor(private http: HttpClient) {}

  private getPortfolioData(): Observable<PortfolioData> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(data => this.normalizePortfolioData(data)),
      catchError(() =>
        of({
          profile: null,
          educations: [],
          skills: [],
          currentJob: null,
          socialLinks: [],
          experiences: [],
          projects: []
        })
      )
    );
  }

  private normalizePortfolioData(data: any): PortfolioData {
    return {
      profile: data.profile ? this.mapProfile(data) : null,
      educations: this.sortByOrder(data.educations || []),
      skills: this.sortByOrder(data.skills || []),
      currentJob: data.currentJob || null,
      socialLinks: this.sortByOrder(data.socialLinks || []),
      experiences: this.sortByOrder(data.experiences || []),
      projects: this.sortByOrder(data.projects || [])
    };
  }

  private sortByOrder<T extends { displayOrder?: number }>(items: T[]): T[] {
    return [...items].sort(
      (a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0)
    );
  }

  private mapProfile(data: any): Profile {
    const profile = data.profile || {};
    const currentJob = data.currentJob || {};
    const educations: Education[] = this.sortByOrder(data.educations || []);
    const skills: Skill[] = this.sortByOrder(data.skills || []);
    const socialLinks: SocialLink[] = this.sortByOrder(data.socialLinks || []);

    return {
      id: profile.id,
      name: profile.name || 'Your Name',
      role: profile.role || 'Your Role',
      tagline: profile.tagline || 'Your Tagline',
      photoUrl: profile.photoUrl || '/assets/images/profile.png',
      faviconUrl: profile.faviconUrl,
      about: profile.about || '',
      education: educations.map(edu => ({
        id: edu.id,
        degree: edu.degree,
        institute: edu.institute,
        year: edu.year,
        displayOrder: edu.displayOrder
      })),
      skills: skills.map(skill => ({
        id: skill.id,
        name: skill.name,
        displayOrder: skill.displayOrder
      })),
      currentJob: {
        id: currentJob.id,
        title: currentJob.title || '',
        company: currentJob.company || '',
        since: currentJob.since || '',
        description: currentJob.description || ''
      },
      socialLinks: socialLinks.map(link => ({
        id: link.id,
        name: link.name,
        url: link.url,
        icon: link.icon || link.name.substring(0, 2).toUpperCase(),
        displayOrder: link.displayOrder
      }))
    };
  }

  getProfile(): Observable<Profile> {
    return this.getPortfolioData().pipe(
      map(data => data.profile ?? this.mapProfile({ profile: {}, currentJob: {} }))
    );
  }

  getProfileWithSkills(): Observable<Profile> {
    return this.getProfile();
  }

  getExperiences(): Observable<Experience[]> {
    return this.getPortfolioData().pipe(
      map(data =>
        data.experiences.map((exp: any) => ({
          id: exp.id,
          role: exp.role,
          company: exp.company,
          from: exp.fromDate ?? exp.from ?? '',
          to: exp.toDate ?? exp.to ?? '',
          description: exp.descriptions ?? exp.description ?? [],
          displayOrder: exp.displayOrder
        }))
      )
    );
  }

  getProjects(): Observable<Project[]> {
    return this.getPortfolioData().pipe(
      map(data =>
        data.projects.map(proj => ({
          id: proj.id,
          name: proj.name,
          description: proj.description,
          techStack: proj.techStack || [],
          liveUrl: this.trimUrl(proj.liveUrl),
          githubUrl: this.trimUrl(proj.githubUrl),
          demoUrl: this.trimUrl(proj.demoUrl),
          imageUrl: this.trimUrl(proj.imageUrl),
          displayOrder: proj.displayOrder
        }))
      )
    );
  }

  getSocialLinks(): Observable<SocialLink[]> {
    return this.getPortfolioData().pipe(
      map(data =>
        data.socialLinks.map(link => ({
          id: link.id,
          name: link.name,
          url: link.url,
          icon: link.icon || link.name.substring(0, 2).toUpperCase(),
          displayOrder: link.displayOrder
        }))
      )
    );
  }

  private trimUrl(url?: string | null): string | undefined {
    return url && url.trim() !== '' ? url : undefined;
  }
}
