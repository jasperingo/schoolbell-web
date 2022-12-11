import { Injectable } from '@angular/core';

const COLORS = ['bg-violet-600', 'bg-blue-600', 'bg-orange-600', 'bg-red-600'];

@Injectable({
  providedIn: 'root'
})
export class CreateAvatarService {

  constructor() {}

  create(names: string[]): [color: string, initials: string] {
    const initials: string[] = [];

    names.forEach((name) => {
      initials.push(name.substring(0, 1));
    });

    return [COLORS[Math.floor(Math.random() * COLORS.length)], initials.join('')];
  }
}
