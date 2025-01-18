import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from "./components/header/header.component";
import {FormsComponent} from "./components/forms/forms.component";
import {BehaviorSubject} from "rxjs";
import {CardListComponent} from "./components/card-list/card-list.component";
import {AsyncPipe, NgIf} from "@angular/common";
import {LocationInterface} from "./types/location.interface";
import {GetUnitsService} from "./services/get-units.service";
import {LegendComponent} from "./components/legend/legend.component";
import {FooterComponent} from "./components/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FormsComponent,
    CardListComponent,
    AsyncPipe,
    NgIf,
    LegendComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  showList: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  unitsList: LocationInterface[] = []

  constructor(
    private service: GetUnitsService
  ) {
  }

  onSubmit() {
    this.unitsList = this.service.getFilteredUnits()
    this.showList.next(true)
  }

}
