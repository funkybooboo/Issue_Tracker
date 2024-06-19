import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '@radix-ui/themes/styles.css';
import {Container, Theme} from "@radix-ui/themes";
import './theme.config.css';
import "./globals.css";
import NavBar from "@/app/NavBar";
import React from "react";
import AuthProvider from "@/app/auth/Provider";

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
      <AuthProvider>
        <Theme accentColor="violet" appearance={"light"}>
          <NavBar/>
          <main className={"p-5"}>
            <Container>
              {children}
            </Container>
          </main>
        </Theme>
      </AuthProvider>
      </body>
    </html>
  );
}
