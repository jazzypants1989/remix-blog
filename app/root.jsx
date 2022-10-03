import { Outlet, Link, Links, LiveReload, Meta, useLoaderData } from "remix";
import globalStylesUrl from "./styles/global.css";
import { getUser } from "./utils/session.server";

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

export const loader = async ({ request }) => {
  const user = await getUser(request);
  const data = { user };
  return data;
};

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
  const { user } = useLoaderData();

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
          {user ? (
            <li>
              <form action="/auth/logout" method="POST">
                <button type="submit" className="btn">
                  Logout {user.username}
                </button>
              </form>
            </li>
          ) : (
            <li>
              <Link to="/auth/login">Login</Link>
            </li>
          )}
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
          <p>{error.message}</p>
        </div>
      </Layout>
    </Document>
  );
}
