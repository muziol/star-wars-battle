import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { BattlerState } from './store/battler/battler.state';
import { DataState } from './store/data/data.state';

@NgModule({
  declarations: [AppComponent],
  imports: [
    NgxsModule.forRoot([BattlerState, DataState], {
      developmentMode: true,
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
