import { ErrorHandler, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from './data.service';
import { LoggerService } from './logger.service';
import { PlainLoggerService } from './plain-logger.service';
import { dataServiceFactory } from './data.service.factory';
import { throwIfAlreadyLoaded } from './module.import.guard';
import { AddHeaderInterceptor } from './add-header.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { logResponseServiceInterceptor } from './log-response.interceptor';
import { CacheInterceptor } from './cache.interceptor';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    // PlainLoggerService,
    // { provide: LoggerService, useExisting: PlainLoggerService },
    // {
    //   provide: LoggerService,
    //   useValue: {
    //     log: (message: string) => console.log(`MESSAGE:${message}`),
    //     error: (message: string) => console.error(`PROBLEM:${message}`),
    //   },
    // },
    // {
    //   provide: DataService,
    //   useFactory: dataServiceFactory,
    //   deps: [LoggerService],
    // },
    LoggerService,
    DataService,
    { provide: ErrorHandler, useClass: ErrorHandler },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: logResponseServiceInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: AddHeaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, `CoreModule`);
  }
}
