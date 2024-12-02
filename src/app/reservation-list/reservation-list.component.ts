import { Component, inject, OnInit } from '@angular/core';
import { ReservationService } from '../reservation.service';
import { Reservations } from '../models/reservations';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-reservation-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.css'
})
export class ReservationListComponent implements OnInit {
  
  reservations:Reservations[] =[];
  private reservationService = inject(ReservationService);

  ngOnInit(): void {
    this.reservations = this.reservationService.getReservations()
  }

  deleteReservation(id:number){
    this.reservationService.deleteReservation(id)
  }
}
