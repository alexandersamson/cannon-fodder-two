import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { CommodityBarComponent } from './components/commodity-bar/commodity-bar.component';
import { PendingActionsBarComponent } from './components/pending-actions-bar/pending-actions-bar.component';
import { ActionsPanelComponent } from './components/actions-panel/actions-panel.component';
import {CommodityService} from "./services/commodity.service";
import {DamageService} from "./services/damage.service";
import { GameCanvasComponent } from './components/game-canvas/game-canvas.component';
import {CanvasService} from "./services/canvas.service";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatTabsModule} from "@angular/material/tabs";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CommodityBarComponent,
    PendingActionsBarComponent,
    ActionsPanelComponent,
    GameCanvasComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        MatTooltipModule,
        MatTabsModule
    ],
  providers: [
    CommodityService,
    DamageService,
    CanvasService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
