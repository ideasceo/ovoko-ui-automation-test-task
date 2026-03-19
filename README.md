# eBay UI Automation

## Setup

```bash
npm install
npx playwright install
```

## Run

```bash
npm test
or
npm test --headed (better stability with ebay)
```

## Test data

Edit `data/test-data.csv` to change search term, brand, price range or item index.

## Notes

- Tests run sequentially (workers: 1) to avoid cart conflicts
- Checkout flow fills in guest address and stops before payment
- If eBay shows a CAPTCHA the test fails with "Captcha Reached"
