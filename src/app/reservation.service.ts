import { Injectable } from '@angular/core';
import { Reservations } from './models/reservations';
@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private reservations:Reservations[] = [];

  constructor(){
    let savedReservation = localStorage.getItem("reservations");
    this.reservations = savedReservation ? JSON.parse(savedReservation) :[];
  }

  getReservations():Reservations[]{
    return this.reservations;
  }

  getReservation(id:number):Reservations | undefined{
    return this.reservations.find(res => res.id === id);
  }

  addReservation(reservation:Reservations):void{
    const maxId = this.reservations.length > 0 
    ? Math.max(...this.reservations.map(res =>res.id || 0))
    :0;
    reservation.id = maxId + 1;
    this.reservations.push(reservation);
    localStorage.setItem("reservations",JSON.stringify(this.reservations));
  }

  deleteReservation(id:number){
    let index = this.reservations.findIndex(res =>res.id === id);
    this.reservations.splice(index,1);
    localStorage.setItem("reservations",JSON.stringify(this.reservations));
  }

  updateReservation(id:number, updatedReservation:Reservations){
    let index = this.reservations.findIndex(res =>res.id === id);
    this.reservations[index] = updatedReservation;
    localStorage.setItem("reservations",JSON.stringify(this.reservations));
  }
}
