import { test as base } from '@playwright/test';

export const test = base.extend({
  page: async ({ browser }, use) => {
    const ctx = await browser.newContext();
    // i am using this script to hide webdriver property because ebay shows captcha to automation tools, and this is one of the ways to bypass it. 
    // It reduces reliability of tests, but without it they are almost impossible to run as captcha appears on the first page and fails the test before it even starts.
    await ctx.addInitScript(() => {
      Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
    });
    const page = await ctx.newPage();

    page.on('framenavigated', frame => {
      if (frame === page.mainFrame() && /\/captcha|splashui\/captcha/.test(frame.url())) {
        throw new Error('Captcha Reached');
      }
    });

    await use(page);
    await ctx.close();
  },
});

export { expect } from '@playwright/test';
