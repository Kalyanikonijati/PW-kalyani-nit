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

test.describe('Mark all as completed', () => {

  test.beforeEach(async ({ page }) => {
    await createDefaultTodos(page);
  });

  test.afterEach(async ({ page }) => {

    });

  test('should allow me to mark all items as completed', async ({ page }) => {
    // Complete all todos.
    await page.getByText('Mark all as complete').check();

    // Ensure all todos have 'completed' class.
    await expect(page.getByTestId('.toggle-all')).toHaveClass(['completed', 'completed', 'completed']);
  });

  test('should allow me to clear the complete state of all items', async ({ page }) => {
    const toggleAll = page.getByText('Mark all as complete');

    // Check and then immediately uncheck.
    await toggleAll.check();
    await toggleAll.uncheck();

    // Should be no completed classes.
    await expect(page.getByTestId('.toogle-all')).toHaveClass(['', '', '']);
  });

  test('complete all checkbox should update state when items are completed / cleared', async ({ page }) => {
    const toggleAll = page.getByText('Mark all as complete');
    await toggleAll.check();
    await expect(toggleAll).toBeChecked();
    

    // Uncheck first todo.
    const firstTodo = page.getByTestId('.toggle-all').nth(0);
    //const firstTodo = page.getByTestId('checkbox');
    for (const checkbox of await firstTodo.all())
      await checkbox.uncheck();
    
    // Assert the toggle all is checked again.
    await expect(toggleAll).toBeChecked();
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