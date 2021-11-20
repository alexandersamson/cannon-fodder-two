import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import {GameCanvasProperties} from "../models/game-canvas/game-canvas-properties";

@Injectable({
  providedIn: 'root'
})
export class CanvasService {

  private canvas = new BehaviorSubject(new GameCanvasProperties());
  currentCanvasProperties = this.canvas.asObservable();

  constructor() { }

  updateCanvasProperties(gameCanvas: GameCanvasProperties) {
    this.canvas.next(gameCanvas);
  }

}
