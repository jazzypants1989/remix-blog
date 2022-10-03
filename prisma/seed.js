const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

async function seed() {
  await Promise.all(
    getPosts().map((post) => {
      return db.post.create({ data: post });
    })
  );
}

seed();

function getPosts() {
  return [
    {
      title: "Prisma makes databases easy",
      body: "This is a longer description of the post",
    },
    {
      title: "Prisma is next-gen ORM",
      body: "This is a longer description of the post",
    },
    {
      title: "Prisma is awesome",
      body: "This is a longer description of the post",
    },
    {
      title: "Prisma is cool",
      body: "This is a longer description of the post",
    },
  ];
}
