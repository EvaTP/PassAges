import React from "react";
import { PassagesSection } from "./PassagesSection";
import { InformationsSection } from "./InformationsSection";
import { ContactSection } from "./ContactSection";
import { LegalSection } from "./LegalSection";

const Footer: React.FC = () => {
  return (
    <footer>
      <div id="footer">
        <PassagesSection />
        <InformationsSection />
        <ContactSection />
      </div>
      <LegalSection />
    </footer>
  );
};

export default Footer;
