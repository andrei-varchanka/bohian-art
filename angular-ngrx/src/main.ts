import { ApplicationRef, enableProdMode } from '@angular/core';
import { enableDebugTools } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule).then(moduleRef => {
  const applicationRef = moduleRef.injector.get(ApplicationRef);
  const componentRef = applicationRef.components[0];
  enableDebugTools(componentRef);
}).catch(err => console.log(err));

// run "ng.profiler.timeChangeDetection({record: true})" in browser console

// Default change detection strategy: 
//  gallery: ran 1533 change detection cycles, 0.33 ms per check
//  painting: ran 10063 change detection cycles, 0.05 ms ms per check
//  users: ran 3209 change detection cycles, 0.16 ms per check
//  user: ran 2188 change detection cycles 0.23 ms per check


// OnPush change detection strategy:
//  gallery: 
//  painting: 
//  users: 
//  user: 