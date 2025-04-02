import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ROUTER_TOKENS } from '../app.routes';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  readonly ROUTER_TOKENS = ROUTER_TOKENS;
}
