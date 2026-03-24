import { render, screen, fireEvent } from '@testing-library/react'
import ProductFilters from '@/components/product/ProductFilters'

const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
  usePathname: () => '/categoria/salud',
  useSearchParams: () => new URLSearchParams(),
}))

describe('ProductFilters', () => {
  beforeEach(() => {
    mockPush.mockClear()
  })

  it('renders the sort select with accessible label', () => {
    render(<ProductFilters currentSort="default" />)
    expect(screen.getByRole('combobox', { name: /ordenar/i })).toBeInTheDocument()
  })

  it('renders all four sort options', () => {
    render(<ProductFilters currentSort="default" />)
    expect(screen.getByRole('option', { name: /defecto/i })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: /menor a mayor/i })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: /mayor a menor/i })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: /recientes/i })).toBeInTheDocument()
  })

  it('calls router.push with sort param when sort changes', () => {
    render(<ProductFilters currentSort="default" />)
    const select = screen.getByRole('combobox', { name: /ordenar/i })
    fireEvent.change(select, { target: { value: 'price_asc' } })
    expect(mockPush).toHaveBeenCalledWith('/categoria/salud?sort=price_asc')
  })
})
