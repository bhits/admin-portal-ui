import {
    NgModule,
    forwardRef,
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
    FormsModule,
} from '@angular/forms';
import {BrowserModule} from "@angular/platform-browser";
import {UpgradeAdapter} from '@angular/upgrade';
import {HttpModule} from "@angular/http";


/*
 * Create our upgradeAdapter
 */
const upgradeAdapter: UpgradeAdapter = new UpgradeAdapter(
    forwardRef(() => AdminUIModule));

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    providers: []
})
class AdminUIModule {
}

/*
 * Bootstrap the App
 */
upgradeAdapter.bootstrap(document.body, ['configInitial']);