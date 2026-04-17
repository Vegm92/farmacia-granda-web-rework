import { render, screen } from '@testing-library/react'
import CartBadge from '@/components/layout/CartBadge'
import * as cartContext from '@/lib/cart-context'

jest.mock('@/lib/cart-context')
jest.mock('next/link', () => ({ __esModule: true, default: ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a> }))

import React from 'react'

afterEach(() => jest.resetAllMocks())

describe('CartBadge', () => {
  it('shows no badge when cart is empty', () => {
    jest.mocked(cartContext.useCart).mockReturnValue({
      cart: { items: [], totals: { total_items: '0', total_price: '0', currency_code: 'EUR', currency_minor_unit: 2 } },
      refresh: jest.fn(),
    })
    render(<CartBadge />)
    expect(screen.queryByText(/^\d+$/)).not.toBeInTheDocument()
  })

  it('shows item count when cart has items', () => {
    jest.mocked(cartContext.useCart).mockReturnValue({
      cart: {
        items: [
          { key: 'a', id: 1, name: 'X', quantity: 3, prices: { price: '100', regular_price: '100', currency_code: 'EUR', currency_minor_unit: 2 }, images: [] },
          { key: 'b', id: 2, name: 'Y', quantity: 2, prices: { price: '200', regular_price: '200', currency_code: 'EUR', currency_minor_unit: 2 }, images: [] },
        ],
        totals: { total_items: '500', total_price: '500', currency_code: 'EUR', currency_minor_unit: 2 },
      },
      refresh: jest.fn(),
    })
    render(<CartBadge />)
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('links to /carrito', () => {
    jest.mocked(cartContext.useCart).mockReturnValue({ cart: null, refresh: jest.fn() })
    render(<CartBadge />)
    expect(screen.getByRole('link')).toHaveAttribute('href', '/carrito')
  })
})
