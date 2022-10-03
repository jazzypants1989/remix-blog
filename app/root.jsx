import { Outlet, Link, Links, LiveReload, Meta } from "remix";
import globalStylesUrl from "./styles/global.css";

export const meta = () => {
  return {
    title: "JESSE RULEZ",
    description: "A remix app",
  };
};

export const links = () => [{ rel: "stylesheet", href: globalStylesUrl }];

export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}

function Document({ children, title }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <title>{title ? title : "Remix Blog"}</title>
      </head>
      <body>{children}</body>
      {process.env.NODE_ENV === "development" && <LiveReload />}
    </html>
  );
}

function Layout({ children }) {
  return (
    <>
      <nav className="navbar">
        <Link to="/" className="logo">
          Remix Blog
        </Link>

        <ul className="nav">
          <li>
            <Link to="/posts">Posts</Link>
          </li>
          <li>
            <Link to="/auth/login">Login</Link>
          </li>
        </ul>
      </nav>

      <main className="container">{children}</main>
    </>
  );
}

export function ErrorBoundary({ error }) {
  console.log(error);
  return (
    <Document>
      <Layout>
        <div>
          <h1>It's not our fault. It's yours.</h1>
          <p>Try again later.</p>
        </div>
      </Layout>
    </Document>
  );
}
