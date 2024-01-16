//Without a defined matcher, this one line applies next-auth to the entire project
export { default } from 'next-auth/middleware';

//Add paths below for specific pages that needs to be protected
export const config = { matcher: ['/'] };
