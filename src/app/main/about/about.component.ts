import { Component, inject } from '@angular/core';
import { AboutmeService } from '../../service/aboutme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  aboutMeService = inject(AboutmeService);
  aboutMe: {
    title: string;
    description: string | string[];
  }[] = this.aboutMeService.getAboutMe();

  isDescriptionArray(description: string | string[]): description is string[] {
    return Array.isArray(description);
  }
}
