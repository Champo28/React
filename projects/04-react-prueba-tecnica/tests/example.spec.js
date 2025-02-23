// @ts-check
import { test, expect } from '@playwright/test'

const CAT_API_URL = 'https://cataas.com'
const LOCAL_HOST_URL = 'http://localhost:5173/'

test('app shows random fact and image', async ({ page }) => {
  await page.goto(LOCAL_HOST_URL)

  const text = page.getByRole('paragraph')
  const image = page.getByRole('img')

  const textContent = await text.textContent()
  const imgSrc = await image.getAttribute('src')

  expect(textContent?.length).toBeGreaterThan(0)
  expect(imgSrc?.startsWith(CAT_API_URL)).toBeTruthy()
})

test('button get new fact show a new fact and a new image', async ({ page }) => {
  await page.goto(LOCAL_HOST_URL)

  const text = page.getByRole('paragraph')
  const image = page.getByRole('img')

  const textContent = await text.textContent()
  const imgSrc = await image.getAttribute('src')

  await page.getByRole('button').click()

  await page.waitForTimeout(5000)

  const newText = page.getByRole('paragraph')
  const newImage = page.getByRole('img')

  const newTextContent = await newText.textContent()
  const newImgSrc = await newImage.getAttribute('src')

  console.log({ textContent, newTextContent })
  console.log({ imgSrc, newImgSrc })

  expect(newTextContent?.length).toBeGreaterThan(0)
  expect(newImgSrc?.startsWith(`${CAT_API_URL}`)).toBeTruthy()

  expect(textContent).not.toBe(newTextContent)
  expect(imgSrc).not.toBe(newImgSrc)
})
