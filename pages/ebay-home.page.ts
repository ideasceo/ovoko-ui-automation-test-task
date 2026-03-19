import { Page } from '@playwright/test';

export class EbayHomePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/');
    // to reduce probabity of blocked buttons and other elements by cookie banner
    await this.page.locator('#gdpr-banner-decline-x').click().catch(() => {});
  }

  async search(term: string) {
    await this.page.getByPlaceholder('Search for anything').fill(term);
    await this.page.locator('#gh-search-btn').click();
  }
}
