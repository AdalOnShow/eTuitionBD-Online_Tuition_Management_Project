import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["600", "700"],
});

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://etuitionbd.com"),
  title: {
    default: "eTuitionBD | Trusted Tuition Marketplace",
    template: "%s | eTuitionBD",
  },
  description:
    "Find trusted tutors and tuition opportunities across Bangladesh with eTuitionBD.",
  applicationName: "eTuitionBD",
  keywords: [
    "Bangladesh tutors",
    "tuition marketplace",
    "private tutor",
    "student dashboard",
    "tutor jobs",
  ],
  openGraph: {
    title: "eTuitionBD | Trusted Tuition Marketplace",
    description:
      "Find trusted tutors and tuition opportunities across Bangladesh with eTuitionBD.",
    type: "website",
    locale: "en_BD",
    siteName: "eTuitionBD",
  },
  twitter: {
    card: "summary_large_image",
    title: "eTuitionBD | Trusted Tuition Marketplace",
    description:
      "Find trusted tutors and tuition opportunities across Bangladesh with eTuitionBD.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${display.variable} ${sans.variable} flex min-h-full flex-col antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
