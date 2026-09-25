"use client";
import { Note, PlaylistItem, PYQ } from "@/lib/data";
import { useDataContext } from "@/lib/DataContext";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PlaylistCard } from "@/components/PlaylistCard";
import Footer from "@/components/footer";
import { useParams, useRouter } from "next/navigation";
import { FaYoutube } from "react-icons/fa6";
import { Scheme } from "@/lib/syllabus";

export default function Page() {
  const params = useParams();
  const schemeParam = (params.scheme as Scheme) || "2020";
  const semParam = params.sem as string;
  const deptParam = params.dept as string;
  const subjectParam = params.subject as string;

  const [modules, setModules] = useState<Note[]>();
  const [playlists, setPlaylists] = useState<PlaylistItem[]>();
  const [pyqs, setPyqs] = useState<PYQ[]>();
  
  const { db, vldb, pyq, scheme, setScheme, setDept } = useDataContext();
  const router = useRouter();

  const currentScheme = schemeParam || scheme || "2020";

  useEffect(() => {
    if (schemeParam === "2020" || schemeParam === "2025") {
      setScheme(schemeParam);
    }
    if (deptParam && ["cse", "ece", "it"].includes(deptParam.toLowerCase())) {
      setDept(deptParam.toUpperCase());
    }
  }, [schemeParam, deptParam, setScheme, setDept]);

  useEffect(() => {
    if (!deptParam || !semParam || !subjectParam) return;

    const dept = deptParam.toLowerCase();
    const subject = subjectParam.toLowerCase().replace(/-/g, " ");

    const fetchModules = async () => {
      try {
        const response = db?.query({
          where: {
            Department: dept.toUpperCase(),
            Semester: semParam,
            Subject: subject.toUpperCase(),
            Scheme: currentScheme,
          },
        }) || [];
        
        // Sort modules numerically by Module field
        const sortedModules = response.sort((a, b) => {
          const moduleA = parseInt(a.Module) || 0;
          const moduleB = parseInt(b.Module) || 0;
          return moduleA - moduleB;
        });
        
        setModules(sortedModules);
      } catch (error) {
        console.error("Error fetching modules:", error);
      }
    };

    const fetchPlaylists = async () => {
      try {
        if (currentScheme !== '2020') {
          setPlaylists([]);
          return;
        }
        const response = vldb?.query({
          where: {
            Subject: subject.toUpperCase(),
          },
          orderBy: "Module",
        }) || [];
        setPlaylists(response as PlaylistItem[]);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    const fetchPyq = async () => {
      try {
        if (currentScheme !== '2020') {
          setPyqs([]);
          return;
        }
        const response = pyq?.query({
          where: {
            Department: dept.toUpperCase(),
            Semester: semParam,
            Subject: subject.toUpperCase(),
          },
          orderBy: "Date",
        }) || [];
        setPyqs(response as PYQ[]);
      } catch (error) {
        console.error("Error fetching PYQs:", error);
      }
    };

    fetchModules();
    fetchPlaylists();
    fetchPyq();
  }, [deptParam, semParam, subjectParam, db, currentScheme, vldb, pyq]);

  if (!deptParam || !semParam || !subjectParam) {
    return (
      <div className="text-center mt-10 text-white flex flex-col items-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white mb-4"></div>
        Loading...
      </div>
    );
  }

  const sem = semParam;
  const dept = deptParam.toLowerCase();
  const subject = subjectParam.toLowerCase().replace(/-/g, " ");

  if (!["cse", "ece", "it"].includes(dept)) {
    return (
      <div className="text-center mt-10 text-white">
        Invalid department: {dept}
      </div>
    );
  }

  if (!modules) {
    return (
      <div className="text-center mt-10 text-white flex flex-col items-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white mb-4"></div>
        Loading modules ...
      </div>
    );
  }

  return (
    <div className="text-white flex flex-col justify-center items-center p-6 mt-12 md:mt-14 lg:mt-10">
      <div className="w-full max-w-4xl mb-6 bg-black/60 rounded-xl p-5 shadow-md border-gray-700 border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xl font-bold break-words">{subject.toUpperCase()}</div>
            <div className="text-sm text-gray-300 mt-1 capitalize">
              {dept.toUpperCase()} Department · {currentScheme} Scheme
            </div>
          </div>
          <div className="flex flex-col sm:items-end">
            <div className="text-md font-medium">
              Semester: <span className="font-bold">{sem}</span>
            </div>
            <div className="text-md font-medium" >
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
                  href={`/${currentScheme}/${dept}`}
                  className="hover:underline text-gray-300"
                >
                  {dept.toUpperCase()}
                </Link>
              </li>
              <li>
                <span className="mx-2">/</span>
              </li>
              <li>
                <Link
                  href={`/${currentScheme}/${dept}/${sem}`}
                  className="hover:underline text-gray-300"
                >
                  Semester {sem}
                </Link>
              </li>
              <li>
                <span className="mx-2">/</span>
              </li>
              <li className="text-gray-400 capitalize">{subject}</li>
            </ol>
          </nav>
        </div>
      </div>{" "}
      {/* Notes/Modules Section */}
      <div className="w-full max-w-4xl mb-6">
        <div className="bg-black/60 rounded-xl p-5 shadow-md border-gray-700 border">
          <h2 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
            📒 Notes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8 w-full max-w-4xl">
            {modules.length > 0 ? (
              modules.map((module, index) => {
                const hasValidLink = Boolean(
                  module.File &&
                  module.File.trim() !== "" &&
                  module.File.trim() !== "#" &&
                  module.File.trim().toLowerCase() !== "coming soon" &&
                  module.File.trim().toLowerCase() !== "n/a" &&
                  module.File.trim() !== "-" &&
                  (module.File.trim().startsWith("http://") || module.File.trim().startsWith("https://"))
                );

                return (
                  <Link
                    key={`${module.Module}-${module.Title}-${index}`}
                    href={hasValidLink ? module.File.trim() : "#"}
                    target={hasValidLink ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      if (!hasValidLink) {
                        e.preventDefault();
                        window.alert(`Notes for ${module.Title || `Module ${module.Module}`} will be uploaded soon!`);
                        return;
                      }
                      if (typeof window !== "undefined") {
                        const newRecent = {
                          module: module.Title,
                          subject,
                          sem,
                          dept,
                          url: module.File,
                        };
                        let recentArr: typeof newRecent[] = [];
                        try {
                          recentArr = JSON.parse(localStorage.getItem("recent-modules") || "[]");
                        } catch { }
                        recentArr = recentArr.filter((item) => item.url !== newRecent.url);
                        recentArr.unshift(newRecent);
                        if (recentArr.length > 5) recentArr = recentArr.slice(0, 5);
                        localStorage.setItem("recent-modules", JSON.stringify(recentArr));
                      }
                    }}
                    className="text-center bg-black/50 hover:bg-black/60 px-4 py-4 rounded-2xl text-base sm:text-lg font-semibold shadow-md transition-all duration-200 backdrop-blur-md border border-gray-700 hover:scale-105 hover:shadow-2xl break-words w-full"
                  >
                    Module {module.Module}
                    <span className="block text-xs sm:text-sm text-gray-400 mt-1 break-words w-full">
                      {module.Title}
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
                Notes for this subject are not available yet. <br/>
                We are working on adding it. Please check back later.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* PYQ Section */}
      {pyqs == undefined ?
        <div className="text-center mt-10 text-white flex flex-col items-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white mb-4"></div>
        </div> :
        pyqs.length > 0 && <div className="w-full max-w-4xl mb-6">
          <div className="bg-black/60 rounded-xl p-5 shadow-md border-gray-700 border">
            <h2 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
              📃 Previous Year Question Papers
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {pyqs.map((pyqItem, index) => {
                const hasValidLink = Boolean(
                  pyqItem.File &&
                  pyqItem.File.trim() !== "" &&
                  pyqItem.File.trim() !== "#" &&
                  pyqItem.File.trim().toLowerCase() !== "coming soon" &&
                  pyqItem.File.trim().toLowerCase() !== "n/a" &&
                  pyqItem.File.trim() !== "-" &&
                  (pyqItem.File.trim().startsWith("http://") || pyqItem.File.trim().startsWith("https://"))
                );

                return (
                  <Link
                    key={`${pyqItem.File || pyqItem.Date}-${index}`}
                    href={hasValidLink ? pyqItem.File.trim() : "#"}
                    target={hasValidLink ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      if (!hasValidLink) {
                        e.preventDefault();
                        window.alert(`Question paper for ${pyqItem.Date || subject} will be uploaded soon!`);
                        return;
                      }
                    }}
                    className="text-center bg-black/50 hover:bg-black/60 px-4 py-4 rounded-2xl text-base sm:text-lg font-semibold shadow-md transition-all duration-200 backdrop-blur-md border border-gray-700 hover:scale-105 hover:shadow-2xl break-words w-full flex flex-col items-center"
                  >
                    <span>{pyqItem.Date || "Question Paper"}</span>
                    {!hasValidLink && (
                      <span className="inline-block mt-2 text-xs text-amber-400 font-medium px-2.5 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/30">
                        Coming Soon
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>}

      {/* YouTube Video Lectures Section */}
      {playlists == undefined ?
        <div className="text-center mt-10 text-white flex flex-col items-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white mb-4"></div>
        </div> :
        playlists.length > 0 && <div className="w-full max-w-4xl mb-6">
          <div className="bg-black/60 rounded-xl p-5 shadow-md border-gray-700 border">
            <h2 className="text-xl font-bold mb-4 text-white flex items-center gap-2">
              <FaYoutube className="text-red-500" />
              Video Lectures
            </h2>{" "}
            {/* Playlists Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {playlists.map((playlist, index) => (
                <PlaylistCard key={`${playlist.id || playlist.Link || playlist.Title}-${index}`} playlist={playlist} />
              ))}
            </div>
          </div>{" "}
        </div>}
        <Footer />
    </div>
  );
}
