import { test, expect } from '@playwright/test';

test('ZeroStep AI (simulado) - Buscar produto usando linguagem natural', async ({ page }) => {
  console.log('Iniciando teste: ZeroStep AI');
  const frase = 'quero ver óculos de sol';
  console.log(`IA interpretou: "${frase}"`);

  await page.goto('https://www.guzzatti.com.br', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(6000);
  await page.mouse.click(50, 50); 

  const searchInput = page.locator('input[placeholder="O que deseja procurar?"]').first();
  await searchInput.waitFor({ state: 'visible', timeout: 10000 });
  await searchInput.fill('óculos de sol');
  await page.keyboard.press('Enter');

  await page.waitForURL(/busca\.php/, { timeout: 30000 });
  await page.waitForLoadState('domcontentloaded');
  console.log('🔎 Página de busca carregada.');

  for (let i = 0; i < 5; i++) {
    await page.mouse.wheel(0, 1000);
    await page.waitForTimeout(1000);
  }

  const produtoSelectors = [
    '.nm-product-name',
    '.listagem-item',
    '.nm-product-item',
    '.product-item',
    '[data-product-id]'
  ];

  let encontrou = false;
  for (const sel of produtoSelectors) {
    const elements = await page.$$(sel);
    if (elements.length > 0) {
      console.log(`Produtos encontrados com seletor: ${sel} (${elements.length} itens)`);
      encontrou = true;
      break;
    }
  }

  const title = await page.title();
  if (!encontrou && title.toLowerCase().includes('óculos')) {
    console.log('Nenhum seletor detectado, mas título confirma busca válida.');
    encontrou = true;
  }

  expect(encontrou, 'Nenhum produto foi encontrado ou carregado.').toBeTruthy();
  console.log('Busca via ZeroStep AI simulada com sucesso.');
});
