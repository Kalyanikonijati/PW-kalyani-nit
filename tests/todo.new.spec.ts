import { test, expect, type Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://example.cypress.io/todo#/');
});
//create todo list
const TODO_ITEMS = [
  'buy some cheese',
  'feed the cat',
  'book a doctors appointment'
];

test.describe('New Todo', () => {
  test.only('should allow me to add todo items', async ({ page }) => {
    
    // create a new todo locator
    const newTodo = page.getByPlaceholder('What needs to be done?');

    // Create 1st todo.
    await newTodo.fill(TODO_ITEMS[0]);
    await newTodo.press('Enter');

      // Make sure the list only has one todo item.
      await expect(page.getByText(TODO_ITEMS[0], { exact: true })).toBeVisible();

    // Create 2nd todo.
    await newTodo.fill(TODO_ITEMS[1]);
    await newTodo.press('Enter');

    // Make sure the list now has two todo items.
    await expect(page.getByText(TODO_ITEMS[0], { exact: true })).toBeVisible();
    await expect(page.getByText(TODO_ITEMS[1], { exact: true })).toBeVisible();

  });

  test.only('should clear text input field when an item is added', async ({ page }) => {
  
    // create a new todo locator
    const newTodo = page.getByPlaceholder('What needs to be done?');

    // Create one todo item.
    await newTodo.fill(TODO_ITEMS[0]);
    await newTodo.press('Enter');

    // Check that input is empty.
    await expect(newTodo).toBeEmpty();
  });

  test('should append new items to the bottom of the list', async ({ page }) => {

    const newTodo = page.getByPlaceholder('What needs to be done?');

    // Create 3 items.
    await createDefaultTodos(page);

    // create a todo count locator
    const todoCount = page.getByTestId('toggle-all');
  
    // Check test using different methods.
    await expect(page.getByText(TODO_ITEMS[0], { exact: true })).toBeVisible();
    const noItems = await page.locator('.footer .todo-count').innerText();
    expect (noItems == '3 items left').toBe(false);

    // Check all items.
    await expect(page.getByText(TODO_ITEMS[0], { exact: true })).toBeVisible();
    await expect(page.getByText(TODO_ITEMS[1], { exact: true })).toBeVisible();
    await expect(page.getByText(TODO_ITEMS[2], { exact: true })).toBeVisible();
   
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