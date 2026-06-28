import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { prefersReducedMotion } from '../motion/motion.util';

const BOOT_KEY = 'cockpit_boot_seen';

@Injectable({ providedIn: 'root' })
export class BootService {
  private completeSubject = new BehaviorSubject(false);
  readonly bootComplete$ = this.completeSubject.asObservable();

  shouldShowBoot(): boolean {
    if (prefersReducedMotion()) return false;
    try {
      return sessionStorage.getItem(BOOT_KEY) !== '1';
    } catch {
      return true;
    }
  }

  completeBoot(): void {
    try {
      sessionStorage.setItem(BOOT_KEY, '1');
    } catch { /* ignore */ }
    this.completeSubject.next(true);
  }

  isComplete(): boolean {
    return this.completeSubject.value;
  }
}
