import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
