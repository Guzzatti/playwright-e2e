import { test, expect } from '@playwright/test';

test('Deve clicar na aba Black November e acessar a página de outlet', async ({ page }) => {
  console.log('Iniciando teste: Black November');

  await page.goto('https://www.guzzatti.com.br', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(6000);
  await page.mouse.click(50, 50);

  const botaoBlackNovember = page.locator('a[title="Black November"]').first();
  await botaoBlackNovember.waitFor({ state: 'visible', timeout: 10000 });

  const href = await botaoBlackNovember.getAttribute('href');
  console.log('Link encontrado:', href);

  await botaoBlackNovember.click({ force: true });
  console.log('Clicou na aba Black November');

  await page.waitForLoadState('domcontentloaded', { timeout: 20000 });
  const url = page.url();
  console.log('Página carregada:', url);

  expect(url).toContain('/outlet');
  console.log('Teste concluído: Redirecionamento confirmado.');
});
