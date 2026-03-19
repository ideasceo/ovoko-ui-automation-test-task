import { test, expect } from '../fixtures';
import type { Page } from '@playwright/test';
import { EbayHomePage } from '../pages/ebay-home.page';
import { EbaySearchResultsPage } from '../pages/ebay-search-results.page';
import { EbayProductPage } from '../pages/ebay-product.page';
import { loadTestData } from '../utils/csv-loader';

const data = loadTestData();

async function openProductPage(page: Page) {
  const home = new EbayHomePage(page);
  const results = new EbaySearchResultsPage(page);

  await home.goto();
  await home.search(data.searchTerm);
  await results.filterByBrand(data.brand);
  await results.setPriceRange(data.minPrice, data.maxPrice);
  await results.filterShipsToMe();
  return results.selectItemByIndex(Number(data.itemIndex));
}

test.describe('Add to Cart', () => {
  test('Adds filtered item to cart', async ({ page }) => {
    const productTab = await openProductPage(page);
    await new EbayProductPage(productTab).addToCart();
    await expect(productTab).toHaveURL(/cart\.ebay\.com/);
  });
});
