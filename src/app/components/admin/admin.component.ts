import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  adminComponent: string = ''

  constructor(private router: Router, private location: Location) { }

  ngOnInit(): void {
    const currentUrl = this.location.path();
    const adminComponent = currentUrl.split('/').pop();
    this.adminComponent = adminComponent!
  }

  adminPage(): void {
    this.router.navigate(['/admin'])
  }

  showAdmincomponent(component: string): void {
    this.adminComponent = component;
    this.router.navigate([`/admin/${component}`]);
  }
}
