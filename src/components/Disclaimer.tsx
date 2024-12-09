import React from 'react';

const Disclaimer: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 text-center text-sm z-50">
      <p>
        This service is recommended for gaming mechanics and experimental purposes only. 
        We do not endorse or encourage any fraudulent schemes, rug pulls, or illegal activities. 
        Users are solely responsible for their actions and compliance with local regulations.
      </p>
    </div>
  );
};

export default Disclaimer;