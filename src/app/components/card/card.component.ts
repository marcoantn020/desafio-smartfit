import {Component, Input, OnInit} from '@angular/core';
import {LocationInterface} from "../../types/location.interface";
import {NgClass, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    NgClass,
    NgForOf,
    NgIf
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit{
  @Input() card!: LocationInterface

  constructor() {
  }

  ngOnInit(): void {
  }

}
