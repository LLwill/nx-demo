import { request } from '@nx-demo/utils';
export async function getWelcome() {
  return request('/conversation/welcome', {
    method: 'get',
  });
}
