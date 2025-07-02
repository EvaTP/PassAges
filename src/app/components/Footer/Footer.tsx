import React from "react";
import { PassagesSection } from "./PassagesSection";
import { InformationsSection } from "./InformationsSection";
import { ContactSection } from "./ContactSection";
import { LegalSection } from "./LegalSection";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 flex flex-col flex-1 text-white px-6 py-8">
      <div className="flex flex-row space-x-6 mb-6">
        <div className="flex-1 flex flex-col">
          <PassagesSection />
        </div>
        <div className="flex-1 flex flex-col">
          <InformationsSection />
        </div>
        <div className="flex-1 flex flex-col">
          <ContactSection />
        </div>
      </div>
      <div className="border-t border-gray-700 py-4 max-w-7xl mx-auto px-6 text-center text-sm">
        <LegalSection />
      </div>
    </footer>
  );
};

export default Footer;
