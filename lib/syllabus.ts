export type Scheme = "2020" | "2025";
export type DeptCode = "CSE" | "ECE" | "IT";

export const SCHEMES: Scheme[] = ["2020", "2025"];

export const SEMESTER_KEYS: Record<Scheme, string[]> = {
  "2020": ["1-2", "3", "4", "5", "6", "7", "8"],
  "2025": ["1-2", "3", "4", "5", "6", "7", "8"],
};

type SemesterValue = string | Record<string, string>;
type DeptLinks = Record<DeptCode, Record<string, SemesterValue>>;

export const SYLLABUS_LINKS: Record<Scheme, DeptLinks> = {
  "2020": {
    CSE: {
      "1-2": "https://drive.google.com/open?id=1jyZmct_kuXDCyrDVubaa5THRSIbt6W_f",
      "3": "https://drive.google.com/open?id=1fRSBNsS0eNLLK6-pWF9V7tKaAGAyAvlx",
      "4": "https://drive.google.com/open?id=1vEPJhUXnfoCW3hpv6YceodsXoIt14OY6",
      "5": "https://drive.google.com/open?id=1FSzkSznP32sJcP72z1JZ7NesT14wVGMB",
      "6": "https://drive.google.com/open?id=17XfHsOHmCG0n8EUduUejSYmglkUNJWAm",
      "7": "https://drive.google.com/open?id=1U7iOz8n0U0HM7gix1kry6Znsoowx4se2",
      "8": "https://drive.google.com/open?id=1p2gW1XhPJQYr-8TY-eMzcKro8gZTan-G",
    },
    ECE: {
      "1-2": "https://drive.google.com/open?id=1ne-63gkQYtBel5CPfAGTmik36mHczGEQ",
      "3": "https://drive.google.com/open?id=1lK0gNtnfRFsvJbM7KJmt2xVUG2tl0fnY",
      "4": "https://drive.google.com/open?id=1q4giFeYed16PNZ26VLoCDBWScE-3sIPg",
      "5": "https://drive.google.com/open?id=1WwXOpcz_GGhBwolaIUhbdFHEspzaM2ZV",
      "6": "https://drive.google.com/open?id=1xQc-4Rs79CayzXyQQ4KVP5r4pKQIJZMR",
      "7": "https://drive.google.com/open?id=14EgfEOfU8CQ9myRXHaWSGKZSsJtl7mUF",
      "8": "https://drive.google.com/open?id=1m1FrEeDfDXpRSfspERR_QKaz2HnHNG_1",
    },
    IT: {
      "1-2": "https://drive.google.com/open?id=1qiX0A8my5lFcaCuUgLYN5hmHfnNadu9J",
      "3": "https://drive.google.com/open?id=1G7kIYZ9yV9jkQAmqOAeBDn287kf5ioTk",
      "4": "https://drive.google.com/open?id=1vHPs1MTLP0MY7veAEUn_IofB-JqZ7eJE",
      "5": "https://drive.google.com/open?id=1luMrf5w34FWw19w7zKOfnEuzbAVBU20o",
      "6": "https://drive.google.com/open?id=1gu3laCU3ewFh5J7OOj0VwK7l2HvYJ8_U",
      "7": "https://drive.google.com/open?id=1Iwp8UPnMSLqAlZzs19rQOQJMA8xqYO-5",
      "8": "https://drive.google.com/open?id=1JuE9sDtUxQv3R_BwrepzQqmBOCo_jO9U",
    },
  },
  "2025": {
    CSE: {
      "1-2": {
        "Full Syllabus": "https://drive.google.com/file/d/1n19Rk0KdKSKzv8uvbJ3KoZaoQ1ImkujI/view?usp=drive_link",
        "MATHEMATICS FOR INFORMATION SCIENCE – 1": "https://drive.google.com/file/d/1rM2zFrXBdzYuMEBeoESXDd1WPYajdptV/view?usp=drive_link",
        "PHYSICS FOR INFORMATION SCIENCE": "https://drive.google.com/file/d/1Ftl_oDreSWC1-4J51wouxWUTqphRKtvV/view?usp=drive_link",
        "CHEMISTRY FOR INFORMATION SCIENCE & ELECTRICAL SCIENCE": "https://drive.google.com/file/d/1ItsvieI5i2_71VZvI90zCYReq0rcX0Vn/view?usp=drive_link",
        "ENGINEERING GRAPHICS AND COMPUTER AIDED DRAWING": "https://drive.google.com/file/d/1kQewgQYkXw3gtG9i-vqTeT3N1JFRehDg/view?usp=drive_link",
        "ENGINEERING MECHANICS": "https://drive.google.com/file/d/13lmCiG5d5xjYzdClcxPWaGGoGsAkP-0y/view?usp=drive_link",
        "INTRODUCTION TO ELECTRICAL AND ELECTRONICS ENGINEERING": "https://drive.google.com/file/d/1Lfx7tXFqYZVkRN1onSS7p0XqT06Hib-I/view?usp=drive_link",
        "INTRODUCTION TO MECHANICAL ENGINEERING & CIVIL ENGINEERING": "https://drive.google.com/file/d/1JP4--FOwqFbiE2GDOxa0hYK4a8DSIMPj/view?usp=drive_link",
        "ALGORITHMIC THINKING WITH PYTHON": "https://drive.google.com/file/d/19dBbvAZViYJLdm2Jzj8wo6Cao8b1miiT/view?usp=drive_link",
        "FOUNDATIONS OF COMPUTING: FROM HARDWARE ESSENTIALS TO WEB DESIGN": "https://drive.google.com/file/d/1PQXj9Ul-v6XKe40_96AT8SEwbcYmBj5c/view?usp=drive_link",
        "MATHEMATICS FOR INFORMATION SCIENCE – 2": "https://drive.google.com/file/d/1QooR22h9YYho3afnlJqqfeD6ye1itu6i/view?usp=drive_link",
        "PROGRAMMING IN C": "https://drive.google.com/file/d/1ZlT6mPO-dBARzxcbGEZqB2gEf0ArCIHL/view?usp=drive_link",
        "ENGINEERING ETHICS AND SUSTAINABLE DEVELOPMENT": "https://drive.google.com/file/d/1NuD36c7IQH8Zymjxn6sVhMFeo1oIKf4q/view?usp=drive_link",
        "DISCRETE MATHEMATICS (CORE)": "https://drive.google.com/file/d/1VDhUscTtkwbtXEDOwhi5e6vxvrRd_N2D/view?usp=drive_link",
      },
      "3":{},
      "4": {},
      "5": {},
      "6": {},
      "7": {},
      "8": {},
    },
    ECE: {
      "1-2": {"FULL ECE SYLLABUS": "https://drive.google.com/file/d/1rEu6zwBG9HJ_0RKPyzpNPj5Y10esTPbV/view?usp=drive_link",
        "MATHEMATICS FOR ELECTRICAL SCIENCE AND PHYSICAL SCIENCE – 1": "https://drive.google.com/file/d/1HCLC-WiHJ1Vyxlrnu5WT3YozJ4Cjo7rz/view?usp=drive_link",
        "PHYSICS FOR ELECTRICAL SCIENCE": "https://drive.google.com/file/d/1lH6WKCbVqPRdLQtAPx3s2-DGyGvsjWLi/view?usp=drive_link",
        "CHEMISTRY FOR INFORMATION SCIENCE & ELECTRICAL SCIENCE": "https://drive.google.com/file/d/1JhHwWZjvi86nFyBaebKEy67yFpz02395/view?usp=drive_link",
        "ENGINEERING GRAPHICS AND COMPUTER AIDED DRAWING": "https://drive.google.com/file/d/1kzY8YlnKaZg3vJiTZDZRj-xUPgT6YXNn/view?usp=drive_link",
        "ENGINEERING MECHANICS": "https://drive.google.com/file/d/1wqyVkTP1cOR1D23hxJY3DyVgEwRDdJNu/view?usp=drive_link",
        "INTRODUCTION TO ELECTRICAL AND ELECTRONICS ENGINEERING": "https://drive.google.com/file/d/1m11tfh7ZtPctX7cBDytmhSHkbiTcN46J/view?usp=drive_link",
        "INTRODUCTION TO MECHANICAL ENGINEERING & CIVIL ENGINEERING": "https://drive.google.com/file/d/1uP3Q06k7nNxSmsEDQX_jDPh_gWak1c9G/view?usp=drive_link",
        "ALGORITHMIC THINKING WITH PYTHON": "https://drive.google.com/file/d/1y5SAX0u5rYjt3BT5ht4XVEr9Xff2u6BO/view?usp=drive_link",
        "FOUNDATIONS OF COMPUTING: FROM HARDWARE ESSENTIALS TO WEB DESIGN": "https://drive.google.com/file/d/1X83cuVyLEHglThOOdvQoozkIwx-iFppS/view?usp=drive_link",
        "MATHEMATICS FOR ELECTRICAL SCIENCE AND PHYSICAL SCIENCE – 2": "https://drive.google.com/file/d/1BX-1wJq0YCuC8BwPU7iZqkjOrN50fUK0/view?usp=drive_link",
        "PROGRAMMING IN C": "https://drive.google.com/file/d/11c2sLgdEz6UuA_38Q195jtaOOS5lL2pJ/view?usp=drive_link",
        "ENGINEERING ETHICS AND SUSTAINABLE DEVELOPMENT": "https://drive.google.com/file/d/18gr2iEAggi8_HWHx9casLD7PWVye7KeZ/view?usp=drive_link",
        "NETWORK THEORY (CORE)": "https://drive.google.com/file/d/1ioglKUciqPIYitkjzIqExcdoDvY15LxF/view?usp=drive_link",
      },
      "3":{},
      "4": {},
      "5": {},
      "6": {},
      "7": {},
      "8": {},
    },
    IT: {
      "1-2": {
        "FULL IT SYLLABUS": "https://drive.google.com/file/d/1tHjoCS1oT_Mbcf3IhST2uEgyA4L3yh9Y/view?usp=drive_link",
        "MATHEMATICS FOR INFORMATION SCIENCE – 1": "https://drive.google.com/file/d/1ew5kXTKrMdFVDTXITnl5cfT8qGKiA1o4/view?usp=drive_link",
        "PHYSICS FOR INFORMATION SCIENCE": "https://drive.google.com/file/d/1-K9qqUGEXGrIs5_fryTLl77vX3w8xlt4/view?usp=drive_link",
        "CHEMISTRY FOR INFORMATION SCIENCE & ELECTRICAL SCIENCE": "https://drive.google.com/file/d/1RHSx6Gpzr2P4_AVNOJa7dsXfrKbAymRC/view?usp=drive_link",
        "ENGINEERING GRAPHICS AND COMPUTER AIDED DRAWING": "https://drive.google.com/file/d/1q3pakyjYLFuyWS0TK2n5HLWtypme5Jwp/view?usp=drive_link",
        "ENGINEERING MECHANICS": "https://drive.google.com/file/d/1ciES6cPEfJkh9W_V-5Qi2-5jbDXcx-fS/view?usp=drive_link",
        "INTRODUCTION TO ELECTRICAL AND ELECTRONICS ENGINEERING": "https://drive.google.com/file/d/1oil8nvFVVosYp4YeRRZ1KZNYXR4EBekl/view?usp=drive_link",
        "INTRODUCTION TO MECHANICAL ENGINEERING & CIVIL ENGINEERING": "https://drive.google.com/file/d/1l2cvJSLGq0AVRN5bwatzeDswpSvurqp6/view?usp=drive_link",
        "ALGORITHMIC THINKING WITH PYTHON": "https://drive.google.com/file/d/1ugnjRslVCgcJin-3mBodIxGAA4sRNIpx/view?usp=drive_link",
        "FOUNDATIONS OF COMPUTING: FROM HARDWARE ESSENTIALS TO WEB DESIGN": "https://drive.google.com/file/d/1N_pry7XEGHJPoyPmtVdKCVgYZ4EG2aHh/view?usp=drive_link",
        "MATHEMATICS FOR INFORMATION SCIENCE – 2": "https://drive.google.com/file/d/1CSExt42CXCwI82yYOM4UlBXkr-bkgXiM/view?usp=drive_link",
        "PROGRAMMING IN C": "https://drive.google.com/file/d/1o5w0oKfUG5npmk3koQgf3TnOM1hSrkCa/view?usp=drive_link",
        "ENGINEERING ETHICS AND SUSTAINABLE DEVELOPMENT": "https://drive.google.com/file/d/1WPirx_YdwUbna60vYZHNxDzFSB31S2Nj/view?usp=drive_link",
        "DISCRETE MATHEMATICAL STRUCTURES (CORE)": "https://drive.google.com/file/d/1nNHDfy_FKiyH1eQZ6uSXqOHc0CFh7pej/view?usp=drive_link",
      },
      "3":{},
      "4": {},
      "5": {},
      "6": {},
      "7": {},
      "8": {},
    },
  },
};








export function getSemesterKeys(scheme: Scheme, dept: string): string[] {
  const deptUpper = dept?.toUpperCase() as DeptCode;
  if (!SYLLABUS_LINKS[scheme]?.[deptUpper]) return [];
  return SEMESTER_KEYS[scheme];
}

export function getSemesterLabel(key: string) {
  if (key === "1-2") return "Semester 1 & 2";
  return `Semester ${key}`;
}

export function getSubjectLinks(scheme: Scheme, dept: string, semester: string): Record<string, string> {
  console.log(scheme, dept, semester)

  const deptUpper = dept?.toUpperCase() as DeptCode;
 
  const semData = SYLLABUS_LINKS[scheme][deptUpper][semester];
  if (!semData) return {};

  if (typeof semData === "string") {
    return { "Full Syllabus": semData };
  }

  return semData;
}

export function getSyllabusUrl(scheme: Scheme, dept: string, semester: string): string {
  const deptUpper = dept?.toUpperCase() as DeptCode;
  const semData = (SYLLABUS_LINKS[scheme] as any)?.[deptUpper]?.[semester];
  if (typeof semData === "string") {
    return semData;
  }
  return "";
}