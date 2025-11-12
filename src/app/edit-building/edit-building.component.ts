import { Component, inject, signal } from '@angular/core';
import { RestService } from '../rest.service';
import { Building } from '../model/Building';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-building',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-building.component.html',
  styleUrl: './edit-building.component.css'
})
export class EditBuildingComponent {
  buildings = signal<Building[]>([]);

  selectedBuildingId : number | null = null;

  handleClick(id :number) {
    this.selectedBuildingId = id;
    this.editForm.patchValue({
      id: "" + id,
      name: this.buildings().find(b => b.id === id)?.name
    })
  }

  editForm = new FormGroup({
    id: new FormControl('id'),
    name: new FormControl('name'),
  })

  private restService = inject(RestService);

  ngOnInit(): void {
    this.restService.getBuildings().subscribe(data => {
      this.buildings.set(data);
    });
  }

  onSubmit() {
    console.log("Submitting form", this.editForm.value);
  }
}
