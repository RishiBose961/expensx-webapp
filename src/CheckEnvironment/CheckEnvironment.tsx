
const CheckEnvironment = () => {
    const base_url =
    import.meta.env.VITE_API_URL=== "development"
      ? "http://localhost:5000"
      : "https://expensx-server.vercel.app"; 

      return {base_url}
}

export default CheckEnvironment