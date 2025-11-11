import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { RestService } from '../rest.service';
import { Building } from '../model/Building';
import { WhoIsInTheBuildingComponent } from '../who-is-in-the-building/who-is-in-the-building.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emergency-page',
  imports: [WhoIsInTheBuildingComponent],
  templateUrl: './emergency-page.component.html',
  styleUrl: './emergency-page.component.css'
})
export class EmergencyPageComponent implements OnInit {

  private restService = inject(RestService);
  private router = inject(Router);

  buildings : WritableSignal<Building[]> = signal<Building[]>([]);

  handleChange(event: any) {
    const building = event.target.value;
    this.router.navigate(['emergency', building]);
  }

  ngOnInit(): void {
      const obs = this.restService.getBuildings();
      obs.subscribe(data => this.buildings.set(data));
  }
}
