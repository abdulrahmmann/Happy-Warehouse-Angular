import {Component} from '@angular/core';
import {Sidebar} from '../components/sidebar/sidebar';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-layout',
  imports: [
    Sidebar,
    NgClass
  ],
  templateUrl: './layout.html',
})
export class Layout {
  isSidebarPinned: boolean = false;

  handleSidebarPin(isPinned: boolean) {
    this.isSidebarPinned = isPinned;
  }
}
