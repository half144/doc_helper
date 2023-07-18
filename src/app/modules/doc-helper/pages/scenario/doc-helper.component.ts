import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import jsPDF from 'jspdf';
import { catchError, take, tap } from 'rxjs';
import { ScenariosService } from 'src/app/core/services/scenarios/scenarios.service';
import { ActivatedRoute } from '@angular/router';
import { PdfService } from 'src/app/core/services/pdf/pdf.service';

@Component({
  selector: 'app-doc-helper',
  templateUrl: './doc-helper.component.html',
  styleUrls: ['./doc-helper.component.css'],
})
export class DocHelperComponent implements OnInit {
  @Input() cardInfo?: any;

  private formBuilder = inject(FormBuilder);
  private scenarioService = inject(ScenariosService);
  private pdfService = inject(PdfService);
  private route = inject(ActivatedRoute);

  cardInfoForm = this.formBuilder.group({
    cardNumber: [null, [Validators.required]],
    cardReviwer: [null, [Validators.required]],
    cardHolder: [null, [Validators.required]],
    sprint: [null, [Validators.required]],
  });

  scenariosForm: UntypedFormGroup = this.formBuilder.group({});
  listOfControl: Array<{
    id: number;
    controlInstance: string;
  }> = [];

  get today(): string {
    return `${new Date().toLocaleDateString(
      'pt-BR'
    )} as ${new Date().toLocaleTimeString('pt-BR')}`;
  }

  ngOnInit(): void {
    if (this.cardInfo) {
      this.cardInfoForm.patchValue({
        cardNumber: this.cardInfo.cardNumber,
        cardReviwer: this.cardInfo.cardReviwer,
        cardHolder: this.cardInfo.cardHolder,
        sprint: this.cardInfo.sprint,
      });

      this.cardInfo.scenarios.forEach((scenario: any) => {
        this.addFieldScenario(scenario);
      });
    }
  }

  addField(): void {
    this.addFieldScenario();
  }

  addFieldScenario(scenario?: any): void {
    const id =
      this.listOfControl.length > 0
        ? this.listOfControl[this.listOfControl.length - 1].id + 1
        : 0;

    const control = {
      id,
      controlInstance: `testcase${id}`,
    };
    const index = this.listOfControl.push(control);

    this.scenariosForm.addControl(
      this.listOfControl[index - 1].controlInstance,
      this.formBuilder.group({
        testcaseName: [scenario?.testcaseName ?? null, [Validators.required]],
        testcaseDescription: this.formBuilder.group({
          dado: [
            scenario?.testcaseDescription.dado ?? null,
            [Validators.required],
          ],
          quando: [
            scenario?.testcaseDescription.quando ?? null,
            [Validators.required],
          ],
          entao: [
            scenario?.testcaseDescription.entao ?? null,
            [Validators.required],
          ],
        }),
      })
    );
  }

  removeField(i: any): void {
    this.listOfControl = this.listOfControl.filter((item) => item.id !== i.id);
    this.scenariosForm.removeControl(i.controlInstance);
  }

  deleteAllFields(): void {
    this.listOfControl = [];
    this.scenariosForm = this.formBuilder.group({});
  }

  generatePdf(): void {
    const doc = new jsPDF('p', 'pt', 'a4', true);
    const html = document.getElementById('pdfContent');

    this.pdfService.savePdfFromHtml({ html, doc, title: 'Cenários' });
  }

  saveScenarios(): void {
    const scenarios = this.scenariosForm.value;
    const cardInfo = this.cardInfoForm.value;

    const card = {
      ...cardInfo,
      scenarios: Object.values(scenarios),
    };

    const projectId = this.route.snapshot.queryParamMap.get('projectId');

    console.log(projectId);

    this.scenarioService
      .saveScenario(card, projectId!)
      .pipe(
        take(1),
        tap((response) => {
          console.log(response);
        }),
        catchError((error) => {
          console.log(error);
          return error;
        })
      )
      .subscribe();
  }
}
