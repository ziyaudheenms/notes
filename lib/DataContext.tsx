"use client";
import { useEffect } from 'react';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { SHEET_ID } from './data';
import Papa from 'papaparse';
import { CSQL } from './csql';
import Loading from '@/app/loading_';
import DepartmentSelectDialog from '@/components/DepartmentSelectDialog';
import { Scheme } from './syllabus';

type DataContextType = {
    db: CSQL | undefined;
    vldb: CSQL | undefined;
    pyq: CSQL | undefined;
    dept: string;
    setDept: React.Dispatch<React.SetStateAction<string>>;
    scheme: Scheme;
    setScheme: React.Dispatch<React.SetStateAction<Scheme>>;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
    const [db, setDb] = useState<CSQL>();
    const [vldb, setVldb] = useState<CSQL>();
    const [pyq, setPyq] = useState<CSQL>(); // <-- add this
    const [dept, setDept] = useState<string>('');
    const [scheme, setScheme] = useState<Scheme>('2020');
    const [schemeReady, setSchemeReady] = useState(false);
    const [showDeptDialog, setShowDeptDialog] = useState<boolean>(false);
    useEffect(() => {
        Papa.parse(`https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=notes`, {
            download: true,
            header: true,
            complete: (results) => {
                if (results.errors.length > 0) {
                    console.error('Error loading database:', results.errors);
                    setDb(new CSQL([]));
                } else {
                    const cachedDept = localStorage.getItem('dept');
                    if(cachedDept) {
                        setDept(cachedDept);
                    } else {
                        setShowDeptDialog(true);
                    }
                    const parsedData = (results.data as any[]).map(row => ({
                        ...row,
                        Scheme: row.Scheme ? String(row.Scheme).trim() : '2020',
                    }));
                    setDb(new CSQL(parsedData));
                }
            },
            error: (error) => {
                console.error('Error parsing CSV:', error);
                setDb(new CSQL([]));
            }
        });

        Papa.parse(`https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=playlists`, {
            download: true,
            header: true,
            complete: (results) => {
                if (results.errors.length > 0) {
                    console.error('Error loading VLDB:', results.errors);
                } else {
                    setVldb(new CSQL(results.data));
                }
            },
            error: (error) => {
                console.error('Error parsing VLDB CSV:', error);
            }
        });

        Papa.parse(`https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=pyq`, {
            download: true,
            header: true,
            complete: (results) => {
                if (results.errors.length > 0) {
                    console.error('Error loading PYQ:', results.errors);
                    setPyq(new CSQL([]));
                } else {
                    const parsedPyq = (results.data as any[]).map(row => ({
                        ...row,
                        Scheme: row.Scheme ? String(row.Scheme).trim() : '2020',
                    }));
                    setPyq(new CSQL(parsedPyq));
                }
            },
            error: (error) => {
                console.error('Error parsing PYQ CSV:', error);
                setPyq(new CSQL([]));
            }
        });
    }, []);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const parts = window.location.pathname.split('/').filter(Boolean);
            if (parts[0] === '2020' || parts[0] === '2025') {
                setScheme(parts[0]);
                localStorage.setItem('scheme', parts[0]);
            } else {
                const cachedScheme = localStorage.getItem('scheme');
                if (cachedScheme === '2020' || cachedScheme === '2025') {
                    setScheme(cachedScheme);
                }
            }
            setSchemeReady(true);
        }
    }, []);
    useEffect(() => {
        if (dept) {
            localStorage.setItem('dept', dept);
        }
    }, [dept]);
    useEffect(() => {
        if (!schemeReady) return;
        localStorage.setItem('scheme', scheme);
    }, [scheme, schemeReady]);

    const handleDepartmentSelect = (selectedDept: string) => {
        setDept(selectedDept);
        setShowDeptDialog(false);
    };
        return (
        <DataContext.Provider value={{ db, vldb, pyq, dept, setDept, scheme, setScheme }}>
            <DepartmentSelectDialog 
                isOpen={showDeptDialog} 
                onSelect={handleDepartmentSelect}
                db={db}
            />
            {db && vldb && pyq ? children : <Loading msg="Getting your notes..." />}
        </DataContext.Provider>
    );
};

export const useDataContext = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useDataContext must be used within a DataProvider');
    }
    return context;
};