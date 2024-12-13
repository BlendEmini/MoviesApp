"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ApolloProvider } from "@apollo/client";
import client from "./lib/apolloClient";
import { LanguageProvider } from "./LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ApolloProvider client={client}>
          <LanguageProvider>{children}</LanguageProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}
