import { Component, inject, OnInit, signal } from '@angular/core';
import { RestService } from '../rest.service';
import { AccessRecord } from '../model/AccessRecord';
import { ActivatedRoute } from '@angular/router';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-who-is-in-the-building',
  imports: [SpinnerComponent],
  templateUrl: './who-is-in-the-building.component.html',
  styleUrl: './who-is-in-the-building.component.css'
})
export class WhoIsInTheBuildingComponent implements OnInit {

  private restService = inject(RestService);
  private activatedRoute = inject(ActivatedRoute);

  isLoading = false;

  accessLogs = signal<AccessRecord[]>([]);
  selectedBuilding = "";
  errorMessage = "";

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.selectedBuilding = params['building'] || "";
      if (this.selectedBuilding !== "") this.getData();

    });
  }

  getData() {
    this.isLoading = true;
    this.restService.getAccessLogs(new Date()).subscribe(
      {next :
      data => {
      console.log(data);
      const buildingRecords = data.filter(record => record.building.name === this.selectedBuilding);
      const lastRecordsMap = new Map<number, AccessRecord>();
      buildingRecords.forEach(record => {
        lastRecordsMap.set(record.user.id, record);
      });
      const lastRecords = Array.from(lastRecordsMap.values());
      const insideRecords = lastRecords.filter(record => record.status === true);
      this.accessLogs.set(insideRecords);
      this.isLoading = false;
    },
  error: err => {
    this.errorMessage="somethingWentWrong " + err.message;
    this.isLoading = false;
  }
  });
  }

}  
