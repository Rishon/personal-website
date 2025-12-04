module.exports = {
  siteUrl: "https://rishon.systems",
  generateRobotsTxt: true,

  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        disallow: ["/auth/spotify-callback"],
      },
      {
        userAgent: "*",
        disallow: ["/auth/spotify-navigate"],
      },
    ],
  },
};
