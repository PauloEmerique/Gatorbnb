import { LoggingLevelEnum } from '../enums';

export interface AppConfig {
  apiEndpoint: string;
  loggingEnabled: boolean;
  loggingLevel: LoggingLevelEnum;
}
