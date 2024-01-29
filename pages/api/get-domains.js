import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  const data = await prisma.user.findMany({
    orderBy: [
      {
        id: "desc",
      },
    ],
  });

  res.send(data);
}
