import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReservationService } from '../reservation.service';
import { Reservations } from '../models/reservations';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css'
})
export class ReservationFormComponent implements OnInit {
  private reservationService = inject(ReservationService);
  private router = inject(Router);

  private activatedRoute = inject(ActivatedRoute);
  
  reservationForm:FormGroup = new FormGroup({

  });
  constructor(private formBuilder:FormBuilder){}
  ngOnInit(): void {
    this.reservationForm = this.formBuilder.group({
      checkInDate:['',Validators.required],
      checkOutDate:['',Validators.required],
      guestName:['',Validators.required],
      guestEmail:['',[Validators.required,Validators.email]],
      roomNumber:['',Validators.required],

    })
    let id = (Number)(this.activatedRoute.snapshot.paramMap.get('id'));
    if(id){
      let reservation = this.reservationService.getReservation(id);
      if(reservation){
        this.reservationForm.patchValue(reservation)
      }
      
    }
  }

  onSubmit(){
    if(this.reservationForm.valid){
      let reservation:Reservations = this.reservationForm.value;
      let id = (Number)(this.activatedRoute.snapshot.paramMap.get('id'));
      if(id){
        this.reservationService.updateReservation(id,reservation);
      }
      else{
        this.reservationService.addReservation(reservation);
      }
      
      this.reservationForm.reset();
      this.router.navigate(['/list']);
    }
    
  }
}
