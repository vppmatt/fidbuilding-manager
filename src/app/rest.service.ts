import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Building } from './model/Building';
import { environment } from '../environments/environment';
import { AccessRecord } from './model/AccessRecord';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  serverUrl = environment.serverUrl;

  private httpClient = inject(HttpClient);

  getBuildings() : Observable<Building[]> {
      return this.httpClient.get<Building[]>(`${this.serverUrl}/api/building`);
  }

  getAccessLogs(date: Date) : Observable<AccessRecord[]> {
    const formattedDate = date.toISOString().split('T')[0]; // Format date as yyyy-MM-dd
    return this.httpClient.get<AccessRecord[]>(`${this.serverUrl}/api/logs/${formattedDate}?all=true`);
  }

  addUser(user: {firstname: string, surname: string}) : Observable<{id: number, firstname: string, surname: string}> {
    return this.httpClient.post<{id: number, firstname: string, surname: string}>(`${this.serverUrl}/api/user`, user);
  }

  editBuilding(building : Building) : Observable<Building> {
    return this.httpClient.put<Building>(`${this.serverUrl}/api/building/${building.id}`, building);
  }
}
