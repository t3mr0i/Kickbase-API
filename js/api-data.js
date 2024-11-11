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
                        }
                    }
                },
                {
                    id: "forgot-password",
                    name: "Forgot Password",
                    method: "POST",
                    path: "/v4/user/forgotpassword",
                    description: "Request password reset",
                    parameters: [
                        {
                            name: "email",
                            type: "string",
                            required: true,
                            description: "User's email address"
                        }
                    ],
                    responses: {
                        "200": {
                            description: "Password reset email sent",
                            example: {
                                success: true,
                                message: "Reset instructions sent to email"
                            }
                        }
                    }
                },
                {
                    id: "edit-password",
                    name: "Edit Password",
                    method: "POST",
                    path: "/v4/user/password",
                    description: "Change user password",
                    parameters: [
                        {
                            name: "currentPassword",
                            type: "string",
                            required: true,
                            description: "Current password"
                        },
                        {
                            name: "newPassword",
                            type: "string",
                            required: true,
                            description: "New password"
                        }
                    ],
                    responses: {
                        "200": {
                            description: "Password changed successfully",
                            example: {
                                success: true
                            }
                        }
                    }
                },
                {
                    id: "delete-account",
                    name: "Delete Account",
                    method: "DELETE",
                    path: "/v4/user",
                    description: "Delete user account",
                    responses: {
                        "200": {
                            description: "Account deleted successfully",
                            example: {
                                success: true
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
                    id: "join-league",
                    name: "Join League",
                    method: "POST",
                    path: "/v4/leagues/{leagueId}/join",
                    description: "Join a public league",
                    responses: {
                        "200": {
                            description: "Successfully joined league",
                            example: {
                                success: true,
                                league: {
                                    id: "league123",
                                    name: "League Name",
                                    memberCount: 5,
                                    maxMembers: 8
                                }
                            }
                        }
                    }
                },
                {
                    id: "join-private-league",
                    name: "Join Private League",
                    method: "POST",
                    path: "/v4/leagues/{leagueId}/join/{code}",
                    description: "Join a private league using invite code",
                    parameters: [
                        {
                            name: "code",
                            type: "string",
                            required: true,
                            description: "League invite code"
                        }
                    ],
                    responses: {
                        "200": {
                            description: "Successfully joined private league",
                            example: {
                                success: true,
                                league: {
                                    id: "league123",
                                    name: "Private League",
                                    type: "private",
                                    memberCount: 5,
                                    maxMembers: 8
                                }
                            }
                        }
                    }
                },
                {
                    id: "league-preview",
                    name: "Get League Preview",
                    method: "GET",
                    path: "/v4/leagues/{leagueId}/overview",
                    description: "Get preview data for a league",
                    responses: {
                        "200": {
                            description: "League preview data retrieved",
                            example: {
                                id: "league123",
                                name: "League Name",
                                type: "public",
                                season: "2023/24",
                                members: {
                                    current: 6,
                                    max: 8
                                },
                                topPlayers: [
                                    {
                                        userId: "user123",
                                        name: "Top Player",
                                        points: 1500
                                    }
                                ]
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
                    id: "get-squad",
                    name: "Get Squad",
                    method: "GET",
                    path: "/v4/leagues/{leagueId}/squad",
                    description: "Get current squad information",
                    responses: {
                        "200": {
                            description: "Squad information retrieved",
                            example: {
                                players: [
                                    {
                                        id: "player123",
                                        name: "Player Name",
                                        position: "FW",
                                        team: "Team Name",
                                        number: 9,
                                        status: "active",
                                        stats: {
                                            points: 85,
                                            marketValue: 15000000,
                                            averagePoints: 8.5
                                        }
                                    }
                                ],
                                formation: "4-4-2",
                                totalValue: 150000000
                            }
                        }
                    }
                },
                {
                    id: "market-players",
                    name: "Get Market Players",
                    method: "GET",
                    path: "/v4/leagues/{leagueId}/market/players",
                    description: "Get all available players in the market",
                    responses: {
                        "200": {
                            description: "Market players retrieved",
                            example: {
                                players: [
                                    {
                                        id: "player123",
                                        name: "Available Player",
                                        position: "MF",
                                        team: "Team Name",
                                        price: 12000000,
                                        expiry: "2024-01-01T00:00:00Z",
                                        stats: {
                                            form: 8.5,
                                            totalPoints: 123,
                                            gamesPlayed: 15
                                        }
                                    }
                                ],
                                meta: {
                                    total: 50,
                                    available: 25
                                }
                            }
                        }
                    }
                }
            ]
        },
        {
            id: "competition",
            name: "Competition",
            description: "Endpoints for competition data",
            endpoints: [
                {
                    id: "competition-data",
                    name: "Get Competition Data",
                    method: "GET",
                    path: "/v4/competition/{competitionId}",
                    description: "Get competition information",
                    responses: {
                        "200": {
                            description: "Competition data retrieved",
                            example: {
                                id: "comp123",
                                name: "Bundesliga",
                                season: "2023/24",
                                currentMatchday: 15,
                                totalMatchdays: 34,
                                teams: [
                                    {
                                        id: "team123",
                                        name: "Team Name",
                                        shortName: "TN",
                                        position: 1,
                                        points: 35
                                    }
                                ]
                            }
                        }
                    }
                },
                {
                    id: "match-day",
                    name: "Get Match Day Data",
                    method: "GET",
                    path: "/v4/competition/{competitionId}/matchday/{matchDayId}",
                    description: "Get match day information",
                    responses: {
                        "200": {
                            description: "Match day data retrieved",
                            example: {
                                matchday: 15,
                                matches: [
                                    {
                                        id: "match123",
                                        homeTeam: {
                                            id: "team1",
                                            name: "Home Team",
                                            score: 2
                                        },
                                        awayTeam: {
                                            id: "team2",
                                            name: "Away Team",
                                            score: 1
                                        },
                                        status: "FINISHED",
                                        date: "2024-01-01T15:30:00Z"
                                    }
                                ]
                            }
                        }
                    }
                }
            ]
        },
        {
            id: "chat",
            name: "Chat",
            description: "Endpoints for chat functionality",
            endpoints: [
                {
                    id: "chat-leagues",
                    name: "Fetch Chat Leagues",
                    method: "GET",
                    path: "/v4/chat/leagueselection",
                    description: "Get all available chat leagues",
                    responses: {
                        "200": {
                            description: "Chat leagues retrieved",
                            example: {
                                leagues: [
                                    {
                                        id: "league123",
                                        name: "League Chat",
                                        unreadCount: 5,
                                        lastMessage: {
                                            text: "Hello everyone!",
                                            timestamp: "2024-01-01T12:00:00Z",
                                            sender: "User123"
                                        }
                                    }
                                ]
                            }
                        }
                    }
                },
                {
                    id: "refresh-token",
                    name: "Refresh Chat Token",
                    method: "GET",
                    path: "/v4/chat/refreshtoken",
                    description: "Refresh the chat authentication token",
                    responses: {
                        "200": {
                            description: "Chat token refreshed",
                            example: {
                                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                                expiresIn: 3600
                            }
                        }
                    }
                }
            ]
        },
        {
            id: "utility",
            name: "Utility",
            description: "Utility endpoints",
            endpoints: [
                {
                    id: "app-config",
                    name: "Get App Configuration",
                    method: "GET",
                    path: "/v4/config",
                    description: "Get application configuration",
                    responses: {
                        "200": {
                            description: "App configuration retrieved",
                            example: {
                                version: "12.0.0",
                                features: {
                                    chat: true,
                                    challenges: true
                                },
                                maintenance: {
                                    scheduled: false
                                },
                                urls: {
                                    terms: "https://kickbase.com/terms",
                                    privacy: "https://kickbase.com/privacy"
                                }
                            }
                        }
                    }
                },
                {
                    id: "daily-bonus",
                    name: "Collect Daily Bonus",
                    method: "GET",
                    path: "/v4/bonus/collect",
                    description: "Collect daily bonus rewards",
                    responses: {
                        "200": {
                            description: "Daily bonus collected",
                            example: {
                                amount: 50000,
                                currency: "coins",
                                nextBonus: "2024-01-02T00:00:00Z",
                                streak: 5
                            }
                        }
                    }
                },
                {
                    id: "live-event-types",
                    name: "Get Live Event Types",
                    method: "GET",
                    path: "/v4/live/eventtypes",
                    description: "Get all possible live event types",
                    responses: {
                        "200": {
                            description: "Live event types retrieved",
                            example: {
                                events: [
                                    {
                                        id: "GOAL",
                                        name: "Goal",
                                        points: 4
                                    },
                                    {
                                        id: "ASSIST",
                                        name: "Assist",
                                        points: 2
                                    },
                                    {
                                        id: "YELLOW_CARD",
                                        name: "Yellow Card",
                                        points: -1
                                    }
                                ]
                            }
                        }
                    }
                }
            ]
        }
    ]
}; 