import { render, screen } from '@testing-library/react'
import TrustBar from '../../components/home/TrustBar'

test('renders all four trust items', () => {
  render(<TrustBar />)
  expect(screen.getByText('Envío 24-48h')).toBeInTheDocument()
  expect(screen.getByText('Farmacéuticos expertos')).toBeInTheDocument()
  expect(screen.getByText('Pago seguro')).toBeInTheDocument()
  expect(screen.getByText('Devolución fácil')).toBeInTheDocument()
})

test('renders subtitles for each item', () => {
  render(<TrustBar />)
  expect(screen.getByText('Gratis en pedidos +39€')).toBeInTheDocument()
  expect(screen.getByText('Trusted Shops certificado')).toBeInTheDocument()
})
