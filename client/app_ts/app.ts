
import {
  NgModule,
  forwardRef,
  APP_INITIALIZER
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
} from '@angular/forms';
import { BrowserModule } from "@angular/platform-browser";
import { UpgradeAdapter } from '@angular/upgrade';
import {HttpModule} from "@angular/http";

import {NG2ConfigService} from "./config/services/config";

/*
 * Create our upgradeAdapter
 */
const upgradeAdapter: UpgradeAdapter = new UpgradeAdapter(
  forwardRef(() => AdminUIModule));

/*
 * Expose our ng2 content to ng1
 */
declare var angular: any;

angular.module('app')
  .factory('ConfigService',
        upgradeAdapter.downgradeNg2Provider(NG2ConfigService));

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    NG2ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: (config: NG2ConfigService) => () => config.load(),
      deps: [NG2ConfigService],
      multi: true
    }
  ]
})
class AdminUIModule { }


/*
 * Bootstrap the App
 */
upgradeAdapter.bootstrap(document.body, ['app']);


