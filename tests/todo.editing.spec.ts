import { test, expect, type Page } from '@playwright/test';
import { TODO_ITEMS } from '../data/constance';

test.describe('Editing', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('todo');
    await createDefaultTodos(page);
  });

  test('should hide other controls when editing', async ({ page }) => {
    await page.goto('todo');
    const todoItem = page.getByTestId('todo-item').nth(1);
    await todoItem.dblclick();
    await expect(todoItem.getByRole('checkbox')).not.toBeVisible();
    await expect(todoItem.locator('label', {
      hasText: TODO_ITEMS[1],
    })).not.toBeVisible();
  });

  test('should save edits on blur', async ({ page }) => {
    await page.goto('todo');
    const todoItems = page.getByTestId('todo-item');
    await todoItems.nth(1).dblclick();
    await todoItems.nth(1).getByRole('textbox', { name: 'Edit' }).fill('buy some sausages');
    await todoItems.nth(1).getByRole('textbox', { name: 'Edit' }).dispatchEvent('blur');

    await expect(todoItems).toHaveText([
      TODO_ITEMS[0],
      'buy some sausages',
      TODO_ITEMS[2],
    ]);
  });

  test('should trim entered text', async ({ page }) => {
    await page.goto('todo');
    const todoItems = page.getByTestId('todo-item');
    await todoItems.nth(1).dblclick();
    await todoItems.nth(1).getByRole('textbox', { name: 'Edit' }).fill('    buy some sausages    ');
    await todoItems.nth(1).getByRole('textbox', { name: 'Edit' }).press('Enter');

    await expect(todoItems).toHaveText([
      TODO_ITEMS[0],
      'buy some sausages',
      TODO_ITEMS[2],
    ]);
   
  });

  test('should remove the item if an empty text string was entered', async ({ page }) => {
    const todoItems = page.getByTestId('todo-item');
    await todoItems.nth(1).dblclick();
    await todoItems.nth(1).getByRole('textbox', { name: 'Edit' }).fill('');
    await todoItems.nth(1).getByRole('textbox', { name: 'Edit' }).press('Enter');

    await expect(todoItems).toHaveText([
      TODO_ITEMS[0],
      TODO_ITEMS[2],
    ]);
  });

  test('should cancel edits on escape', async ({ page }) => {
    const todoItems = page.getByTestId('todo-item');
    await todoItems.nth(1).dblclick();
    await todoItems.nth(1).getByRole('textbox', { name: 'Edit' }).fill('buy some sausages');
    await todoItems.nth(1).getByRole('textbox', { name: 'Edit' }).press('Escape');
    await expect(todoItems).toHaveText(TODO_ITEMS);
  });
});

async function createDefaultTodos(page: Page) {
  // create a new todo locator
  const newTodo = page.getByPlaceholder('What needs to be done?');

  for (const item of TODO_ITEMS) {
    await newTodo.fill(item);
    await newTodo.press('Enter');
  }
}