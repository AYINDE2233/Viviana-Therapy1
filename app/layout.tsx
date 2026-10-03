import "./globals.css";

export const metadata = {
  title: "Therapy by Vivianaspa",
  description:
    "Expert therapeutic massage to restore your mind, body, and wellness.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
