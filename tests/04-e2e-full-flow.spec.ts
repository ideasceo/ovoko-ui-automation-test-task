import { test, expect } from '../fixtures';
import { EbayHomePage } from '../pages/ebay-home.page';
import { EbaySearchResultsPage } from '../pages/ebay-search-results.page';
import { EbayProductPage } from '../pages/ebay-product.page';
import { EbayCartPage } from '../pages/ebay-cart.page';
import { loadTestData } from '../utils/csv-loader';
import { checkoutData } from '../data/checkout-data';

test('E2E scenario until payment button on checkout', async ({ page }) => {
  const data = loadTestData();
  const home = new EbayHomePage(page);
  const results = new EbaySearchResultsPage(page);

  await home.goto();
  await home.search(data.searchTerm);
  await results.filterByBrand(data.brand);
  await results.setPriceRange(data.minPrice, data.maxPrice);
  await results.filterShipsToMe();

  const productTab = await results.selectItemByIndex(Number(data.itemIndex));
  const cart = new EbayCartPage(productTab);

  await new EbayProductPage(productTab).addToCart();
  await expect(productTab).toHaveURL(/cart\.ebay\.com/);

  await cart.proceedToCheckout();

  const frame = productTab.locator('iframe[title="Sign in popup"]').contentFrame();
  await frame.getByTestId('modal-gxo-link').click();

  await productTab.getByRole('textbox', { name: 'Email' }).fill(checkoutData.email);
  await productTab.getByRole('textbox', { name: 'First name' }).fill(checkoutData.firstName);
  await productTab.getByRole('textbox', { name: 'Last name' }).fill(checkoutData.lastName);
  await productTab.getByRole('textbox', { name: 'Street address', exact: true }).fill(checkoutData.street);
  await productTab.getByRole('textbox', { name: 'City' }).fill(checkoutData.city);
  await productTab.getByRole('textbox', { name: 'Phone number (required)' }).fill(checkoutData.phone);
  await productTab.locator('[data-test-id="ADD_ADDRESS_SUBMIT"]').click();
});
