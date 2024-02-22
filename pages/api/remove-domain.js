import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  const { id } = req.query;
  const data = await prisma.post.delete({
    where: {
      id,
    },
  });

  if (data.error?.code == "forbidden") {
    res.status(403).end();
  } else if (data.error?.code == "domain_taken") {
    res.status(409).end();
  } else {
    res.status(200).end();
  }
}

const restrictedDomains = ["portfolio.steventey.com", "cat.vercel.pub"];
