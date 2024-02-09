import { test, expect, type Page } from '@playwright/test';
import { TODO_ITEMS } from '../data/constance';

test.describe('Counter', () => {
  test('should display the current number of todo items', async ({ page }) => {
    await page.goto('todo');
    // create a new todo locator
    const newTodo = page.getByPlaceholder('What needs to be done?');
    
    // create a todo count locator
    const todoCount = page.getByTestId('todo-count')

    await newTodo.fill(TODO_ITEMS[0]);
    await newTodo.press('Enter');

    await expect(todoCount).toContainText('1');

    await newTodo.fill(TODO_ITEMS[1]);
    await newTodo.press('Enter');
    await expect(todoCount).toContainText('2');
  });
});