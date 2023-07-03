import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-scenarios-described-form',
  templateUrl: './scenarios-described-form.component.html',
  styleUrls: ['./scenarios-described-form.component.css'],
})
export class ScenariosDescribedFormComponent {
  @Input() scenariosForm!: FormGroup;
  @Input() listOfControl!: any[];
}
