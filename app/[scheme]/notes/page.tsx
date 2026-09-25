"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Footer from "@/components/footer";
import { useDataContext } from "@/lib/DataContext";
import { useEffect } from "react";
import { Scheme } from "@/lib/syllabus";

export default function SchemeNotesPage() {
  const params = useParams();
  const schemeParam = (params.scheme as Scheme) || "2020";
  const { setScheme } = useDataContext();

  useEffect(() => {
    if (schemeParam === "2020" || schemeParam === "2025") {
      setScheme(schemeParam);
    }
  }, [schemeParam, setScheme]);

  return (
    <div className="bg-cover bg-center flex flex-col items-center justify-center px-4 min-h-[70vh]">
      <div className="-mt-10 flex flex-col items-center w-full max-w-6xl">
        <div className="text-white text-3xl font-bold mb-14 text-center bg-black/40 px-6 py-4 rounded-2xl backdrop-blur-md shadow-md border border-gray-700">
          Select Department · {schemeParam} Scheme
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl">
          {[
            { name: "CSE", href: `/${schemeParam}/cse` },
            { name: "ECE", href: `/${schemeParam}/ece` },
            { name: "IT", href: `/${schemeParam}/it` },
          ].map((dept) => (
            <Link href={dept.href} key={dept.name}>
              <div className="bg-black/40 hover:bg-black/60 transition text-white rounded-2xl backdrop-blur-md h-22 sm:h-20 shadow-md text-center text-xl font-semibold flex items-center justify-center border border-gray-700 hover:scale-105">
                {dept.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
