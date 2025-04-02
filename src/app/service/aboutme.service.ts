import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AboutmeService {
  aboutMe: { title: string; description: string | string[] }[] = [
    {
      title: 'About Me',
      description:
        "Hi, my name is Ali Al-Guadeb, I'm a Full-Stack Developer with more than 1 year of Experience. Specializing in frontend development using Angular",
    },
    {
      title: 'My Skills',
      description: [
        'Frontend Development with Angular and React',
        'Backend Development with Node.js, NestJS and .Net',
        'Database Management (MySQL, MongoDB, SQL)',
        'Full-Stack Development',
        'Responsive Web Design',
      ],
    },
    {
      title: 'API Resource',
      description:
        "I'm using Fake API from the website, you can check out <a class='no-underline text-color' href='https://fakeapi.platzi.com/en/' target='_blank'>https://fakeapi.platzi.com/en/</a>. This handle all endpoints and provide a well-structured response format.",
    },
    {
      title: 'Goals',
      description:
        'I aim to master advanced Angular techniques, contribute to large-scale open-source projects, and build scalable SaaS applications.',
    },
    {
      title: 'My Portfolio',
      description:
        'You can navigate to my portfolio: <a class="no-underline text-color" href="https://portfolio-ali7u.netlify.app/" target="_blank">https://portfolio-ali7u.netlify.app/</a>',
    },
  ];

  constructor() {}

  getAboutMe(): {
    title: string;
    description: string | string[];
  }[] {
    return this.aboutMe;
  }
}
