// Datos de fallback local para cuando SportsData API falla
export const mockTeams = [
    {
        "TeamID": 1,
        "Key": "LAA",
        "Active": true,
        "Name": "Los Angeles Angels",
        "WikipediaLogoUrl": "https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/Los_Angeles_Angels.svg/1200px-Los_Angeles_Angels.svg.png"
    },
    {
        "TeamID": 2,
        "Key": "LAD",
        "Active": true,
        "Name": "Los Angeles Dodgers",
        "WikipediaLogoUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Los_Angeles_Dodgers_logo.svg/1200px-Los_Angeles_Dodgers_logo.svg.png"
    },
    {
        "TeamID": 3,
        "Key": "SD",
        "Active": true,
        "Name": "San Diego Padres",
        "WikipediaLogoUrl": "https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/San_Diego_Padres.svg/1024px-San_Diego_Padres.svg.png"
    },
    {
        "TeamID": 4,
        "Key": "SF",
        "Active": true,
        "Name": "San Francisco Giants",
        "WikipediaLogoUrl": "https://upload.wikimedia.org/wikipedia/en/thumb/c/cb/SF_Giants_Logo.svg/1200px-SF_Giants_Logo.svg.png"
    },
    {
        "TeamID": 5,
        "Key": "ARI",
        "Active": true,
        "Name": "Arizona Diamondbacks",
        "WikipediaLogoUrl": "https://upload.wikimedia.org/wikipedia/en/thumb/3/3a/Arizona_Diamondbacks_logo.svg/1200px-Arizona_Diamondbacks_logo.svg.png"
    },
    {
        "TeamID": 6,
        "Key": "COL",
        "Active": true,
        "Name": "Colorado Rockies",
        "WikipediaLogoUrl": "https://upload.wikimedia.org/wikipedia/en/thumb/1/1c/Colorado_Rockies_logo.svg/1200px-Colorado_Rockies_logo.svg.png"
    }
];

export const mockPlayersByTeam = {
    "LAA": [
        {
            "PlayerID": 1,
            "Status": "Active",
            "FirstName": "Mike",
            "LastName": "Trout",
            "Team": "LAA",
            "Position": "CF",
            "Jersey": 27,
            "PhotoUrl": "https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot_default.png/mlb_photos/mike_trout.png",
            "BatHand": "R"
        },
        {
            "PlayerID": 2,
            "Status": "Active",
            "FirstName": "Shohei",
            "LastName": "Ohtani",
            "Team": "LAA",
            "Position": "DH",
            "Jersey": 17,
            "PhotoUrl": "https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot_default.png/mlb_photos/shohei_ohtani.png",
            "BatHand": "L"
        }
    ],
    "LAD": [
        {
            "PlayerID": 3,
            "Status": "Active",
            "FirstName": "Mookie",
            "LastName": "Betts",
            "Team": "LAD",
            "Position": "RF",
            "Jersey": 50,
            "PhotoUrl": "https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot_default.png/mlb_photos/mookie_betts.png",
            "BatHand": "R"
        },
        {
            "PlayerID": 4,
            "Status": "Active",
            "FirstName": "Freddie",
            "LastName": "Freeman",
            "Team": "LAD",
            "Position": "1B",
            "Jersey": 5,
            "PhotoUrl": "https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot_default.png/mlb_photos/freddie_freeman.png",
            "BatHand": "L"
        }
    ],
    "SD": [
        {
            "PlayerID": 5,
            "Status": "Active",
            "FirstName": "Manny",
            "LastName": "Machado",
            "Team": "SD",
            "Position": "3B",
            "Jersey": 13,
            "PhotoUrl": "https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot_default.png/mlb_photos/manny_machado.png",
            "BatHand": "R"
        }
    ],
    "SF": [
        {
            "PlayerID": 6,
            "Status": "Active",
            "FirstName": "Marco",
            "LastName": "Luciano",
            "Team": "SF",
            "Position": "LF",
            "Jersey": 46,
            "PhotoUrl": "https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot_default.png/mlb_photos/marco_luciano.png",
            "BatHand": "R"
        }
    ],
    "ARI": [
        {
            "PlayerID": 7,
            "Status": "Active",
            "FirstName": "Ketel",
            "LastName": "Marte",
            "Team": "ARI",
            "Position": "SS",
            "Jersey": 4,
            "PhotoUrl": "https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot_default.png/mlb_photos/ketel_marte.png",
            "BatHand": "R"
        }
    ],
    "COL": [
        {
            "PlayerID": 8,
            "Status": "Active",
            "FirstName": "Nolan",
            "LastName": "Arenado",
            "Team": "COL",
            "Position": "3B",
            "Jersey": 28,
            "PhotoUrl": "https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot_default.png/mlb_photos/nolan_arenado.png",
            "BatHand": "R"
        }
    ]
};
