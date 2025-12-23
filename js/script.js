<script>
async function getNews() {
  const country = document.getElementById("countryInput").value.trim();
  const countryCode = getCountryCode(country);

  if (!countryCode) {
    document.getElementById("newsContainer").innerHTML = "<p style='text-align:center;'>Invalid country name.</p>";
    return;
  }

  const rssUrl = `https://news.google.com/rss?hl=en-${countryCode}&gl=${countryCode}&ceid=${countryCode}:en`;
  const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

  document.getElementById("newsContainer").innerHTML = "<p style='text-align:center;'>Loading news...</p>";

  try {
    const res = await fetch(apiUrl);
    const data = await res.json();

    if (!data.items || data.items.length === 0) {
      document.getElementById("newsContainer").innerHTML = `<p style='text-align:center;'>No news found for "${country}".</p>`;
      return;
    }

    const articles = data.items.slice(0, 12)
      .map(item => {
        let imageUrl = "";

        if (item.enclosure && item.enclosure.link) {
          imageUrl = item.enclosure.link;
        } else {
          const match = item.description.match(/<img.*?src="(.*?)"/);
          imageUrl = match ? match[1] : "https://via.placeholder.com/400x250?text=News+Image";
        }

        return `
          <div class="news-card">
            <img src="${imageUrl}" alt="News Image">
            <h3>${item.title}</h3>
            <p>${item.description.replace(/<[^>]*>?/gm, '').substring(0, 120)}...</p>
            <a href="${item.link}" target="_blank">Read more →</a>
          </div>
        `;
      }).join("");

    document.getElementById("newsContainer").innerHTML = articles;
  } catch (error) {
    document.getElementById("newsContainer").innerHTML = "<p style='text-align:center;'>Unable to fetch news. Try again later.</p>";
    console.error(error);
  }
}

function getCountryCode(name) {
  const map = {
    india: "IN",
    usa: "US",
    unitedstates: "US",
    uk: "GB",
    england: "GB",
    france: "FR",
    germany: "DE",
    china: "CN",
    japan: "JP",
    canada: "CA",
    australia: "AU"
  };
  return map[name.toLowerCase()];
}
</script>