import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, catchError, of } from 'rxjs';
import { Profile, Experience, Project, SocialLink } from '../models/portfolio.models';
import { GitHubApiService } from './github-api.service';

@Injectable({
  providedIn: 'root'
})
export class PortfolioDataService {
  private linkedInUrl = 'https://www.linkedin.com/in/prakhar-singh-rajput-7684b887/';
  private githubUrl = 'https://github.com/RagingScout95';

  constructor(
    private http: HttpClient,
    private githubApi: GitHubApiService
  ) {}

  getProfile(): Observable<Profile> {
    return this.githubApi.getUserProfile().pipe(
      map(githubUser => ({
        name: githubUser.name || 'Prakhar Singh Rajput',
        role: 'Software Developer', // You can update this manually
        tagline: githubUser.bio || 'Building innovative software solutions',
        photoUrl: githubUser.avatar_url,
        about: githubUser.bio || 'Passionate software developer with experience in building applications across various technologies. I love solving complex problems and creating intuitive user experiences.',
        education: [
          // Add your education details here manually
          // {
          //   degree: 'Your Degree',
          //   institute: 'Your Institute',
          //   year: 'Year'
          // }
        ],
        skills: [] as { name: string }[], // Will be populated from GitHub
        currentJob: {
          title: 'Software Developer', // Update this manually from LinkedIn
          company: 'Company Name', // Update this manually from LinkedIn
          since: 'Date', // Update this manually from LinkedIn
          description: 'Your current job description' // Update this manually from LinkedIn
        },
        socialLinks: [
          {
            name: 'GitHub',
            url: this.githubUrl,
            icon: 'GH'
          },
          {
            name: 'LinkedIn',
            url: this.linkedInUrl,
            icon: 'LI'
          }
        ]
      })),
      catchError(() => {
        // Fallback to default profile if API fails
        return of(this.getDefaultProfile());
      })
    );
  }

  getProfileWithSkills(): Observable<Profile> {
    return forkJoin({
      profile: this.getProfile(),
      skills: this.githubApi.getSkillsFromRepos()
    }).pipe(
      map(({ profile, skills }) => ({
        ...profile,
        skills
      }))
    );
  }

  private getDefaultProfile(): Profile {
    return {
      name: 'Prakhar Singh Rajput',
      role: 'Software Developer',
      tagline: 'Building innovative software solutions',
      photoUrl: 'https://via.placeholder.com/400x400',
      about: 'Passionate software developer with experience in building applications across various technologies.',
      education: [],
      skills: [],
      currentJob: {
        title: 'Software Developer',
        company: 'Company Name',
        since: 'Date',
        description: 'Your current job description'
      },
      socialLinks: [
        {
          name: 'GitHub',
          url: this.githubUrl,
          icon: 'GH'
        },
        {
          name: 'LinkedIn',
          url: this.linkedInUrl,
          icon: 'LI'
        }
      ]
    };
  }

  getExperiences(): Observable<Experience[]> {
    // LinkedIn data needs to be added manually
    // For now, return empty array - you can add your experiences manually
    return of([
      // Add your experiences here manually from LinkedIn
      // {
      //   role: 'Your Role',
      //   company: 'Company Name',
      //   from: 'Start Date',
      //   to: 'End Date or Present',
      //   description: [
      //     'Achievement 1',
      //     'Achievement 2',
      //     'Achievement 3'
      //   ]
      // }
    ]);
  }

  getProjects(): Observable<Project[]> {
    return this.githubApi.getProjectsFromRepos().pipe(
      catchError(() => {
        // Fallback to empty array if API fails
        return of([]);
      })
    );
  }

  getSocialLinks(): Observable<SocialLink[]> {
    return this.getProfile().pipe(
      map(profile => profile.socialLinks),
      catchError(() => {
        return of([
          {
            name: 'GitHub',
            url: this.githubUrl,
            icon: 'GH'
          },
          {
            name: 'LinkedIn',
            url: this.linkedInUrl,
            icon: 'LI'
          }
        ]);
      })
    );
  }
}





