"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "./logo";
import { useDataContext } from "@/lib/DataContext";
import { useRouter, usePathname } from "next/navigation";
import { SCHEMES, Scheme } from "@/lib/syllabus";

function ChevronIcon() {
  return (
    <svg
      className="mt-[2px] w-5 h-5 sm:w-6 sm:h-6 text-gray-200"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      data-slot="icon"
    >
      <path
        fillRule="evenodd"
        d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function Header() {
  const [openMenu, setOpenMenu] = useState<"dept" | "scheme" | null>(null);
  const { dept, setDept, scheme, setScheme } = useDataContext();
  const departments = ["CSE", "ECE", "IT"];
  const pathname = usePathname();
  const router = useRouter();

  const handleSelect = (newDept: string) => {
    setDept(newDept);
    setOpenMenu(null);

    // If on home page, don't navigate
    if (pathname === "/") return;

    const parts = pathname.split("/").filter(Boolean);

    // If path starts with scheme (2020 or 2025)
    if (parts.length > 0 && SCHEMES.includes(parts[0] as Scheme)) {
      const activeScheme = parts[0];
      if (parts.length >= 2) {
        if (departments.map(d => d.toLowerCase()).includes(parts[1])) {
          parts[1] = newDept.toLowerCase();
          router.push("/" + parts.join("/"));
          return;
        }
        if (parts[1] === "syllabus") {
          router.push(`/${activeScheme}/${newDept.toLowerCase()}/syllabus`);
          return;
        }
        if (parts[1] === "question-paper" || parts[1] === "pyq") {
          router.push(`/${activeScheme}/${newDept.toLowerCase()}/pyq`);
          return;
        }
        if (parts[1] === "notes") {
          router.push(`/${activeScheme}/${newDept.toLowerCase()}`);
          return;
        }
      }
      router.push(`/${activeScheme}/${newDept.toLowerCase()}`);
      return;
    }

    // If legacy routes
    if (pathname === "/syllabus") {
      router.push(`/${scheme}/${newDept.toLowerCase()}/syllabus`);
      return;
    }

    if (pathname === "/question-paper") {
      router.push(`/${scheme}/${newDept.toLowerCase()}/pyq`);
      return;
    }

    if (pathname === "/notes") {
      router.push(`/${scheme}/${newDept.toLowerCase()}`);
      return;
    }

    // Fallback
    router.push(`/${scheme}/${newDept.toLowerCase()}`);
  };

  const handleSchemeSelect = (nextScheme: Scheme) => {
    setScheme(nextScheme);
    setOpenMenu(null);

    if (pathname === "/") return;

    const parts = pathname.split("/").filter(Boolean);

    if (parts.length > 0 && SCHEMES.includes(parts[0] as Scheme)) {
      parts[0] = nextScheme;
      router.push("/" + parts.join("/"));
      return;
    }

    if (pathname.startsWith("/syllabus")) {
      router.push(`/${nextScheme}/syllabus`);
      return;
    }

    if (pathname.startsWith("/question-paper")) {
      router.push(`/${nextScheme}/question-paper`);
      return;
    }

    if (pathname.startsWith("/notes")) {
      router.push(`/${nextScheme}/notes`);
      return;
    }

    router.push(`/${nextScheme}`);
  };

  return (
    <div className="w-full px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center text-white absolute top-0 left-0 z-10">
      <div className="flex items-center gap-4 sm:gap-8">
        <Link href={'/'}>
          <Logo className="size-15 md:size-20" />
        </Link>

        <div className="relative items-center flex-col">
          <div className="hidden md:block text-md font-bold">Scheme</div>
          <button
            onClick={() => setOpenMenu(openMenu === "scheme" ? null : "scheme")}
            className="cursor-pointer flex justify-between items-center focus:outline-none"
          >
            <span className="text-base sm:text-lg font-medium mr-1 sm:mr-[3px]">{scheme}</span>
            <ChevronIcon />
          </button>
          {openMenu === "scheme" && (
            <div className="absolute left-0 mt-2 w-24 sm:w-28 bg-black/70 text-white rounded-md shadow-lg z-20 border-[1px] border-gray-600">
              {SCHEMES.map((s) => (
                <div
                  key={s}
                  onClick={() => handleSchemeSelect(s)}
                  className={`px-3 sm:px-4 py-2 cursor-pointer text-sm sm:text-base
                    ${scheme === s
                      ? "bg-white/20 text-white"
                      : "hover:bg-white/10"}`}
                >
                  {s}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="relative items-center flex-col">
        <div className="hidden md:block text-md font-bold">Department</div>
        <button
          onClick={() => setOpenMenu(openMenu === "dept" ? null : "dept")}
          className="cursor-pointer flex justify-between items-center focus:outline-none mr-3 sm:ml-7"
        >
          <span className="text-base sm:text-lg font-medium mr-1 sm:mr-[3px]">{dept == '' ? "Select" : dept}</span>
          <ChevronIcon />
        </button>
        {openMenu === "dept" && (
          <div className="absolute right-0 mt-2 w-24 sm:w-28 bg-black/70 text-white rounded-md shadow-lg z-20 border-[1px] border-gray-600">
            {departments.map((d) => (
              <div
                key={d}
                onClick={() => handleSelect(d)}
                className={`px-3 sm:px-4 py-2 cursor-pointer text-sm sm:text-base
                  ${dept === d
                    ? "bg-white/20 text-white"
                    : "hover:bg-white/10"}`}
              >
                {d}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
