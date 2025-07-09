/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://policypeek.vercel.app',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  exclude: ['/api/*'],
  outDir: 'public',
};
