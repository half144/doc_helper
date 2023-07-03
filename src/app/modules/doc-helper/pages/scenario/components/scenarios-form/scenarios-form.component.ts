import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-scenarios-form',
  templateUrl: './scenarios-form.component.html',
  styleUrls: ['./scenarios-form.component.css'],
})
export class ScenariosFormComponent {
  @ViewChild('form') formScenarios!: ElementRef<HTMLFormElement>;

  @Input() cardInfoForm!: FormGroup;
  @Input() scenariosForm!: FormGroup;
  @Input() listOfControl!: Array<{
    id: number;
    controlInstance: string;
  }>;

  @Output() addfield = new EventEmitter();
  @Output() removefield = new EventEmitter();
  @Output() deleteallfields = new EventEmitter();
  @Output() save = new EventEmitter();

  addField(e?: MouseEvent): void {
    if (e) {
      e.preventDefault();
    }
    this.addfield.emit();

    setTimeout(() => {
      this.formScenarios.nativeElement.scrollTo({
        top: this.formScenarios.nativeElement.scrollHeight,
        behavior: 'smooth',
      });
    }, 50);
  }

  removeField(i: { id: number; controlInstance: string }): void {
    this.removefield.emit(i);
  }

  deleteAllFields(): void {
    this.deleteallfields.emit();
  }

  saveScenario(): void {
    this.save.emit();
  }
}
