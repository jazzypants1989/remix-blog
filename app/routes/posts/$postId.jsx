import { FormImpl } from "@remix-run/react/dist/components";
import { useLoaderData, Link, redirect } from "remix";
import { db } from "~/utils/db.server";

export const loader = async ({ params }) => {
  const post = await db.post.findUnique({
    where: { id: params.postId },
  });

  if (!post) throw new Error("Post not found");

  const data = { post };

  return data;
};

export const action = async ({ request, params }) => {
  const form = await request.formData();
  if (form.get("_method") === "DELETE") {
    await db.post.delete({
      where: { id: params.postId },
    });
    return redirect("/posts");
  }

  return redirect(`/posts/${params.postId}`);
};

const Post = () => {
  const { post } = useLoaderData();

  return (
    <div>
      <div className="page-header">
        <h1>{post.title}</h1>
        <Link to="/posts" className="btn btn-reverse">
          Back
        </Link>
      </div>
      <div className="page-content">
        <p>{post.body}</p>
        <em>{new Date(post.createdAt).toLocaleString()}</em>
        <div className="page-footer">
          <form method="POST">
            <input type="hidden" name="_method" value="DELETE" />
            <button className="btn btn-delete">Delete</button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Post;
