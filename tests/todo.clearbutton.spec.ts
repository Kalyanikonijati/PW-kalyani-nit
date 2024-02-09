import { test, expect, type Page } from '@playwright/test';
import { TODO_ITEMS } from '../data/constance';

test.describe('Clear completed button', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('todo');
    await createDefaultTodos(page);
  });

  test('should display the correct text', async ({ page }) => {
    await page.goto('todo');
    await page.locator('.todo-list li .toggle').first().check();
    await expect(page.getByRole('button', { name: 'Clear completed' })).toBeVisible();
  });

  test('should remove completed items when clicked', async ({ page }) => {
    await page.goto('todo');
    const todoItems = page.getByTestId('todo-item');
    await todoItems.nth(1).getByRole('checkbox').check();
    await page.getByRole('button', { name: 'Clear completed' }).click();
    await expect(todoItems).toHaveCount(2);
    await expect(todoItems).toHaveText([TODO_ITEMS[0], TODO_ITEMS[2]]);
  });

  test('should be hidden when there are no items that are completed', async ({ page }) => {
    await page.goto('todo');
    await page.locator('.todo-list li .toggle').first().check();
    await page.getByRole('button', { name: 'Clear completed' }).click();
    await expect(page.getByRole('button', { name: 'Clear completed' })).toBeHidden();
  });
});

async function createDefaultTodos(page: Page) {
  await page.goto('todo');
    // create a new todo locator
    const newTodo = page.getByPlaceholder('What needs to be done?');
  
    for (const item of TODO_ITEMS) {
      await page.goto('todo');
      await newTodo.fill(item);
      await newTodo.press('Enter');
    }
  }