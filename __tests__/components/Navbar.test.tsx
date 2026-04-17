import { render, screen } from '@testing-library/react'
import Navbar from '../../components/layout/Navbar'
import * as cartContext from '@/lib/cart-context'

jest.mock('@/lib/cart-context')

beforeEach(() => {
  jest.mocked(cartContext.useCart).mockReturnValue({ cart: null, refresh: jest.fn() })
})

const links = [
  { label: 'Dermofarmacia', href: '/categoria/dermofarmacia' },
  { label: 'Bebé y Maternidad', href: '/categoria/bebe-maternidad' },
  { label: 'Salud', href: '/categoria/salud' },
  { label: 'Nutrición', href: '/categoria/nutricion' },
  { label: 'Óptica', href: '/categoria/optica' },
  { label: 'Ofertas', href: '/ofertas', highlight: true },
]

test('renders the brand name', () => {
  render(<Navbar links={links} />)
  expect(screen.getByText('Farmacia Granda')).toBeInTheDocument()
})

test('renders all nav links', () => {
  render(<Navbar links={links} />)
  expect(screen.getByText('Dermofarmacia')).toBeInTheDocument()
  expect(screen.getByText('Ofertas')).toBeInTheDocument()
})

test('Ofertas link has amber highlight class', () => {
  render(<Navbar links={links} />)
  const ofertas = screen.getByText('Ofertas')
  expect(ofertas).toHaveClass('text-brand-amber')
})

test('renders search, user and cart icons', () => {
  render(<Navbar links={links} />)
  expect(screen.getByLabelText('Buscar')).toBeInTheDocument()
  expect(screen.getByLabelText('Mi cuenta')).toBeInTheDocument()
  expect(screen.getByLabelText(/carrito/i)).toBeInTheDocument()
})
