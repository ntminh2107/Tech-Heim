// src/StripeProvider.tsx
import React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(import.meta.env.STRIPE_PUBLISH_KEY) // Replace with your Stripe publishable key

export const StripeProvider: React.FC = ({ children }) => {
  return <Elements stripe={stripePromise}>{children}</Elements>
}
