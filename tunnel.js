const ngrok = require("ngrok");

(async () => {
  try {
    const url = await ngrok.connect({
      proto: "http",
      addr:  3000
    });
    console.log("\n========================================");
    console.log("✅ HTTPS Tunnel is LIVE!");
    console.log("========================================");
    console.log("📱 Open this on your MOBILE:");
    console.log("👉 " + url);
    console.log("========================================");
    console.log("GPS will now work on mobile! 📍");
    console.log("Press Ctrl+C to stop.\n");
  } catch(err) {
    console.log("❌ Tunnel error:", err.message);
    console.log("\nTry this instead:");
    console.log("1. Go to https://ngrok.com/signup");
    console.log("2. Sign up free");
    console.log("3. Get your authtoken");
    console.log("4. Run: node tunnel.js --token YOUR_TOKEN");
  }
})();
