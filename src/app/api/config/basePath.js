const baseUrl = process.env.NODE_ENV === "production"
    ? "https://challenge-n5.vercel.app"
    : "http://localhost:3000";

export default baseUrl;
