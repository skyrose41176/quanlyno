import moment from "moment";
import prisma from "../../lib/prisma";
import "moment/locale/vi";

export default async function handler(req, res) {
  const { id, trangThai } = req.query;
  moment.locale("vi");
  moment.updateLocale("vi", {
    invalidDate: "-",
  });
  const data = await prisma.post.update({
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
