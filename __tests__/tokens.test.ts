import { readFileSync } from 'fs'
import { join } from 'path'

const css = readFileSync(join(process.cwd(), 'app/globals.css'), 'utf-8')

test('primary color token is defined in CSS', () => {
  expect(css).toMatch(/--color-primary:\s*#1b4332/)
})

test('amber token is defined in CSS', () => {
  expect(css).toMatch(/--color-brand-amber:\s*#f59e0b/)
})

test('fg-primary token is defined', () => {
  expect(css).toMatch(/--color-fg-primary:\s*#1a1a2e/)
})

test('border token is defined', () => {
  expect(css).toMatch(/--color-border:\s*#e9ecef/)
})
