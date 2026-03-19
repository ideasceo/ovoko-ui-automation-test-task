import { Page } from '@playwright/test';

export class EbaySearchResultsPage {
  constructor(private page: Page) {}

  get resultsHeading() {
    return this.page.locator('.srp-controls__count-heading');
  }

  get noResultsBanner() {
    return this.page.locator('.srp-save-null-search');
  }

  get firstResult() {
    return this.page.locator('a[href*="/itm/"]').first();
  }

  async filterByBrand(brand: string) {
    await this.page.getByLabel(brand, { exact: true }).first().check();
    await this.page.waitForURL(/Brand=/);
  }

  async filterShipsToMe() {
    const url = new URL(this.page.url());
    // adding parameter to url because sometimes ebay shows some items that are not possible to ship to your current location
    // so to make test more stable we need to filter them out
    url.searchParams.set('LH_PrefLoc', '1');
    await this.page.goto(url.toString());
    await this.page.waitForLoadState('domcontentloaded');
  }

  async setPriceRange(min: string, max: string) {
    await this.page.locator('text=Price').first().scrollIntoViewIfNeeded();

    const minInput = this.page.getByLabel('Minimum Value in $');
    const maxInput = this.page.getByLabel('Maximum Value in $');

    // click and fill are separated because sometimes ebay deletes inputs by itself, so to make test more reliable sometimes its better to add some lines of code :) 
    await minInput.waitFor({ state: 'visible' }).catch(() => {});
    await minInput.click();
    await minInput.fill(min);
    await maxInput.click();
    await maxInput.fill(max);
    await this.page.getByRole('button', { name: 'Submit price range' }).click();
    await this.page.waitForURL(/udlo|udhi/);
  }
  // i am retrieving href and navigating to it instead of clicking on the item because sometimes ebay shows some ads or sponsored items 
  // that are not possible to buy, so to make test more stable we need to check if href is valid
  async selectItemByIndex(index: number): Promise<Page> {
    const href = await this.page
      .locator('a.s-card__link:not([tabindex="-1"])')
      .nth(index)
      .getAttribute('href');
    if (!href) throw new Error(`Item at index ${index} is not possible to buy`);
    await this.page.goto(href);
    await this.page.waitForLoadState('domcontentloaded');
    return this.page;
  }
}
