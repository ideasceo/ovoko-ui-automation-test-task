import { test, expect } from '@playwright/test';
import { EbayHomePage } from '../pages/ebay-home.page';
import { EbaySearchResultsPage } from '../pages/ebay-search-results.page';
import { loadTestData } from '../utils/csv-loader';

test.describe('Search', () => {
  test('Return relevant items (Headphones)', async ({ page }) => {
    const { searchTerm } = loadTestData();
    const home = new EbayHomePage(page);
    const results = new EbaySearchResultsPage(page);

    await home.goto();
    await home.search(searchTerm);
    await expect(results.resultsHeading).toContainText('Headphones');
  });

  test('Invalid search query shows no results', async ({ page }) => {
    const home = new EbayHomePage(page);
    const results = new EbaySearchResultsPage(page);

    await home.goto();
    await home.search('xyznonexistent12345');

    await expect(results.noResultsBanner).toBeVisible();
  });
});
