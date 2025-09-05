import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthAppComponent } from './auth-app/auth-app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './auth-app/sidebar/sidebar.component';
import { UserDropdownComponent } from './components/header/user-dropdown/user-dropdown.component';
import { SearchDropdownComponent } from './components/header/search-dropdown/search-dropdown.component';
import { NotificationDropdownComponent } from './components/header/notification-dropdown/notification-dropdown.component';

@NgModule({
  declarations: [
    AuthAppComponent,
    FooterComponent,
    HeaderComponent,
    SidebarComponent,
    UserDropdownComponent,
    SearchDropdownComponent,
    NotificationDropdownComponent
  ],
  imports: [ CommonModule, RouterModule],
  exports: [
    AuthAppComponent,
    FooterComponent,
    HeaderComponent,

  ],
  providers: [],
})
export class LayoutModule {}
