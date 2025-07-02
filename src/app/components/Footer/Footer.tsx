import React from "react";
import { PassagesSection } from "./PassagesSection";
import { InformationsSection } from "./InformationsSection";
import { ContactSection } from "./ContactSection";
import { LegalSection } from "./LegalSection";

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="footer">
        <PassagesSection />
        <InformationsSection />
        <ContactSection />
      </div>
      <div className="footer">
        <LegalSection />
      </div>
    </footer>
  );
};

export default Footer;
