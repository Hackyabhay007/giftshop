function generateSiteMap(pages) {
    return `<?xml version="1.0" encoding="UTF-8"?>
     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
       ${pages.map(page => `
         <url>
           <loc>https://mysweetwishes.com${page.path}</loc>
           <lastmod>${new Date().toISOString()}</lastmod>
           <changefreq>weekly</changefreq>
           <priority>${page.priority}</priority>
         </url>
       `).join('')}
     </urlset>
   `;
  }
  
  export async function getServerSideProps({ res }) {
    const pages = [
      { path: '/', priority: '1.0' },
      { path: '/teddy-maddy', priority: '0.9' },
      { path: '/happy-cards', priority: '0.9' },
      { path: '/wall-paintings', priority: '0.9' },
      { path: '/diwali-gifts', priority: '0.8' },
      { path: '/personalised-gifts', priority: '0.8' },
      { path: '/surprise-box', priority: '0.8' }
    ];
  
    const sitemap = generateSiteMap(pages);
  
    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();
  
    return { props: {} };
  }
  
  export default function Sitemap() {}
  