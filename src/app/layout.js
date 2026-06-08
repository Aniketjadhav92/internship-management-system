import "./globals.css";

export const metadata = {
  title: "InternHub",
  description: "Internship Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}