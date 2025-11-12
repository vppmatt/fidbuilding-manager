import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RestService } from '../rest.service';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-add-user-page',
  imports: [FormsModule, SpinnerComponent],
  templateUrl: './add-user-page.component.html',
  styleUrl: './add-user-page.component.css'
})
export class AddUserPageComponent {

  restService = inject(RestService);

  firstname: string = '';
  surname: string = '';

  saving: boolean = false;
  message: string = '';

  onSubmit() {
    this.saving = true; 
    this.restService.addUser({ firstname: this.firstname, surname: this.surname }).subscribe({
      next: (response) => {
        this.message = 'User added successfully with id :' + response.id;
        this.saving = false;
      },
      error: (error) => {
        this.message = 'Error adding user: ' + error.message;
        this.saving = false;
      }
    });
  }

}
