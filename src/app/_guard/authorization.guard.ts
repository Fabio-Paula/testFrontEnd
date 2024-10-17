import { CanActivateFn } from '@angular/router';

export const authorizationGuard: CanActivateFn = (route, state) => {
  console.log(route);

  const isLoggedIn = !!localStorage.getItem('login');
  if (!isLoggedIn) window.location.href = '/login';
  return isLoggedIn;
};
