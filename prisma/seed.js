const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seed() {
  const john = await prisma.user.create({
    data: {
      username: "jiggaman",
      email: "john@doe.com",
      passwordHash:
        "$2b$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u", // password: "twixrox"
    },
  });

  await Promise.all(
    getPosts().map((post) => {
      const data = { userId: john.id, ...post };
      return prisma.post.create({ data });
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
