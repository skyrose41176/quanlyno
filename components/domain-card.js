import { useState } from "react";
import LoadingDots from "../components/loading-dots";
import ConfiguredSection from "./configured-section";

const DomainCard = ({ item, revalidateDomains }) => {
  const { id, ten, tien, ghiChu, trangThai, ngayTao, ngayTra } = item;
  const [removing, setRemoving] = useState(false);
  const [update, setUpdate] = useState(false);
  return (
    <div className="w-full mt-2 sm:shadow-md border-y sm:border border-black sm:border-gray-50 sm:rounded-lg py-4">
      <div className="flex justify-between space-x-4 px-2 sm:px-10 mb-2">
        <div>{ten}</div>
        <div className="text-xl">
          {new Intl.NumberFormat("en-US", {
            style: "decimal",
          }).format(tien)}
          $
        </div>
      </div>
      <ConfiguredSection ghiChu={ghiChu} />
      <div className="flex justify-between space-x-4 px-2 sm:px-10 mb-2">
        <div>Ngày tạo: {ngayTao}</div>
      </div>
      <div className="flex justify-between space-x-4 px-2 sm:px-10 mb-2">
        <div>Ngày trả: {ngayTra}</div>
      </div>
      <div className="flex justify-between space-x-4 px-2 sm:px-10 mt-2">
        <div className="flex  flex-1 space-x-3">
          {trangThai == "1" ? (
            <button
              onClick={async () => {
                setUpdate(true);
                try {
                  await fetch(`/api/update-domain?id=${id}&trangThai=2`);
                  await revalidateDomains();
                } catch (error) {
                  alert(`Error removing domain`);
                } finally {
                  setUpdate(false);
                }
              }}
              disabled={update}
              className={`${
                update ? "cursor-not-allowed bg-gray-100" : ""
              } bg-blue-400 text-white border-blue-400 hover:text-blue-400 hover:bg-white py-1.5 w-24 text-sm border-solid border rounded-md focus:outline-none transition-all ease-in-out duration-150`}
            >
              {"Đã trả"}
            </button>
          ) : (
            <button
              className={` bg-blue-400 text-white border-blue-400 hover:text-blue-400 hover:bg-white py-1.5 w-24 text-sm border-solid border rounded-md focus:outline-none transition-all ease-in-out duration-150`}
            >
              {"Trả rồiiiii"}
            </button>
          )}
          {trangThai == "1" && (
            <button
              onClick={async () => {
                setRemoving(true);
                try {
                  await fetch(`/api/remove-domain?id=${id}`);
                  await revalidateDomains();
                } catch (error) {
                  alert(`Error removing domain`);
                } finally {
                  setRemoving(false);
                }
              }}
              disabled={removing}
              className={`${
                removing ? "cursor-not-allowed bg-gray-100" : ""
              } bg-red-500 text-white border-red-500 hover:text-red-500 hover:bg-white py-1.5 w-24 text-sm border-solid border rounded-md focus:outline-none transition-all ease-in-out duration-150`}
            >
              {removing ? <LoadingDots /> : "Xóa"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DomainCard;
