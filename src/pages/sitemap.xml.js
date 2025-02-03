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
      { path: '/shop', priority: '0.9' },
      { path: '/blog', priority: '0.9' },
      { path: '/coupon', priority: '0.9' },
      { path: '/aboutus', priority: '0.8' },
      { path: '/contactus', priority: '0.8' },
  
    ];
  
    const sitemap = generateSiteMap(pages);
  
    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();
  
    return { props: {} };
  }
  
  export default function Sitemap() {}
  