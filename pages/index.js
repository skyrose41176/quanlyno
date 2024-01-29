import Head from "next/head";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import useSWR from "swr";
import DomainCard from "../components/domain-card";
import LoadingDots from "../components/loading-dots";
import fetcher from "../lib/fetcher";

export default function Home() {
  const [ten, setTen] = useState("");
  const [tien, setTien] = useState("");
  const [ghiChu, setGhiChu] = useState("");

  const { data: domainList, mutate: revalidateDomains } = useSWR(
    `/api/get-domains`,
    fetcher
  );
  const [disabled, setDisabled] = useState(true);
  const [adding, setAdding] = useState(false);
  useEffect(() => {
    if (ten.length == 0 || tien.length == 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [ten, tien]);

  useEffect(() => {
    if (adding) setDisabled(true);
  }, [adding]);
  const listInput = [
    {
      name: "ten",
      placeholder: "Tên",
      value: ten,
      type: "text",
      pattern:
        "^(?:[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9].)?[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9].[a-zA-Z]{2,}$",
      onInput: (e) => {
        setTen(e.target.value);
      },
    },
    {
      name: "tien",
      placeholder: "Tiền",
      value: tien,
      type: "number",
      pattern: "",
      onInput: (e) => {
        setTien(e.target.value);
      },
    },
    {
      name: "ghiChu",
      placeholder: "Ghi chú",
      value: ghiChu,
      type: "text",
      pattern:
        "^(?:[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9].)?[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9].[a-zA-Z]{2,}$",
      onInput: (e) => {
        setGhiChu(e.target.value);
      },
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 px-2">
      <Head>
        <title>Trả nợ</title>
      </Head>
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 10000,
        }}
      />
      <main className="flex flex-col items-center justify-center w-full flex-1 sm:px-4 text-center my-4">
        <h1 className="text-3xl sm:text-6xl font-bold">Bảng vàng</h1>
        {listInput.map((item, index) => {
          return (
            <div key={index}>
              <input
                type={item.type}
                name={item.name}
                value={item.value}
                onInput={item.onInput}
                autoComplete="off"
                placeholder={item.placeholder}
                pattern={item.pattern}
                className="rounded-md border border-gray-300 focus:ring-0 focus:border-black px-4 mt-4 flex-auto min-w-80 sm:text-sm"
              />
            </div>
          );
        })}
        <div>
          <button
            type="submit"
            disabled={disabled}
            onClick={async (e) => {
              e.preventDefault();
              setAdding(true);
              try {
                await fetch(
                  `/api/add-domain?ten=${ten}&tien=${tien}&ghiChu=${ghiChu}`
                );
                await revalidateDomains();
              } catch (error) {
                alert(error.message);
              } finally {
                setTen("");
                setTien("");
                setGhiChu("");
                setAdding(false);
              }
            }}
            className={
              `${
                !disabled
                  ? "bg-blue-500 text-white "
                  : "bg-gray-300 text-black "
              }` +
              `py-2 w-28 text-sm border-solid border rounded-md focus:outline-none mt-4 transition-all ease-in-out duration-150`
            }
          >
            <p className=" font-bold">{adding ? <LoadingDots /> : "Thêm"}</p>
          </button>
        </div>

        <div className="w-full max-w-2xl">
          {domainList &&
            domainList.map((item, index) => {
              console.log({ item });
              return (
                <DomainCard
                  key={index}
                  item={item}
                  revalidateDomains={revalidateDomains}
                />
              );
            })}
        </div>
      </main>
    </div>
  );
}
