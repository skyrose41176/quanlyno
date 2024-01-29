import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  const { domain } = req.query;
  const data = await prisma.user.create({
    data: {
      email: domain,
    },
  });

  if (data.error?.code == "forbidden") {
    console.log(data, 1);
    res.status(403).end();
  } else if (data.error?.code == "domain_taken") {
    console.log(data, 2);
    res.status(409).end();
  } else {
    console.log(data, 3);
    res.status(200).end();
  }
}
