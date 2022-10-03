import { useActionData, json, redirect } from "remix";
import { db } from "~/utils/db.server";

function validateUsername(username) {
  if (typeof username !== "string" || username.length < 5) {
    return "Username must be at least 5 characters";
  } else if (username.length > 20) {
    return "Username must be less than 20 characters";
  } else if (username.includes(" ")) {
    return "Username cannot contain spaces";
  } else if (username.includes(password)) {
    return "Username cannot contain password";
  }
}

function validatePassword(password) {
  if (typeof password !== "string" || password.length < 5) {
    return "Password must be at least 5 characters";
  } else if (password.length > 20) {
    return "Password must be less than 20 characters";
  } else if (password.includes(" ")) {
    return "Password cannot contain spaces";
  } else if (password.includes(username)) {
    return "Password cannot contain username";
  }
}

function badRequest(data) {
  return json(data, { status: 400 });
}

export const action = async ({ request }) => {
  const form = await request.formData();
  const loginType = form.get("loginType");
  const username = form.get("username");
  const password = form.get("password");

  const fields = { loginType, username, password };

  const fieldErrors = {
    username: validateUsername(username),
    password: validatePassword(password),
  };

  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({ fieldErrors, fields });
  }
};

const Login = () => {
  const actionData = useActionData();

  return (
    <div className="auth-container">
      <div className="page-header">
        <h1>Log-In!</h1>
      </div>

      <div className="page-content">
        <form method="POST">
          <fieldset>
            <legend>Log-in or Register</legend>
            <label>
              <input
                type="radio"
                name="loginType"
                value="login"
                defaultChecked={
                  !actionData?.fields?.loginType ||
                  actionData?.fields?.loginType === "login"
                }
              />{" "}
              Log-in
              <input type="radio" name="loginType" value="register" /> Register
            </label>
          </fieldset>
          <div className="form-control">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              defaultValue={actionData?.fields?.username}
            />
            <div className="error">
              {actionData?.fieldErrors?.username && (
                <span>{actionData?.fieldErrors?.username}</span>
              )}
            </div>
          </div>
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              defaultValue={actionData?.fields?.password}
            />
            <div className="error">
              {actionData?.fieldErrors?.password && (
                <span>{actionData?.fieldErrors?.password}</span>
              )}
            </div>
          </div>
          <button type="submit" className="btn btn-block">
            Submit{" "}
          </button>
        </form>
      </div>
    </div>
  );
};
export default Login;
