import { test, expect } from '../fixtures';
import { EbayHomePage } from '../pages/ebay-home.page';
import { EbaySearchResultsPage } from '../pages/ebay-search-results.page';
import { loadTestData } from '../utils/csv-loader';

const data = loadTestData();

test.describe('Filters', () => {
  test.beforeEach(async ({ page }) => {
    const home = new EbayHomePage(page);
    await home.goto();
    await home.search(data.searchTerm);
  });

  test('Filter by brand', async ({ page }) => {
    const results = new EbaySearchResultsPage(page);
    await results.filterByBrand(data.brand);
    expect(page.url()).toContain('Brand=Sony');
  });

  test('Filter by price range', async ({ page }) => {
    const results = new EbaySearchResultsPage(page);
    await results.setPriceRange(data.minPrice, data.maxPrice);
    await expect(results.resultsHeading).toBeVisible();
    await expect(results.firstResult).toBeVisible();
  });

  test('Brand + price filters combined', async ({ page }) => {
    const results = new EbaySearchResultsPage(page);
    await results.filterByBrand(data.brand);
    await results.setPriceRange(data.minPrice, data.maxPrice);
    expect(page.url()).toContain('Brand=Sony');
    await expect(results.firstResult).toBeVisible();
  });
});
