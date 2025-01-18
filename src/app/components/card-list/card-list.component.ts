import {Component, Input, OnInit} from '@angular/core';
import {GetUnitsService} from "../../services/get-units.service";
import {LocationInterface} from "../../types/location.interface";
import {NgForOf, NgIf} from "@angular/common";
import {CardComponent} from "../card/card.component";

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [
    NgIf,
    CardComponent,
    NgForOf
  ],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss'
})
export class CardListComponent implements OnInit{

  @Input() unitsList: LocationInterface[] = []

  constructor(
  ) {
  }

  ngOnInit(): void {
  }

}
