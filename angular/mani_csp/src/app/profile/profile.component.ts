import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  registrations: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Initialize the registrations array or other necessary data
  }

  getRegistrations() {
    this.http.get<any[]>('http://localhost:8080/user/registration').subscribe(
      data => {
        this.registrations = data;
      },
      error => {
        console.error('Error fetching registration:', error);
      }
    );
  }

  updateRegistration(registration: any) {
    if(confirm('confirm updating')){
    this.http.patch('http://localhost:8080/user/registration/${registration.username}', registration).subscribe(
      response => {
        console.log('Registration updated:', response);
        // Optionally, you can fetch the updated list of registrations here
        this.getRegistrations();
      },
      error => {
        console.error('Error updating registration:', error);
      }
    );
  }
  }

  deleteRegistration(username: string) {
    if(confirm('confirm to delete')){
    this.http.delete('http://localhost:8080/user/registration/${username}').subscribe(
      response => {
        console.log('Registration deleted:', response);
        // Remove the deleted registration from the array
        this.registrations = this.registrations.filter(r => r.username !== username);
      },
      error => {
        console.error('Error deleting registration:', error);
      }
    );
  }
}
}