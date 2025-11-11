import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RestService } from './rest.service';
import { Building } from './model/Building';
import { WhoIsInTheBuildingComponent } from './who-is-in-the-building/who-is-in-the-building.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WhoIsInTheBuildingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'building-manager';

  private restService = inject(RestService);

  buildings : WritableSignal<Building[]> = signal<Building[]>([]);

  ngOnInit(): void {
      const obs = this.restService.getBuildings();
      obs.subscribe(data => this.buildings.set(data));
  }
}
