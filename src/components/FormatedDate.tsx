'use client'

import { useEffect, useState } from 'react'

// This component ensures that date formatting only happens on the client side,
// preventing hydration errors.
export function FormattedDate({ date }: { date: Date | string }) {
  const [formattedDate, setFormattedDate] = useState('')

  useEffect(() => {
    // We format the date inside a useEffect hook. This guarantees that the code
    // will only run in the browser after the component has mounted.
    setFormattedDate(new Date(date).toLocaleDateString())
  }, [date])

  // Initially, this will render an empty string on the server and during the
  // first client render, then it will update with the formatted date.
  // This prevents the server/client mismatch.
  if (!formattedDate) {
    return null // Or you can return a loading skeleton
  }

  return <>{formattedDate}</>
}

