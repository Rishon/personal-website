// Next.js
import Link from "next/link";

// Package.json
import packageJson from "../../package.json";

export default function About() {
  const { dependencies, devDependencies } = packageJson;

  const renderPackageListItems = (packages: Record<string, string>) => {
    return Object.entries(packages).map(([packageName, version]) => (
      <li key={packageName}>
        <span className="font-bold text-sm">{packageName}</span>: {version}
      </li>
    ));
  };

  return (
    <main className="flex flex-col items-center justify-center p-4 space-y-20">
      {/* Main Container */}
      <div className="w-full max-w-4xl space-y-4 text-left sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold">About me 🚀</h1>
        <p className="text-lg sm:text-2xl mt-4">
          Self-taught software developer from Israel. I have always had a
          passion for technology and programming, and I have been learning
          various coding languages and software development techniques since a
          young age. I am constantly learning and expanding my skillset, and I
          am always looking for new challenges and opportunities to grow as a
          developer.
        </p>
      </div>
      <div className="w-full max-w-4xl space-y-4 text-left sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold">Thanks to ✨</h1>
        <p className="text-lg sm:text-2xl mt-4">
          This website was created with{" "}
          <Link href="https://nextjs.org" className="text-blue-500">
            {" "}
            Next.js
          </Link>{" "}
          and{" "}
          <Link href="https://tailwindcss.com" className="text-green-500">
            {" "}
            Tailwind CSS
          </Link>
          .{" "}
        </p>

        <p>
          {" "}
          Source code available on{" "}
          <Link
            href="https://github.com/Rishon/personal-website"
            className="text-gray-600"
            target="_blank"
          >
            GitHub
          </Link>
        </p>

        <p className="text-lg mt-4">Packages used:</p>
        <ul className="list-disc list-inside">
          {renderPackageListItems(dependencies)}
          {renderPackageListItems(devDependencies)}
        </ul>
      </div>
    </main>
  );
}
