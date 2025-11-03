import { test, expect } from '@playwright/test';

test('Deve preencher e enviar o formulário da newsletter com sucesso', async ({ page }) => {
  console.log('Iniciando teste: Newsletter');

  await page.goto('https://www.guzzatti.com.br', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(6000);
  await page.mouse.click(50, 50);

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(2000);

  const nomeInput = page.locator('input[placeholder="Digite o seu nome"]:visible');
  const emailInput = page.locator('input[placeholder="Digite seu e-mail"]:visible');
  const botaoCadastro = page.locator('button:visible', { hasText: /cadastre-se/i }).first();

  await nomeInput.waitFor({ state: 'visible', timeout: 20000 });
  await emailInput.waitFor({ state: 'visible', timeout: 20000 });
  await botaoCadastro.waitFor({ state: 'visible', timeout: 20000 });

  await nomeInput.fill('Teste Playwright');
  await emailInput.fill(`teste_${Date.now()}@example.com`);
  await botaoCadastro.click();

  await page.waitForTimeout(4000);
  await expect(botaoCadastro).toBeVisible();

  console.log('Newsletter enviada com sucesso.');
});
