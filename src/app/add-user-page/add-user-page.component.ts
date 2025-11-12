import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-user-page',
  imports: [FormsModule],
  templateUrl: './add-user-page.component.html',
  styleUrl: './add-user-page.component.css'
})
export class AddUserPageComponent {

  firstname: string = '';
  surname: string = '';

  onSubmit() {
    console.log(`New user created: ${this.firstname} ${this.surname}`);
  }

}
