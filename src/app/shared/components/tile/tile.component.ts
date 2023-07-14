import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TilesModule } from 'carbon-components-angular';

@Component({
  selector: 'app-tile',
  imports: [RouterModule, TilesModule],
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css'],
  standalone: true,
})
export class TileComponent {
  @Input() route;
  @Input() queryParams = {};
}
