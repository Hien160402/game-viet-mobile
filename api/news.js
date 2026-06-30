export default async function handler(req, res) {
  // Facebook Page ID
  const PAGE_ID = "61583939816663";
  // The Access Token is stored as an environment variable in Vercel
  const ACCESS_TOKEN = process.env.FB_PAGE_TOKEN;

  if (!ACCESS_TOKEN) {
    return res.status(200).json({ 
      success: false, 
      message: "Facebook Page Access Token not configured in Vercel Environment Variables. Displaying fallback mock data." 
    });
  }

  try {
    // Fetch 5 latest posts with fields: message, created_time, full_picture (image), and permalink_url
    const url = `https://graph.facebook.com/v18.0/${PAGE_ID}/posts?fields=message,created_time,full_picture,permalink_url&limit=5&access_token=${ACCESS_TOKEN}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      return res.status(200).json({ 
        success: false, 
        message: `Graph API Error: ${data.error.message}. Displaying fallback mock data.` 
      });
    }

    const posts = (data.data || []).map((post, index) => {
      const fullText = post.message || "";
      const lines = fullText.split("\n").map(line => line.trim()).filter(line => line.length > 0);
      
      // Title is the first line of the post message
      const title = lines[0] || `Bản Tin Game Việt Mobile #${index + 1}`;
      // Description is the rest of the post message
      const desc = lines.slice(1).join(" ") || "Bấm xem chi tiết bài viết và thảo luận trực tiếp trên Fanpage chính thức.";
      
      // Parse publish date
      let formattedDate = "Gần đây";
      if (post.created_time) {
        const dateObj = new Date(post.created_time);
        formattedDate = dateObj.toLocaleDateString("vi-VN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric"
        });
      }

      return {
        title: title.length > 70 ? title.substring(0, 70) + "..." : title,
        desc: desc.length > 130 ? desc.substring(0, 130) + "..." : desc,
        date: formattedDate,
        image: post.full_picture || "", // Will fall back to gradient check client-side
        link: post.permalink_url || `https://www.facebook.com/${PAGE_ID}`
      };
    });

    return res.status(200).json({ success: true, posts });
  } catch (error) {
    return res.status(200).json({ 
      success: false, 
      message: `Failed to fetch: ${error.message}. Displaying fallback mock data.` 
    });
  }
}
