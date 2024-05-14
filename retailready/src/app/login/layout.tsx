import { BrowserRouter as Router } from "react-router-dom";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Router>
      <div>{children}</div>
    </Router>
  );
}
