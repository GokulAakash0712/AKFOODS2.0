import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
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
