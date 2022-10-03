import { useLoaderData } from "remix";

export default function Index() {
  let data = useLoaderData();

  return (
    <div className="remix__page">
      <main>
        <h1>I eat cheese in the night time.</h1>
        <h2> I eat cheese in the day. </h2>
        <p>
          I eat cheese in the morning and in the evening and at supper time. Let
          me tell you more about cheese... I think cheese is the best food in
          the world. I love cheese. I love cheese. I love cheese. I love cheese.
          I love cheese. I love cheese. I love cheese. I love cheese. I love
          cheese.
        </p>
      </main>
    </div>
  );
}
