"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useDataContext } from "@/lib/DataContext";
import Footer from "@/components/footer";
import { Scheme } from "@/lib/syllabus";

// Helper to get all subject variants for a slug
function getAllSubjectVariants(slug: string, pyq: any): string[] {
  if (!pyq) return [slug.replace(/-/g, " ").toUpperCase()];
  const allSubjects = pyq.query({ distinct: "Subject" }) || [];
  const normalizedSlug = slug.replace(/-/g, "").toLowerCase();
  return allSubjects
    .filter(
      (s: any) =>
        s.Subject.replace(/[\s,]+/g, "").toLowerCase() === normalizedSlug
    )
    .map((s: any) => s.Subject);
}

export default function QuestionPaperList() {
  const { pyq, scheme, setScheme, setDept } = useDataContext();
  const params = useParams();
  const schemeParam = (params.scheme as Scheme) || "2020";
  const { dept, sem, subject } = params as { dept?: string; sem?: string; subject?: string };
  const [qpapers, setQpapers] = useState<any[]>([]);

  const currentScheme = schemeParam || scheme || "2020";

  useEffect(() => {
    if (schemeParam === "2020" || schemeParam === "2025") {
      setScheme(schemeParam);
    }
    if (dept && ["cse", "ece", "it"].includes(dept.toLowerCase())) {
      setDept(dept.toUpperCase());
    }
  }, [schemeParam, dept, setScheme, setDept]);

  // All hooks must be called before any return!
  useEffect(() => {
    if (!pyq || !dept || !sem || !subject) return;
    const subjectVariants = getAllSubjectVariants(subject as string, pyq);
    let allResults: any[] = [];
    subjectVariants.forEach((variant) => {
      const result =
        pyq.query({
          where: {
            Department: (dept as string).toUpperCase(),
            Semester: sem as string,
            Subject: variant,
            Scheme: currentScheme,
          },
          orderBy: "Date",
          order: "desc",
        }) || [];
      allResults = allResults.concat(result);
    });
    setQpapers(allResults);
  }, [pyq, dept, sem, subject, currentScheme]);

  if (!dept || !sem || !subject) {
    return (
      <div className="text-center mt-10 text-white flex flex-col items-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white mb-4"></div>
        Loading...
      </div>
    );
  }

  // For display
  const subjectVariants = getAllSubjectVariants(subject as string, pyq);
  const subjectParam = subjectVariants[0]?.toUpperCase() || subject.replace(/-/g, " ").toUpperCase();

  const deptLower = (dept as string).toLowerCase();

  return (
    <div className="text-white flex flex-col justify-center items-center p-6 mt-12 md:mt-14 lg:mt-10">
      <div className="w-full max-w-4xl mb-6 bg-black/60 rounded-xl p-5 shadow-md border-gray-700 border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xl font-bold break-words">{subjectParam}</div>
            <div className="text-sm text-gray-300 mt-1 capitalize">
              {deptLower.toUpperCase()} Department · {currentScheme} Scheme
            </div>
          </div>
          <div className="flex flex-col sm:items-end">
            <div className="text-md font-medium">
              Semester: <span className="font-bold">{sem}</span>
            </div>
            <div className="text-md font-medium">
              Scheme:{" "}
              <span className="font-bold">
                {currentScheme}
              </span>
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
                  href={`/${currentScheme}/${deptLower}/pyq`}
                  className="hover:underline text-gray-300"
                >
                  {deptLower.toUpperCase()}
                </Link>
              </li>
              <li>
                <span className="mx-2">/</span>
              </li>
              <li>
                <Link
                  href={`/${currentScheme}/${deptLower}/pyq/${sem}`}
                  className="hover:underline text-gray-300"
                >
                  Semester {sem}
                </Link>
              </li>
              <li>
                <span className="mx-2">/</span>
              </li>
              <li className="text-gray-400 capitalize">{subjectParam}</li>
            </ol>
          </nav>
        </div>
      </div>
      {/* Question Papers Section */}
      <div className="w-full max-w-4xl mb-6">
        <div className="bg-black/60 rounded-xl p-5 shadow-md border-gray-700 border">
          <h2 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
            📃 Question Papers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 w-full max-w-4xl">
            {qpapers.length > 0 ? (
              qpapers.map((qp, idx) => {
                const hasValidLink = Boolean(
                  qp.File &&
                  qp.File.trim() !== "" &&
                  qp.File.trim() !== "#" &&
                  qp.File.trim().toLowerCase() !== "coming soon" &&
                  qp.File.trim().toLowerCase() !== "n/a" &&
                  qp.File.trim() !== "-" &&
                  (qp.File.trim().startsWith("http://") || qp.File.trim().startsWith("https://"))
                );

                return (
                  <Link
                    key={`${qp.File || qp.Date}-${idx}`}
                    href={hasValidLink ? qp.File.trim() : "#"}
                    target={hasValidLink ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      if (!hasValidLink) {
                        e.preventDefault();
                        window.alert(`Question paper for ${qp.Date || subjectParam} will be uploaded soon!`);
                        return;
                      }
                    }}
                    className="text-center bg-black/50 hover:bg-black/60 px-4 py-4 rounded-2xl text-base sm:text-lg font-semibold shadow-md transition-all duration-200 backdrop-blur-md border border-gray-700 hover:scale-105 hover:shadow-2xl break-words w-full flex flex-col items-center min-w-50"
                  >
                    <span>
                      {qp.Date || "Question Paper"}
                    </span>
                    {!hasValidLink && (
                      <span className="inline-block mt-2 text-xs text-amber-400 font-medium px-2.5 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/30">
                        Coming Soon
                      </span>
                    )}
                  </Link>
                );
              })
            ) : (
              <div className="text-center text-white col-span-full py-4">
                No question papers found for {subjectParam} in {currentScheme} Scheme, Semester {sem}.
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
