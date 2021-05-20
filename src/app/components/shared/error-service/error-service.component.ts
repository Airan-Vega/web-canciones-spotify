import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-error-service',
  templateUrl: './error-service.component.html',
})
export class ErrorServiceComponent implements OnInit {
  @Input() mensajeError: string;

  constructor() {}

  ngOnInit(): void {}
}
