const apiData = {
    info: {
        name: "Kickbase API Documentation",
        version: "12.0.0",
        description: "Unofficial documentation of the Kickbase API",
        baseUrl: "https://api.kickbase.com"
    },
    endpoints: [
        {
            id: "account-auth",
            name: "Account & Authentication",
            description: "Endpoints for user authentication and account management",
            endpoints: [
                {
                    id: "login",
                    name: "Login",
                    method: "POST",
                    path: "/v4/user/login",
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
                                    id: "12345",
                                    email: "user@example.com",
                                    name: "Username",
                                    profile: {
                                        avatar: "https://example.com/avatar.jpg",
                                        level: 10,
                                        created: "2023-01-01T00:00:00Z"
                                    }
                                }
                            }
                        },
                        "401": {
                            description: "Invalid credentials",
                            example: {
                                error: "Invalid email or password",
                                code: "AUTH_FAILED"
                            }
                        }
                    }
                },
                {
                    id: "register",
                    name: "Register User",
                    method: "POST",
                    path: "/v4/user/register",
                    description: "Register a new user account",
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
                        },
                        {
                            name: "name",
                            type: "string",
                            required: true,
                            description: "User's display name"
                        }
                    ],
                    responses: {
                        "201": {
                            description: "Successfully registered",
                            example: {
                                userId: "12345",
                                email: "user@example.com",
                                name: "Username",
                                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                            }
                        },
                        "400": {
                            description: "Invalid registration data",
                            example: {
                                error: "Email already exists",
                                code: "EMAIL_EXISTS"
                            }
                        }
                    }
                }
            ]
        },
        {
            id: "league-management",
            name: "League Management",
            description: "Endpoints for managing leagues",
            endpoints: [
                {
                    id: "create-league",
                    name: "Create League",
                    method: "POST",
                    path: "/v4/leagues",
                    description: "Create a new league",
                    parameters: [
                        {
                            name: "name",
                            type: "string",
                            required: true,
                            description: "League name"
                        },
                        {
                            name: "type",
                            type: "string",
                            required: true,
                            description: "League type (public/private)"
                        },
                        {
                            name: "maxMembers",
                            type: "number",
                            required: true,
                            description: "Maximum number of members"
                        }
                    ],
                    responses: {
                        "201": {
                            description: "League created successfully",
                            example: {
                                id: "league123",
                                name: "My League",
                                type: "private",
                                maxMembers: 8,
                                creator: {
                                    id: "user123",
                                    name: "Creator Name"
                                },
                                inviteCode: "ABC123"
                            }
                        }
                    }
                },
                {
                    id: "league-ranking",
                    name: "Get League Ranking",
                    method: "GET",
                    path: "/v4/leagues/{leagueId}/ranking",
                    description: "Get current league rankings",
                    responses: {
                        "200": {
                            description: "League rankings retrieved successfully",
                            example: {
                                rankings: [
                                    {
                                        position: 1,
                                        userId: "user123",
                                        name: "Player 1",
                                        points: 1250,
                                        teamValue: 150000000,
                                        trend: "up"
                                    },
                                    {
                                        position: 2,
                                        userId: "user456",
                                        name: "Player 2",
                                        points: 1100,
                                        teamValue: 145000000,
                                        trend: "down"
                                    }
                                ],
                                totalParticipants: 8
                            }
                        }
                    }
                }
            ]
        },
        {
            id: "market-players",
            name: "Market & Players",
            description: "Endpoints for market and player management",
            endpoints: [
                {
                    id: "market-overview",
                    name: "Get Market Overview",
                    method: "GET",
                    path: "/v4/leagues/{leagueId}/market/overview",
                    description: "Get current market overview",
                    responses: {
                        "200": {
                            description: "Market overview retrieved successfully",
                            example: {
                                players: [
                                    {
                                        id: "player123",
                                        name: "Player Name",
                                        team: "Team Name",
                                        position: "FW",
                                        price: 15000000,
                                        expiry: "2024-01-01T00:00:00Z",
                                        stats: {
                                            averagePoints: 85.5,
                                            totalMatches: 15,
                                            goals: 10
                                        }
                                    }
                                ],
                                marketStatus: {
                                    isOpen: true,
                                    nextUpdate: "2024-01-01T12:00:00Z"
                                }
                            }
                        }
                    }
                },
                {
                    id: "buy-player",
                    name: "Buy Player",
                    method: "POST",
                    path: "/v4/leagues/{leagueId}/market/{playerId}/buy",
                    description: "Purchase a player from the market",
                    parameters: [
                        {
                            name: "price",
                            type: "number",
                            required: true,
                            description: "Offer price in game currency"
                        }
                    ],
                    responses: {
                        "200": {
                            description: "Player purchased successfully",
                            example: {
                                success: true,
                                transaction: {
                                    id: "trans123",
                                    playerId: "player123",
                                    price: 15000000,
                                    timestamp: "2024-01-01T00:00:00Z"
                                },
                                newBalance: 5000000
                            }
                        },
                        "400": {
                            description: "Purchase failed",
                            example: {
                                error: "Insufficient funds",
                                code: "INSUFFICIENT_FUNDS"
                            }
                        }
                    }
                }
            ]
        },
        {
            id: "live-data",
            name: "Live Data",
            description: "Endpoints for live match data",
            endpoints: [
                {
                    id: "live-match",
                    name: "Get Live Match Data",
                    method: "GET",
                    path: "/v4/matches/{matchId}/live",
                    description: "Get real-time match data",
                    responses: {
                        "200": {
                            description: "Live match data retrieved successfully",
                            example: {
                                matchId: "match123",
                                status: "LIVE",
                                minute: 65,
                                score: {
                                    home: 2,
                                    away: 1
                                },
                                events: [
                                    {
                                        type: "GOAL",
                                        minute: 23,
                                        playerId: "player123",
                                        points: 4
                                    }
                                ],
                                playerStats: {
                                    "player123": {
                                        points: 12,
                                        events: ["GOAL", "ASSIST"]
                                    }
                                }
                            }
                        }
                    }
                }
            ]
        },
        {
            id: "stats",
            name: "Statistics",
            description: "Endpoints for player and team statistics",
            endpoints: [
                {
                    id: "player-stats",
                    name: "Get Player Statistics",
                    method: "GET",
                    path: "/v4/leagues/{leagueId}/players/{playerId}/stats",
                    description: "Get detailed player statistics",
                    responses: {
                        "200": {
                            description: "Player statistics retrieved successfully",
                            example: {
                                playerId: "player123",
                                name: "Player Name",
                                season: {
                                    matches: 25,
                                    goals: 15,
                                    assists: 8,
                                    yellowCards: 3,
                                    redCards: 0,
                                    averagePoints: 85.5,
                                    totalPoints: 2137,
                                    priceHistory: [
                                        {
                                            date: "2024-01-01",
                                            price: 15000000
                                        }
                                    ]
                                }
                            }
                        }
                    }
                }
            ]
        }
    ]
}; 