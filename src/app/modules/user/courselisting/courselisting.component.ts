import { Component, OnInit } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { LoadingService } from 'src/app/services/loading.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-courselisting',
  templateUrl: './courselisting.component.html',
  styleUrls: ['./courselisting.component.css']
})
export class CourselistingComponent implements OnInit {
    public safeDescription!: SafeHtml;

  reqbody = {
    search: '',  // Search term
    sort: 'new',
    category: '',  // Selected category (PSC/SET)
    current_page: 1, // Current page
    per_page: 8, // Items per page
  };

  courses: any[] = [];  // List of courses
  totalPages: number = 0;  // Total number of pages
  loading: boolean = false;  // Loading indicator

  categories: string[] = ['PSC', 'SET'];  // Category options

  constructor(private userService: UserService , private loadingser:LoadingService) {}

  ngOnInit(): void {
    this.getdata();  // Fetch initial data
  }

  getdata(): void {
    this.loading = true;
    this.loadingser.show()
    this.userService.getFullcourse(this.reqbody).subscribe({
      next: (data: any) => {
        this.courses = data.data;
        this.totalPages = data.last_page;
        this.loading = false;
        this.loadingser.hide()
      },
      error: (error) => {
        console.error(error);
        this.loading = false;
        this.loadingser.hide()
        alert('An error occurred while fetching courses');
      },
    });
  }

  // Pagination: Go to the next page
  nextPage(): void {
    if (this.reqbody.current_page < this.totalPages) {
      this.reqbody.current_page++;
      this.getdata();
    }
  }

  // Pagination: Go to the previous page
  prevPage(): void {
    if (this.reqbody.current_page > 1) {
      this.reqbody.current_page--;
      this.getdata();
    }
  }

  // Handle category selection change
// Handle category selection change
onCategoryChange(event: Event): void {
  const selectElement = event.target as HTMLSelectElement;  // Type assertion
  this.reqbody.category = selectElement.value;
  this.reqbody.current_page = 1;  // Reset to the first page
  this.getdata();
}


  // Handle search input change
// Handle search input change
onSearchChange(event: Event): void {
  const inputElement = event.target as HTMLInputElement;  // Type assertion
  this.reqbody.search = inputElement.value;
  alert(this.reqbody.search);
  this.reqbody.current_page = 1;  // Reset to the first page
  this.getdata();
}

}
