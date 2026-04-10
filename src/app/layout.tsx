import type { Metadata } from "next";
import { JetBrains_Mono, Lora, Outfit } from "next/font/google";
import "./globals.css";

const fontSans = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
});

const fontSerif = Lora({
  variable: "--font-serif",
  subsets: ["latin"],
});

const fontMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "eTuitionBD | Trusted Tuition Marketplace",
  description:
    "Find trusted tutors and tuition opportunities across Bangladesh with eTuitionBD.",
};

const themeInitScript = `
(() => {
  try {
    const storageKey = "theme";
    const storedTheme = localStorage.getItem(storageKey);
    const theme =
      storedTheme === "light" || storedTheme === "dark" || storedTheme === "system"
        ? storedTheme
        : "system";
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = theme === "dark" || (theme === "system" && prefersDark);
    document.documentElement.classList.toggle("dark", shouldUseDark);
    document.documentElement.setAttribute("data-theme", theme);
  } catch {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontSans.variable} ${fontSerif.variable} ${fontMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
