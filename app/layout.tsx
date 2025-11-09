export const metadata = {
  title: "??????? ????? ???????",
  description: "24x12 ??? + 4 ???? + ????????"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hi">
      <body style={{
        margin: 0,
        fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, Noto Sans, "Apple Color Emoji", "Segoe UI Emoji"'
      }}>
        {children}
      </body>
    </html>
  );
}
