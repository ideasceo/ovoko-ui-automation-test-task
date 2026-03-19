import { Page } from '@playwright/test';

export class EbayCartPage {
  constructor(private page: Page) {}

  get emptyCart() {
    return this.page.locator('.empty-cart');
  }

  async proceedToCheckout() {
    await this.page.getByTestId('cta-top').click();
  }

  async returnToCart() {
    await this.page.goto('https://cart.ebay.com');
  }
}
