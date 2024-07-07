export const navLandingPageLinks = [
    {
        id: 'about',
        label: 'About',
    },
    {
        id: 'patches',
        label: 'Patch list'
    },
    {
        id: 'signup',
        label: 'Sign up'
    }
]

export const navMainAppLinks = {
    main_links: [
    {
        id: 'patches',
        label: 'Dashboard',
    },
    {
        id: 'latest',
        label: 'Patches'
    },
    {
        id: '#about',
        label: 'About'
    },
    {
        id: "faq",
        label: "FAQ"
    }
    ],
    user_links: {
        "logged_in": [
            {
                id: 'profile',
                label: 'Profile',
            },
            {
                id: 'logout',
                label: 'Logout'
            },
            {
                id: 'search',
                label: 'Search'
            }
        ],
        "logged_out": [
            {
                id: 'login',
                label: 'Login',
            },
            {
                id: 'register',
                label: 'Register'
            }
        ]
    }
    
};

export const AboutCardData = [
    {
        title: 'What excatly is this?',
        content: 'This is a platform where users can upload files mainly for patching games in order to function correctly or just for uploading modpacks / creations which aren’t easy to install.'
    },
    {
        title: 'Why was it created?',
        content: 'This is a little side project of mine created with intent of learning new technologies while also helping with tedious tasks like manually copying an entire modpack to out favourite game.'
    },
]

export const InstructionsData = [
    "Find the game you are looking for",
    "Filter for patches based on your selected game of choice",
    "Download and extract inside the game directory"
]
interface FooterLinksInterface {
    [key: string]: {
        id: string;
        label: string;
    }[]

}
export const FooterLinks : FooterLinksInterface = {
    "About": [
        {
            "id": "#about",
            "label": "PatchHelper",
        },
        {
            "id": "SerwisKacperek",
            "label": "Serwis Kacperek",
        }
    ],

    "Community": [
        {
            "id": "patches",
            "label": "Patches",
        },
        {
            "id": "forum",
            "label": "Forum",
        },
        {
            "id": "blog",
            "label": "Blog",
        }
    ],
    
    "More Information": [
        {
            "id": "contact?subject=ReportProblem",
            "label": "Report a problem",
        },
        {
            "id": "contact?subject=ContactUs",
            "label": "Contact",
        },
        {
            "id": "contact?subject=SuggestFeature",
            "label": "Request a feature",
        },
    ]
}