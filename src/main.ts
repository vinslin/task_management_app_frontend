import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { authInterceptor } from './app/interceptors/auth-interceptor';
import { authExpiredInterceptor } from './app/interceptors/auth-expired-interceptor';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor, authExpiredInterceptor])
    ),
  ],
}).catch((err) => console.error(err));
