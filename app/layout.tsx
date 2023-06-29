import { Chakra } from "./components/Charka";
import { RainbowKit } from "./components/RainbowKit";
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    return (
    <html lang="en">
      <body>
        <Chakra>
          {/* <RainbowKit> */}
          {children}
          {/* </RainbowKit> */}
        </Chakra>
      </body>
    </html>
  );
}
