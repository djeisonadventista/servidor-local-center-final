"use client"; 

import dynamic from 'next/dynamic';


const HeaderSection = dynamic(
    () => import("@/components/request/header-section").then(mod => mod.HeaderSection),
    { ssr: false }
);


const RequestSection = dynamic(
    () => import("@/components/request/request-section").then(mod => mod.RequestSection),
    { ssr: false }
);

const Page = () => {
    return (
        <div className="min-h-screen bg-[#F5F7FA]">
            <HeaderSection />
            <RequestSection />
        </div>
    );
};

export default Page;