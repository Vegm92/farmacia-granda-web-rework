import { readFileSync } from 'fs'
import { join } from 'path'

const css = readFileSync(join(process.cwd(), 'app/globals.css'), 'utf-8')

test('primary color token is defined in CSS', () => {
  expect(css).toContain('--color-primary:')
  expect(css).toContain('#1b4332')
})

test('amber token is defined in CSS', () => {
  expect(css).toContain('--color-brand-amber:')
  expect(css).toContain('#f59e0b')
})

test('fg-primary token is defined', () => {
  expect(css).toContain('--color-fg-primary:')
  expect(css).toContain('#1a1a2e')
})
