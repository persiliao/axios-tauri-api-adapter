import axios from 'axios';

import { axiosTauriApiAdapter } from '../src';

test('should create axios instance with this adapter', () => {
  // should compile
  const instance = axios.create({ adapter: axiosTauriApiAdapter })

  expect(instance).toBeTruthy();
})
