const prod = {
    url: {
        API_URL: "https://chat-app-557-server.herokuapp.com"
    }
}

const dev = {
    url: {
        API_URL: "http://localhost:8081"
    }
}

export const urlToUse = process.env.NODE_ENV === "development" ? dev : prod;