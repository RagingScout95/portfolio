import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, of } from 'rxjs';
import { Project, Skill } from '../models/portfolio.models';

export interface GitHubUser {
  login: string;
  name: string;
  bio: string | null;
  avatar_url: string;
  location: string | null;
  blog: string | null;
  html_url: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  languages_url: string;
  created_at: string;
  updated_at: string;
  topics: string[];
  fork: boolean;
}

export interface RepoLanguages {
  [key: string]: number;
}

@Injectable({
  providedIn: 'root'
})
export class GitHubApiService {
  private apiUrl = 'https://api.github.com';
  private username = 'RagingScout95';

  constructor(private http: HttpClient) {}

  getUserProfile(): Observable<GitHubUser> {
    return this.http.get<GitHubUser>(`${this.apiUrl}/users/${this.username}`);
  }

  getUserRepositories(): Observable<GitHubRepo[]> {
    return this.http.get<GitHubRepo[]>(`${this.apiUrl}/users/${this.username}/repos?sort=updated&per_page=100`);
  }

  getRepositoryLanguages(repoName: string): Observable<RepoLanguages> {
    return this.http.get<RepoLanguages>(`${this.apiUrl}/repos/${this.username}/${repoName}/languages`);
  }

  getProjectsFromRepos(): Observable<Project[]> {
    return this.getUserRepositories().pipe(
      map(repos => {
        // Filter out the portfolio repo itself and fork repos, prioritize repos with descriptions
        const filteredRepos = repos
          .filter(repo => 
            !repo.name.toLowerCase().includes('portfolio') && 
            !repo.fork &&
            repo.description
          )
          .slice(0, 12); // Limit to top 12 projects

        return filteredRepos.map(repo => ({
          name: this.formatProjectName(repo.name),
          description: repo.description || 'No description available',
          techStack: repo.language ? [repo.language] : [],
          liveUrl: repo.homepage || undefined,
          githubUrl: repo.html_url
        }));
      })
    );
  }

  getSkillsFromRepos(): Observable<Skill[]> {
    return this.getUserRepositories().pipe(
      map(repos => {
        const languageSet = new Set<string>();
        
        repos.forEach(repo => {
          if (repo.language) {
            languageSet.add(repo.language);
          }
        });

        // Add common skills that might not be detected
        const commonSkills = ['Git', 'GitHub', 'TypeScript', 'JavaScript', 'HTML', 'CSS'];
        commonSkills.forEach(skill => languageSet.add(skill));

        return Array.from(languageSet)
          .map(lang => ({ name: lang }))
          .sort((a, b) => a.name.localeCompare(b.name));
      })
    );
  }

  private formatProjectName(name: string): string {
    // Convert kebab-case or snake_case to Title Case
    return name
      .split(/[-_]/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
}

