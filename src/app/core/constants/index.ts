import { isDevMode } from '@angular/core';

export const URL_PROD = 'https://doc-helper-api.up.railway.app/';
export const URL_DEV = 'http://localhost:3000/';

export const URL = isDevMode() ? URL_DEV : URL_PROD;
