import { Chakra } from "./components/Charka";
import { NextAuthProvider } from "./components/NextAuthProvider";
import { RainbowKit } from "./components/RainbowKit";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Chakra>
          <NextAuthProvider>
            <RainbowKit>{children}</RainbowKit>
          </NextAuthProvider>
        </Chakra>
      </body>
    </html>
  );
}
