// app/layout.js
export const metadata = {
  title: "Percentage Calculator",
  description: "A simple and professional percentage calculator app built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header style={{ padding: "10px", color: "#003366", textAlign: "center" }}>
          <h1>Percentage Calculator</h1>
          <p>Please provide any two values below and click the "Calculate" button to get the third value.</p>
        </header>
        <main>{children}</main>
          
        <footer style={{ textAlign: "center", padding: "10px", marginTop: "20px", background: "#f8f9fa" }}>About|Terms|Privacy|Contact|2024|Copyright</footer>
      </body>
    </html>
  );
}
