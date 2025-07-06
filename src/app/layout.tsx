import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/footer/Footer";
import { PageLoaderProvider } from "@/contexts/PageLoaderContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AutoDealer - Премиальные автомобили",
  description: "Ведущий дилер премиальных автомобилей. Более 2500 проверенных автомобилей с гарантией качества.",
  keywords: ["автомобили", "продажа авто", "премиальные автомобили", "дилер"],
  authors: [{ name: "AutoDealer" }],
  robots: "index, follow",
  openGraph: {
    title: "AutoDealer - Премиальные автомобили",
    description: "Ведущий дилер премиальных автомобилей. Более 2500 проверенных автомобилей с гарантией качества.",
    type: "website",
    locale: "ru_RU",
    siteName: "AutoDealer",
  },
  twitter: {
    card: "summary_large_image",
    title: "AutoDealer - Премиальные автомобили",
    description: "Ведущий дилер премиальных автомобилей. Более 2500 проверенных автомобилей с гарантией качества.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <PageLoaderProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 pt-14 sm:pt-16">
              {children}
            </main>
            <Footer />
          </div>
        </PageLoaderProvider>
      </body>
    </html>
  );
}
