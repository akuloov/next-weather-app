"use client"

import {Inter} from "next/font/google";
import "./globals.css";
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'

const inter = Inter({subsets: ["latin"]});

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient()
  return (
    <html lang="en">
    <head>
      <title>Maksym Akulov</title>
      <link rel="icon" href="/favicon.svg" sizes="any"/>
    </head>
    <QueryClientProvider client={queryClient}>
      <body className={inter.className}>{children}</body>
    </QueryClientProvider>
    </html>
  );
}
