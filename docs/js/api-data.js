const apiData = {
    info: {
        name: "API Documentation",
        version: "1.0.0",
        description: "Complete API documentation with examples"
    },
    endpoints: [
        {
            id: "authentication",
            name: "Authentication",
            description: "Authentication endpoints",
            endpoints: [
                {
                    id: "login",
                    name: "Login",
                    method: "POST",
                    path: "/api/auth/login",
                    description: "Authenticate user and receive access token",
                    parameters: [
                        {
                            name: "email",
                            type: "string",
                            required: true,
                            description: "User's email address"
                        },
                        {
                            name: "password",
                            type: "string",
                            required: true,
                            description: "User's password"
                        }
                    ],
                    responses: {
                        "200": {
                            description: "Successful authentication",
                            example: {
                                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                                user: {
                                    id: 1,
                                    email: "user@example.com"
                                }
                            }
                        },
                        "401": {
                            description: "Invalid credentials",
                            example: {
                                error: "Invalid email or password"
                            }
                        }
                    }
                }
            ]
        }
        // Add more endpoint categories here
    ]
}; 