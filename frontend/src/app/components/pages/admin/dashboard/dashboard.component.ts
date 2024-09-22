import { isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    this.activeRoute.fragment.subscribe((data) => {
      this.jumpToSection(data);
    });
  }

  jumpToSection(section: any) {
    if (isPlatformBrowser(this.platformId)) {
      document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
