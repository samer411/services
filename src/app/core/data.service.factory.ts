import { HttpClient } from '@angular/common/http';
import { LoggerService } from '../core/logger.service';
import { DataService } from './data.service';

export function dataServiceFactory(
  logger: LoggerService,
  http: HttpClient
  // dataService: DataService
) {
  let dataService: DataService = new DataService(logger, http);

  logger.log('creating new dataService with factory function');
  return dataService;
}
