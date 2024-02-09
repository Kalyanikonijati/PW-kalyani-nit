import { test, expect, type Page } from '@playwright/test';
import { TODO_ITEMS } from '../data/constance';

//create todo list
test.describe('New Todo', () => {
  test('should allow me to add todo items', async ({ page }) => {

    // Arrange
    await page.goto('todo');

    // Act
    const newTodo = page.getByPlaceholder('What needs to be done?');
    await newTodo.fill(TODO_ITEMS[0]);
    await newTodo.press('Enter');

    // Assert
    await expect(page.getByText(TODO_ITEMS[0], { exact: true })).toBeVisible();

    // Act
    await newTodo.fill(TODO_ITEMS[1]);
    await newTodo.press('Enter');

    // Assert
    await expect(page.getByText(TODO_ITEMS[0], { exact: true })).toBeVisible();
    await expect(page.getByText(TODO_ITEMS[1], { exact: true })).toBeVisible();

  });

  test('should clear text input field when an item is added', async ({ page }) => {

    // Arrange
    await page.goto('todo');

    // Act
    const newTodo = page.getByPlaceholder('What needs to be done?');
    await newTodo.fill(TODO_ITEMS[0]);
    await newTodo.press('Enter');

    // Assert
    await expect(newTodo).toBeEmpty();
  });

  test('should append new items to the bottom of the list', async ({ page }) => {

    // Arrange
    await page.goto('todo');

    // Act
    const newTodo = page.getByPlaceholder('What needs to be done?');
    await newTodo.fill(TODO_ITEMS[0]);
    await newTodo.press('Enter');

    // Assert
    await expect(page.getByText(TODO_ITEMS[0], { exact: true })).toBeVisible();
    let todo_items = await page.locator("ul.todo-list > li").allInnerTexts();
    const lastItem = todo_items[todo_items.length - 1];
    expect(TODO_ITEMS[0] == lastItem).toBe(true);

  });
});