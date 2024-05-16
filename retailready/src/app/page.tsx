import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-center text-3xl font-semibold font-raleway text-retailready-blue mb-20">
        Lets Get
        <br />
        RetailReady!
      </h1>
      <Link
        href="/login"
        className="flex items-center justify-center gap-5 rounded-lg bg-retailready-blue px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
      >
        <span>I’m In</span>
      </Link>
    </div>
  );
}
