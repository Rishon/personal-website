// Next.js
import Image from "next/image";
import Link from "next/link";

export default function WorkspaceLabel({
  title,
  description,
  image,
  startDate,
  endDate,
  link,
}: Readonly<{
  title: string;
  description: string;
  image: string;
  startDate: string;
  endDate: string;
  link: string;
}>) {
  return (
    <div className="bg-gray-700 bg-opacity-20 p-5 flex flex-col items-center sm:flex-row rounded-lg sm:w-full hover:bg-opacity-30 cursor-pointer space-y-4 sm:space-y-0 sm:space-x-5">
      <Image
        src={image}
        width={50}
        height={50}
        alt={title}
        className="rounded-lg"
      />
      <Link href={link} target="_blank">
        <div className="text-white flex flex-col text-center sm:items-start sm:text-left">
          <h3 className="text-lg sm:text-xl font-bold">{title}</h3>
          <code className="text-gray-700 text-sm">
            {startDate} - {endDate}
          </code>
          <p className="text-gray-400 text-lg text-center sm:text-left">
            {description}
          </p>
        </div>
      </Link>
    </div>
  );
}
