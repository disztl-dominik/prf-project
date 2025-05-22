import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/User';
import { Observable } from 'rxjs';
import { HeartRate } from '../model/HeartRate';
import { BloodPressure } from '../model/BloodPressure';
import { BloodSugar } from '../model/BloodSugar';
import { Weight } from '../model/Weight';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>('http://localhost:5000/app/getAllUsers', {withCredentials: true});
  }

  getUserData() {
    return this.http.get<User>('http://localhost:5000/app/getUserData', {withCredentials: true});
  }

  getDoctor() {
    return this.http.get('http://localhost:5000/app/getDoctor', { withCredentials: true });
  }

  getDoctors() {
    return this.http.get<User[]>('http://localhost:5000/app/getDoctors', {withCredentials: true});
  }

  setDoctor(doctor: string) {
    const params = new HttpParams()
      .set('doctor', doctor);
    return this.http.get('http://localhost:5000/app/setDoctor', { params: params, withCredentials: true });
  }

  getPatients() {
    return this.http.get<User[]>('http://localhost:5000/app/getPatients', {withCredentials: true});
  }

  recordHeartRate(heartRate: number) {
    const params = new HttpParams()
      .set('heartRate', heartRate);
    return this.http.get('http://localhost:5000/app/recordHeartRate', { params: params, withCredentials: true });
  }

  recordBloodPressure(bloodPressure: string) {
    const params = new HttpParams()
      .set('bloodPressure', bloodPressure);
    return this.http.get('http://localhost:5000/app/recordBloodPressure', { params: params, withCredentials: true });
  }

  recordBloodSugar(bloodSugar: string) {
    const params = new HttpParams()
      .set('bloodSugar', bloodSugar);
    return this.http.get('http://localhost:5000/app/recordBloodSugar', { params: params, withCredentials: true });
  }

  recordWeight(weight: string) {
    const params = new HttpParams()
      .set('weight', weight);
    return this.http.get('http://localhost:5000/app/recordWeight', { params: params, withCredentials: true });
  }

  getHeartRates() {
    return this.http.get<HeartRate[]>('http://localhost:5000/app/getHeartRates', { withCredentials: true });
  }

  getBloodPressures() {
    return this.http.get<BloodPressure[]>('http://localhost:5000/app/getBloodPressures', { withCredentials: true });
  }

  getBloodSugars() {
    return this.http.get<BloodSugar[]>('http://localhost:5000/app/getBloodSugars', { withCredentials: true });
  }

  getWeights() {
    return this.http.get<Weight[]>('http://localhost:5000/app/getWeights', { withCredentials: true });
  }

  delete(id: string) {
    return this.http.delete('http://localhost:5000/app/deleteUser?id=' + id, {withCredentials: true});
  }

  getUser(): Observable<any> {
    return this.http.get('http://localhost:5000/app/getUser', {withCredentials: true});
  }

  getUserById(id: string): Observable<any> {
    return this.http.get('http://localhost:5000/app/getUserById/${id}', {withCredentials: true});
  }
}