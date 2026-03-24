import { render, screen } from '@testing-library/react'
import Hero from '../../components/home/Hero'

const pills = ['Dermofarmacia', 'Bebé y Maternidad', 'Vitaminas', 'Óptica', 'Higiene Bucal']

test('renders the main heading', () => {
  render(<Hero pills={pills} />)
  expect(screen.getByRole('heading', { name: /Encuentra lo que necesitas/i })).toBeInTheDocument()
})

test('renders the search input', () => {
  render(<Hero pills={pills} />)
  expect(screen.getByPlaceholderText(/Busca un producto/i)).toBeInTheDocument()
})

test('renders the Buscar button', () => {
  render(<Hero pills={pills} />)
  expect(screen.getByRole('button', { name: /Buscar/i })).toBeInTheDocument()
})

test('renders all category pills', () => {
  render(<Hero pills={pills} />)
  pills.forEach((pill) => {
    expect(screen.getByText(pill)).toBeInTheDocument()
  })
})
