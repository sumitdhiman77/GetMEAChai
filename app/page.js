import "./globals.css";
import Image from "next/image";
// import { useSession } from "next-auth/react";

export default function Home() {
  console.log("NEXTAUTH_URL:", process.env.NEXTAUTH_URL);
  console.log("NEXT_PUBLIC_NEXTAUTH_URL:", process.env.NEXT_PUBLIC_VERCEL_URL);
  return (
    <>
      <div className="flex justify-center flex-col items-center text-white h-[44vh] gap-2">
        <div className="flex justify-between font-bold text-5xl">
          Buy Me a Chai
          <span>
            <Image
              className="invertImg"
              src="/tea.gif"
              alt="Tea Mug"
              width={70}
              height={90}
            ></Image>
          </span>
        </div>
        <p className="text-sm">
          A crowdfunding platform for creators to fund their projects
        </p>
        <p className="text-xs px-1 mx-1 text-center">
          A place where Your fans are available to help for your creativity and
          for you to fund your projects
        </p>
        <div>
          <button
            type="button"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Start Here
          </button>
          <button
            type="button"
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Read More
          </button>
        </div>
      </div>
      <div className="bg-white opacity-10 h-1"></div>
      <div className="w-3/4 mx-auto grid gap-4 pt-6 pb-20">
        <h2 className="text-white text-3xl text-center font-bold py-4">
          Your Fans can buy you a Chai
        </h2>
        <div className="text-white p-3 sm:flex justify-between">
          <div className="text-center mb-2">
            <Image
              src="/developer.gif"
              alt="Man with Computer"
              width={50}
              height={80}
              className="m-auto"
            ></Image>
            <p className="text-sm">Fund Yourself</p>
            <p className="text-xs">
              Your fans are available for you to help you
            </p>
          </div>
          <div className="text-center mb-2">
            <Image
              src="/coin.webp"
              alt="Man with Computer"
              width={50}
              height={80}
              className="m-auto"
            ></Image>
            <p className="text-sm">Fund Yourself</p>
            <p className="text-xs">
              Your fans are available for you to help you
            </p>
          </div>
          <div className="text-center mb-2">
            <Image
              src="/funds.webp"
              alt="Man with Computer"
              width={50}
              height={80}
              className="m-auto rounded-full"
            ></Image>
            <p className="text-sm">Fans wants to help</p>
            <p className="text-xs">
              Your fans are available for you to help you
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white opacity-10 h-1"></div>
      <div className="w-3/4 mx-auto grid gap-4 pt-6 pb-20">
        <h2 className="text-white text-3xl text-center font-bold py-3">
          Learn more about us
        </h2>
        <iframe
          className="m-auto w-[350px] h-[200px] sm:w-[560px] sm:h-[315px] "
          src="https://www.youtube.com/embed/gfU1iZnjRZM?si=b3aYvd_GCpUilZ4M"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen=""
        ></iframe>
      </div>
    </>
  );
}
