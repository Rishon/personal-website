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
  jobTitle,
}: Readonly<{
  title: string;
  description: string;
  image: string;
  startDate: string;
  endDate: string;
  link: string;
  jobTitle: string;
}>) {
  return (
    <div className="bg-gray-700 bg-opacity-20 p-5 flex flex-col items-center sm:flex-row rounded-lg w-full sm:w-full sm:max-w-full max-w-xs hover:bg-opacity-30 cursor-pointer space-y-4 sm:space-y-0 sm:space-x-5">
      <Image
        src={image}
        width={50}
        height={50}
        alt={title}
        className="rounded-lg"
      />
      <Link href={link} target="_blank">
        <div className="flex flex-col text-center sm:items-start sm:text-left overflow-hidden">
          <h3 className="text-lg sm:text-xl font-bold">{title}</h3>
          <span className="font-normal text-[var(--paragraph-color)] text-base">
            {jobTitle}
          </span>
          <code className="text-gray-600 text-sm whitespace-normal mt-0.5">
            {startDate} - {endDate}
          </code>
          <p className="text-lg text-center sm:text-left text-[var(--paragraph-color)]">
            {description}
          </p>
        </div>
      </Link>
    </div>
  );
}
