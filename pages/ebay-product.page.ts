import { Page } from '@playwright/test';

export class EbayProductPage {
  constructor(private page: Page) {}
// i am usding domcontentloaded event because it reduces flakiness of tests
async addToCart() {
    const btn = this.page.getByTestId('x-atc-action').getByTestId('ux-call-to-action');
    await btn.waitFor({ state: 'visible' });
    await this.page.waitForLoadState('domcontentloaded');
    await btn.click();
    const seeInCart = this.page.getByRole('link', { name: 'See in cart' });
    await seeInCart.waitFor({ state: 'visible' });
    await seeInCart.click();
    await this.page.waitForURL(/cart\.ebay\.com/);
    await this.page.waitForLoadState('domcontentloaded');
  }

  hasAddToCart() {
    return this.page.getByTestId('x-atc-action').isVisible();
  }
}
