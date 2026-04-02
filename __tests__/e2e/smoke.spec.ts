import { test, expect } from '@playwright/test';

test.describe('Smoke test — Frontier AI Safety Exodus Tracker', () => {
  test('page loads without error, shows cards, filter works, source links open in new tab', async ({
    page,
  }) => {
    // 1. Page loads without error
    await page.goto('/');
    await expect(page).toHaveTitle(/Frontier AI Safety Exodus Tracker/);

    // 2. At least one DepartureCard is visible
    const cards = page.locator('[data-testid^="departure-card-"]');
    await expect(cards.first()).toBeVisible();
    const initialCount = await cards.count();
    expect(initialCount).toBeGreaterThan(0);

    // 3. Filtering by "OpenAI" removes non-OpenAI cards
    await page.click('[data-testid="filter-openai"]');
    // Wait for re-render
    await page.waitForTimeout(100);
    const allBadgesAfterFilter = await page.locator('[data-testid^="badge-company-"]').allTextContents();
    for (const badge of allBadgesAfterFilter) {
      expect(badge).toBe('OpenAI');
    }
    // Count should be <= initial count
    const filteredCount = await cards.count();
    expect(filteredCount).toBeLessThanOrEqual(initialCount);

    // 4. A source_url link has target="_blank"
    const sourceLink = page.locator('[data-testid^="source-link-"]').first();
    await expect(sourceLink).toHaveAttribute('target', '_blank');
    await expect(sourceLink).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
