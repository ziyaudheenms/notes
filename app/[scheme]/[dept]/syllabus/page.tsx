'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useDataContext } from '@/lib/DataContext';
import { getSemesterKeys, getSemesterLabel, getSyllabusUrl, Scheme } from '@/lib/syllabus';
import { useEffect } from 'react';

export default function DepartmentSyllabusPage() {
  const router = useRouter();
  const params = useParams();
  const schemeParam = (params.scheme as Scheme) || "2020";
  const dept = params.dept as string;
  const { scheme, setScheme, setDept } = useDataContext();

  const currentScheme = schemeParam || scheme || "2020";
  const semesters = getSemesterKeys(currentScheme, dept);

  useEffect(() => {
    if (schemeParam === "2020" || schemeParam === "2025") {
      setScheme(schemeParam);
    }
    if (dept && ["cse", "ece", "it"].includes(dept.toLowerCase())) {
      setDept(dept.toUpperCase());
    }
  }, [schemeParam, dept, setScheme, setDept]);

  const handleRedirect = (semester: string) => {
    // For the 2025 scheme, navigate to the respective subjects page and exit
    if (currentScheme === '2025') {
      router.push(`/${currentScheme}/${dept.toLowerCase()}/syllabus/${semester}`);
      return;
    }
  
    // For the 2020 scheme, fetch and open the single semester Google Drive link
    const url = getSyllabusUrl(currentScheme, dept, semester);
  
    if (url) {
      window.open(url, '_blank');
    } else {
      console.warn(`No drive link found for ${currentScheme} scheme, ${dept?.toUpperCase()} department, semester ${semester}`);
      window.alert(`${currentScheme} syllabus for ${dept?.toUpperCase()} Semester ${semester} will be added soon.`);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex-1 text-white flex flex-col justify-center items-center py-8">
        <div className="w-full max-w-6xl mb-6 bg-black/60 rounded-xl p-5 shadow-md border-gray-700 border mt-8 sm:mt-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xl font-bold break-words">SYLLABUS</div>
              <div className="text-sm text-gray-300 mt-1 capitalize">
                {dept?.toUpperCase()} Department · {currentScheme} Scheme
              </div>
            </div>
          </div>
          
          {/* Breadcrumb Nav */}
          <div className="w-full border-t border-gray-700 mt-6 pt-3 text-center text-gray-400 text-sm">
            <nav className="text-sm text-gray-400" aria-label="Breadcrumb">
              <ol className="list-reset flex flex-wrap justify-center">
                <li>
                  <Link href="/" className="hover:underline text-gray-300">
                    Home
                  </Link>
                </li>
                <li>
                  <span className="mx-2">/</span>
                </li>
                <li>
                  <Link
                    href={`/${currentScheme}/syllabus`}
                    className="hover:underline text-gray-300"
                  >
                    Syllabus
                  </Link>
                </li>
                <li>
                  <span className="mx-2">/</span>
                </li>
                <li className="text-gray-400 capitalize">
                  {dept?.toUpperCase()}
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-8 w-full max-w-6xl items-stretch">
          {semesters.map((sem) => (
            <button
              key={sem}
              onClick={() => handleRedirect(sem)}
              className="group relative flex flex-col items-center justify-center bg-black/60 border border-white/20 rounded-xl shadow-md px-4 py-3 sm:px-6 sm:py-4 transition-all duration-300 backdrop-blur-md cursor-pointer hover:scale-105 hover:shadow-2xl overflow-hidden h-full min-h-[72px]"
              style={{ minWidth: "290px", maxWidth: "290px", margin: "0 auto" }}
            >
              <span className="z-10 text-white text-base sm:text-lg font-semibold text-center break-words">
                {getSemesterLabel(sem)}
              </span>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-r from-white/10 to-black/10 pointer-events-none" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
