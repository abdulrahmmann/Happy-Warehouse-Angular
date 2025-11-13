import {Component, EventEmitter, Output} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {ScrollPanel} from 'primeng/scrollpanel';
import {NgClass, NgForOf} from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterLink,
    ScrollPanel,
    NgClass,
    NgForOf,
    RouterLinkActive
  ],
  templateUrl: './sidebar.html',
})
export class Sidebar {
  isHovered: boolean = false;
  isPinned: boolean = false;

  @Output() pinnedChange = new EventEmitter<boolean>();

  togglePin(): void {
    this.isPinned = !this.isPinned;
    this.pinnedChange.emit(this.isPinned);
  }

  get sidebarExpanded(): boolean {
    return this.isPinned || this.isHovered;
  }

  sidebarSections = [
    {
      title: 'dashboards',
      items: [
        { name: 'Dashboard', icon: '/dashboard.svg', route: '/dashboard' },
      ]
    },
    {
      title: 'warehouse managements',
      items: [
        { name: 'Warehouses', icon: '/dashboard.svg', route: '/warehouses' },
        { name: 'Add Warehouse', icon: '/dashboard.svg', route: '/add-warehouse' },
      ]
    },
    {
      title: 'user managements',
      items: [
        { name: 'Users', icon: '/dashboard.svg', route: '/users' },
        { name: 'Add Users', icon: '/dashboard.svg', route: '/users/add' },
      ]
    },
    {
      title: 'admin managements',
      items: [
        { name: 'Admins', icon: '/dashboard.svg', route: '/admins' },
        { name: 'Add Admin', icon: '/add.svg', route: '/admins/add' },
      ]
    },
    {
      title: 'manager managements',
      items: [
        { name: 'Managers', icon: '/dashboard.svg', route: '/managers' },
        { name: 'Add Manager', icon: '/add.svg', route: '/managers/add' },
      ]
    },
    {
      title: 'auditor managements',
      items: [
        { name: 'Auditors', icon: '/dashboard.svg', route: '/auditors' },
        { name: 'Add Auditor', icon: '/add.svg', route: '/auditors/add' },
      ]
    }
  ];
}
