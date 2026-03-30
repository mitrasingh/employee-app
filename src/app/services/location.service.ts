import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Location } from '../models/location.model';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private baseUrl = `${environment.apiUrl}/locations`;

  private locationsSubject = new BehaviorSubject<Location[]>([]);
  locations$ = this.locationsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadLocations();
  }

  loadLocations(): void {
    this.http.get<Location[]>(this.baseUrl).subscribe({
      next: (data) => {
        this.locationsSubject.next(data);
      },
      error: (err) => {
        console.error('API error:', err);
      },
    });
  }

  addLocation(location: Partial<Location>) {
    return this.http.post<Location>(this.baseUrl, location);
  }

  updateLocation(id: number, location: Partial<Location>) {
    return this.http.put<Location>(`${this.baseUrl}/${id}`, location);
  }

  deleteLocation(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
