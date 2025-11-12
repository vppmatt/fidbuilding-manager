import { Component, inject, signal } from '@angular/core';
import { RestService } from '../rest.service';
import { Building } from '../model/Building';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-edit-building',
  imports: [ReactiveFormsModule, SpinnerComponent],
  templateUrl: './edit-building.component.html',
  styleUrl: './edit-building.component.css'
})
export class EditBuildingComponent {
  buildings = signal<Building[]>([]);

  saving : boolean = false;
  message : string = "";

  selectedBuildingId : number | null = null;

  handleClick(id :number) {
    this.selectedBuildingId = id;
    this.editForm.patchValue({
      id: "" + id,
      name: this.buildings().find(b => b.id === id)?.name
    })
  }

  formBuilder = inject(FormBuilder);

  editForm = this.formBuilder.group({
    id : [''],
    name: ['', [Validators.minLength(3), Validators.required]]
  })
  

  // editForm = new FormGroup({
  //   id: new FormControl('id'),
  //   name: new FormControl('name'),
  // })

  private restService = inject(RestService);

  ngOnInit(): void {
    this.restService.getBuildings().subscribe(data => {
      this.buildings.set(data);
    });
  }

  onSubmit() { 
    this.saving = true;
    const buildingToUpdate : Building = {
      id: +(this.editForm.value.id || 0),
      name: this.editForm.value.name || ""
    }

    this.restService.editBuilding(buildingToUpdate).subscribe({
      next: (response) => {
        console.log(response);
        this.message = '';
        this.restService.getBuildings().subscribe(data => {
          this.buildings.set(data);
          this.saving = false;
        });
        
      },
      error: (error) => {
        this.message = 'Error updating building: ' + error.message;
        this.saving = false;
      }
    });
  
  }
}
