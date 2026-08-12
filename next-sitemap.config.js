const PRIORITIES = {
  "/": { priority: 1.0, changefreq: "weekly" },
  "/projects": { priority: 0.8, changefreq: "monthly" },
  "/contact": { priority: 0.5, changefreq: "yearly" },
};

module.exports = {
  siteUrl: "https://rishon.systems",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ["/auth/*", "/404", "/500"],

  transform: async (config, path) => {
    const meta = PRIORITIES[path] ?? { priority: 0.5, changefreq: "monthly" };

    return {
      loc: path,
      priority: meta.priority,
      changefreq: meta.changefreq,
      lastmod: new Date().toISOString(),
    };
  },

  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/auth/", "/api/"],
      },
    ],
  },
};
