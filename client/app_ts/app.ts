
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

// import {NG2ConfigService} from "./config";


/*
 * Create our upgradeAdapter
 */
const upgradeAdapter: UpgradeAdapter = new UpgradeAdapter(
  forwardRef(() => AdminUIModule));

/*
 * Expose our ng2 content to ng1
 */
declare var angular: any;
//
// angular.module('app')
//   .factory('NG2ConfigService',
//         upgradeAdapter.downgradeNg2Provider(NG2ConfigService));

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
  ]
})
class AdminUIModule { }


/*
 * Bootstrap the App
 */
upgradeAdapter.bootstrap(document.body, ['bootstrapApp']);


