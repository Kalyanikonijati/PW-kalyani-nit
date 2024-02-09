import { test, expect, type Page } from '@playwright/test';
import { TODO_ITEMS } from '../data/constance';

test.describe('Routing', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('todo');
    await createDefaultTodos(page);
    // make sure the app had a chance to save updated todos in storage
    // before navigating to a new view, otherwise the items can get lost :(
    // in some frameworks like Durandal
  });

  test('should allow me to display active items', async ({ page }) => {
    await page.goto('todo');
    const todoItem = page.getByTestId('todo-item');
    await page.getByTestId('todo-item').nth(1).getByRole('checkbox').check();

    await page.getByRole('link', { name: 'Active' }).click();
    await expect(todoItem).toHaveCount(2);
    await expect(todoItem).toHaveText([TODO_ITEMS[0], TODO_ITEMS[2]]);
  });

  test('should respect the back button', async ({ page }) => {
    await page.goto('todo');
    const todoItem = page.getByTestId('todo-item'); 
    await page.getByTestId('todo-item').nth(1).getByRole('checkbox').check();


    await test.step('Showing all items', async () => {
      await page.getByRole('link', { name: 'All' }).click();
      await expect(todoItem).toHaveCount(3);
    });

    await test.step('Showing active items', async () => {
      await page.getByRole('link', { name: 'Active' }).click();
    });

    await test.step('Showing completed items', async () => {
      await page.getByRole('link', { name: 'Completed' }).click();
    });

    await expect(todoItem).toHaveCount(1);
    await page.goBack();
    await expect(todoItem).toHaveCount(2);
    await page.goBack();
    await expect(todoItem).toHaveCount(3);
  });

  test('should allow me to display completed items', async ({ page }) => {
    await page.goto('todo');
    await page.getByTestId('todo-item').nth(1).getByRole('checkbox').check();
    await page.getByRole('link', { name: 'Completed' }).click();
    await expect(page.getByTestId('todo-item')).toHaveCount(1);
  });

  test('should allow me to display all items', async ({ page }) => {
    await page.getByTestId('todo-item').nth(1).getByRole('checkbox').check();
    await page.getByRole('link', { name: 'Active' }).click();
    await page.getByRole('link', { name: 'Completed' }).click();
    await page.getByRole('link', { name: 'All' }).click();
    await expect(page.getByTestId('todo-item')).toHaveCount(3);
  });

  test('should highlight the currently applied filter', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'All' })).toHaveClass('selected');
    
    //create locators for active and completed links
    const activeLink = page.getByRole('link', { name: 'Active' });
    const completedLink = page.getByRole('link', { name: 'Completed' });
    await activeLink.click();

    // Page change - active items.
    await expect(activeLink).toHaveClass('selected');
    await completedLink.click();

    // Page change - completed items.
    await expect(completedLink).toHaveClass('selected');
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