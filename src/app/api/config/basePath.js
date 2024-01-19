const baseUrl = process.env.NODE_ENV === "production"
    ? "UPDATE-TO-PROD-URL"
    : "http://localhost:3000";

export default baseUrl;
