import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
import { Profile, Experience, Project, SocialLink } from '../models/portfolio.models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PortfolioDataService {
  private apiUrl = `${environment.apiUrl}/public/portfolio`;

  constructor(
    private http: HttpClient
  ) {}

  private getPortfolioData(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(
      catchError(() => {
        // Fallback to empty data if API fails
        return of({
          profile: null,
          educations: [],
          skills: [],
          currentJob: null,
          socialLinks: [],
          experiences: [],
          projects: []
        });
      })
    );
  }

  getProfile(): Observable<Profile> {
    return this.getPortfolioData().pipe(
      map(data => {
        const profile = data.profile || {};
        const currentJob = data.currentJob || {};
        const educations = data.educations || [];
        const skills = data.skills || [];
        const socialLinks = data.socialLinks || [];
        
        return {
          name: profile.name || 'Your Name',
          role: profile.role || 'Your Role',
          tagline: profile.tagline || 'Your Tagline',
          photoUrl: profile.photoUrl || 'https://via.placeholder.com/400x400',
          faviconUrl: profile.faviconUrl,
          about: profile.about || 'Your About section',
          education: educations.map((edu: any) => ({
            degree: edu.degree,
            institute: edu.institute,
            year: edu.year
          })),
          skills: skills.map((skill: any) => ({
            name: skill.name
          })),
          currentJob: {
            title: currentJob.title || 'Current Job Title',
            company: currentJob.company || 'Company Name',
            since: currentJob.since || 'Date',
            description: currentJob.description || 'Job Description'
          },
          socialLinks: socialLinks.map((link: any) => ({
            name: link.name,
            url: link.url,
            icon: link.icon || link.name.substring(0, 2).toUpperCase()
          }))
        };
      })
    );
  }

  getProfileWithSkills(): Observable<Profile> {
    return this.getProfile();
  }

  getExperiences(): Observable<Experience[]> {
    return this.getPortfolioData().pipe(
      map(data => {
        const experiences = data.experiences || [];
        return experiences.map((exp: any) => ({
          role: exp.role,
          company: exp.company,
          from: exp.fromDate,
          to: exp.toDate,
          description: exp.descriptions || []
        }));
      })
    );
  }

  getProjects(): Observable<Project[]> {
    return this.getPortfolioData().pipe(
      map(data => {
        const projects = data.projects || [];
        return projects.map((proj: any) => ({
          name: proj.name,
          description: proj.description,
          techStack: proj.techStack || [],
          liveUrl: proj.liveUrl && proj.liveUrl.trim() !== '' ? proj.liveUrl : undefined,
          githubUrl: proj.githubUrl && proj.githubUrl.trim() !== '' ? proj.githubUrl : undefined,
          demoUrl: proj.demoUrl && proj.demoUrl.trim() !== '' ? proj.demoUrl : undefined,
          imageUrl: proj.imageUrl && proj.imageUrl.trim() !== '' ? proj.imageUrl : undefined
        }));
      })
    );
  }

  getSocialLinks(): Observable<SocialLink[]> {
    return this.getPortfolioData().pipe(
      map(data => {
        const socialLinks = data.socialLinks || [];
        return socialLinks.map((link: any) => ({
          name: link.name,
          url: link.url,
          icon: link.icon || link.name.substring(0, 2).toUpperCase()
        }));
      })
    );
  }
}





