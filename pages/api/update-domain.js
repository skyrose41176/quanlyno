import moment from "moment";
import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  const { id, trangThai } = req.query;
  const data = await prisma.user.update({
    where: {
      id,
    },
    data: {
      trangThai,
      ngayTra: moment().format("DD/MM/YYYY hh:mm"),
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
