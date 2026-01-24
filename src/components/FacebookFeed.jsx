import React, { useEffect } from 'react'

const FacebookFeed = () => {
  useEffect(() => {
    // Load Facebook SDK
    const loadFbSdk = () => {
      if (window.FB) {
        window.FB.XFBML.parse(); // Re-parse if already loaded
        return;
      }
      
      window.fbAsyncInit = function() {
        window.FB.init({
          xfbml            : true,
          version          : 'v19.0'
        });
      };

      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/zh_TW/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    };

    loadFbSdk();
  }, []);

  return (
    <div className="w-full bg-white rounded-xl overflow-hidden shadow-lg border border-slate-100">
      <div className="bg-[#1877F2] p-3 flex items-center gap-2 text-white">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
        <span className="font-bold">官方最新公告</span>
      </div>
      <div className="flex justify-center p-4 bg-slate-50">
        <div 
          className="fb-page" 
          data-href="https://www.facebook.com/phfireworks" 
          data-tabs="timeline,events" 
          data-width="500" 
          data-height="600" 
          data-small-header="false" 
          data-adapt-container-width="true" 
          data-hide-cover="false" 
          data-show-facepile="true">
          <blockquote cite="https://www.facebook.com/phfireworks" className="fb-xfbml-parse-ignore">
            <a href="https://www.facebook.com/phfireworks">澎湖國際海上花火節</a>
          </blockquote>
        </div>
      </div>
      <div id="fb-root"></div>
    </div>
  )
}

export default FacebookFeed
