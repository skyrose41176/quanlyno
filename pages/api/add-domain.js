export default async function handler(req, res) {
  const { domain } = req.query;
  const data = await prisma.user.create({
    data: {
      email: domain,
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
