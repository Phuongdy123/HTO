import React from 'react';
import { Page } from 'zmp-ui';

const HomePage = () => {
  return (
    <Page className="page">
      {/* KHUNG HIỂN THỊ WEB (IFRAME) */}
      <iframe 
        // 👇 QUAN TRỌNG: Thay link bên dưới bằng link web của bạn
        src="https://hto-hjzc.vercel.app/" 
        
        style={{ 
          width: '100%', 
          height: '100vh', 
          border: 'none' 
        }}
        title="Web View"
      />
    </Page>
  );
};

export default HomePage;