import { Component, OnInit, numberAttribute } from "@angular/core";
import { Router } from "@angular/router";
import { Category } from "src/app/models/category";
import { Product } from "src/app/models/product";
import { User } from "src/app/models/user";
import { CategoryService } from "src/app/service/category.service";
import { ProductService } from "src/app/service/product.service";
import { UserService } from "src/app/service/user.service";
import { environment } from "src/environments/environment";

@Component({
  selector: 'app-user-admin',
  templateUrl: './user.admin.component.html',
  styleUrls: ['./user.admin.component.scss']
})

export class UserAdminComponent implements OnInit {
  users: User[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 9;
  pages: number[] = [];
  totalPages: number = 0;
  visiblePages: number[] = [];
  keyword: string = "";

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    debugger
    this.getUsers(this.keyword, this.currentPage, this.itemsPerPage)
  }

  getUsers(keyword: string, page: number, limit: number) {
    debugger
    this.userService.getUsers(keyword, page, limit).subscribe({
      next: (response: any) => {
        debugger
        this.users = response.userList
        this.totalPages = response.totalPages
        this.visiblePages = this.generateVisiblePagesArray(this.currentPage, this.totalPages)
      },
      complete: () => {
        debugger
      },
      error: (error: any) => {
        alert(`Cannot get list of users, error: ${error.error}`)
      }
    })
  }

  onPageChange(page: number) {
    debugger
    this.currentPage = page
    this.getUsers(this.keyword, this.currentPage, this.itemsPerPage)
  }

  searchUser() {
    this.currentPage = 1
    this.itemsPerPage = 9
    debugger
    this.getUsers(this.keyword, this.currentPage, this.itemsPerPage)
  }

  generateVisiblePagesArray(currentPage: number, totalPages: number): number[] {
    debugger
    const maxVisiablePages = 5
    const halfVisiablePages = Math.floor(maxVisiablePages / 2)

    let startPage = Math.max(currentPage - halfVisiablePages, 1)
    let endPage = Math.min(startPage + maxVisiablePages - 1, totalPages)

    if (endPage - startPage + 1 < maxVisiablePages) {
      startPage = Math.max(endPage - maxVisiablePages + 1, 1)
    }
    return new Array(endPage - startPage + 1).fill(0).map((_, index) => startPage + index);
  }
  formatDate(timeStamp: string): string {
    const date = new Date(timeStamp);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
}
