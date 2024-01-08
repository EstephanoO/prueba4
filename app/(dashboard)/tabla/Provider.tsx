"use client"
import React, { useState } from "react"
import { QueryClientProvider, QueryClient } from "react-query"

function Provider({ children }: any) {
  const [client] = useState(new QueryClient())

  return (
    <>
      <QueryClientProvider client={client}>
        {children}
      </QueryClientProvider>
    </>
  )
}

export { Provider }
