import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http'
import { UtilProvider } from '../providers/util/util';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RegisterPage } from '../pages/register/register';
import { KitchenPage } from '../pages/kitchen/kitchen'
import { AdminPage } from '../pages/admin/admin';
import { OrderHistoryPage } from '../pages/order-history/order-history';
import { TakeOrderPage } from '../pages/take-order/take-order';
import { AddonModalPage } from '../pages/addon-modal/addon-modal';
import { KeypadModalPage } from '../pages/keypadModal/keypadModal';
import { menuAddPage } from '../pages/admin/menuAdd/menuAdd';
import { sauceAddPage } from '../pages/admin/sauceAdd/sauceAdd';
import { ingredientAddPage } from '../pages/admin/ingredientAdd/ingredientAdd';
import { OrderProcessPage } from '../pages/order-in-process/order-in-process'
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AddOnCostPage } from '../pages/add-on-cost/add-on-cost';
import { FryerPage } from '../pages/fryer/fryer';
import { RicePage } from '../pages/rice/rice';
import { PackerPage } from '../pages/packer/packer'
import { SpecialItemModalPage } from '../pages/special-item-modal/special-item-modal'
import { CustomitempopoverPage } from '../pages/customitempopover/customitempopover'
import { ModalPopverPage } from '../pages/modalPopover/modalPopover'
import { ReportingPage } from '../pages/reporting/reporting'
import { MenuItemInfoPage } from '../pages/menu-item-info/menu-item-info'
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RegisterPage,
    KitchenPage,
    AdminPage,
    OrderHistoryPage,
    TakeOrderPage,
    AddonModalPage,
    KeypadModalPage,
    menuAddPage,
    sauceAddPage,
    ingredientAddPage,
    OrderProcessPage,
    AddOnCostPage,
    FryerPage,
    RicePage,
    PackerPage,
    SpecialItemModalPage,
    CustomitempopoverPage,
    ModalPopverPage,
    ReportingPage,
    MenuItemInfoPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    [NgxDatatableModule, BrowserModule],

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RegisterPage,
    KitchenPage,
    AdminPage,
    OrderHistoryPage,
    TakeOrderPage,
    AddonModalPage,
    KeypadModalPage,
    menuAddPage,
    sauceAddPage,
    ingredientAddPage,
    OrderProcessPage,
    AddOnCostPage,
    FryerPage,
    RicePage,
    PackerPage,
    SpecialItemModalPage,
    CustomitempopoverPage,
    ModalPopverPage,
    ReportingPage,
    MenuItemInfoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UtilProvider
  ]
})
export class AppModule {}
