import React from "react";

export const LegalSection: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="text-white">
      <p>&copy; {currentYear} PassAges. Tous droits réservés.</p>
      <p className="text-center text-white">
        Ce site a été développé par Ahmed Ayari et Eva Tharrats pour un projet
        école Ada Tech School.
      </p>
    </div>
  );
};
