import { Component } from "@angular/core"
import {CommonModule} from '@angular/common';
import {people, person, gender} from "../../ts-playground";
@Component({
  selector: 'app-train',
  imports:[CommonModule],
  standalone: true,
  templateUrl: './train.html',
})
export class TrainComponent{
    people = people
    // Function lọc những người đủ tuổi nhập ngũ
    filterMilitaryService(people: Array<person>){
        return people.filter(n => n.age > 18 && n.gender == gender.Male)
    }
}