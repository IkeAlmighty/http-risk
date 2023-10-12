export default [
    {
        "territories": [
            {
                "name": "Alaska",
                "connections": ["Northwest Territory", "Kamchatka", "Alberta"]
            },
            {
                "name": "Northwest Territory",
                "connections": ["Alaska", "Alberta", "Ontario", "Greenland"]
            },
            {
                "name": "Greenland",
                "connections": ["Northwest Territory", "Quebec", "Iceland"]
            },
            {
                "name": "Alberta",
                "connections": ["Alaska", "Northwest Territory", "Ontario", "Western United States"]
            },
            {
                "name": "Ontario",
                "connections": ["Northwest Territory", "Alberta", "Quebec", "Eastern United States", "Western United States", "Eastern Canada"]
            },
            {
                "name": "Quebec",
                "connections": ["Ontario", "Eastern Canada", "Greenland"]
            },
            {
                "name": "Eastern Canada",
                "connections": ["Quebec", "Ontario", "Eastern United States"]
            },
            {
                "name": "Western United States",
                "connections": ["Alberta", "Ontario", "Eastern United States", "Central America"]
            },
            {
                "name": "Eastern United States",
                "connections": ["Ontario", "Western United States", "Central America"]
            },
            {
                "name": "Central America",
                "connections": ["Western United States", "Eastern United States", "Venezuela"]
            },
            {
                "name": "Venezuela",
                "connections": ["Central America", "Peru", "Brazil"]
            },
            {
                "name": "Peru",
                "connections": ["Venezuela", "Brazil", "Argentina"]
            },
            {
                "name": "Brazil",
                "connections": ["Venezuela", "Peru", "Argentina", "North Africa"]
            },
            {
                "name": "Argentina",
                "connections": ["Peru", "Brazil"]
            },
            {
                "name": "North Africa",
                "connections": ["Brazil", "Egypt", "East Africa", "Congo", "Western Europe", "Southern Europe"]
            },
            {
                "name": "Egypt",
                "connections": ["North Africa", "East Africa", "Middle East", "Southern Europe"]
            },
            {
                "name": "East Africa",
                "connections": ["Egypt", "North Africa", "Congo", "South Africa", "Madagascar", "Middle East"]
            },
            {
                "name": "Congo",
                "connections": ["North Africa", "East Africa", "South Africa"]
            },
            {
                "name": "South Africa",
                "connections": ["Congo", "East Africa", "Madagascar"]
            },
            {
                "name": "Madagascar",
                "connections": ["South Africa", "East Africa"]
            },
            {
                "name": "Middle East",
                "connections": ["Egypt", "East Africa", "Ukraine", "Southern Europe", "Afghanistan", "India"]
            },
            {
                "name": "Ukraine",
                "connections": ["Scandinavia", "Northern Europe", "Southern Europe", "Middle East", "Afghanistan", "Ural"]
            },
            {
                "name": "Afghanistan",
                "connections": ["Ukraine", "Ural", "China", "India", "Middle East"]
            },
            {
                "name": "Ural",
                "connections": ["Ukraine", "Siberia", "China", "Afghanistan"]
            },
            {
                "name": "Siberia",
                "connections": ["Ural", "Yakutsk", "Irkutsk", "Mongolia", "China"]
            },
            {
                "name": "Yakutsk",
                "connections": ["Siberia", "Irkutsk", "Kamchatka"]
            },
            {
                "name": "Irkutsk",
                "connections": ["Siberia", "Yakutsk", "Kamchatka", "Mongolia"]
            },
            {
                "name": "Kamchatka",
                "connections": ["Alaska", "Yakutsk", "Irkutsk", "Mongolia", "Japan"]
            },
            {
                "name": "Mongolia",
                "connections": ["Siberia", "Irkutsk", "Kamchatka", "Japan", "China"]
            },
            {
                "name": "Japan",
                "connections": ["Mongolia", "Kamchatka"]
            },
            {
                "name": "China",
                "connections": ["Ural", "Siberia", "Mongolia", "Afghanistan", "Siam", "India"]
            },
            {
                "name": "India",
                "connections": ["Middle East", "Afghanistan", "China", "Siam"]
            },
            {
                "name": "Siam",
                "connections": ["China", "India", "Indonesia"]
            },
            {
                "name": "Indonesia",
                "connections": ["Siam", "New Guinea", "Western Australia"]
            },
            {
                "name": "New Guinea",
                "connections": ["Indonesia", "Western Australia", "Eastern Australia"]
            },
            {
                "name": "Western Australia",
                "connections": ["Indonesia", "New Guinea", "Eastern Australia"]
            },
            {
                "name": "Eastern Australia",
                "connections": ["New Guinea", "Western Australia"]
            },
            {
                "name": "Great Britain",
                "connections": ["Iceland", "Scandinavia", "Northern Europe", "Western Europe"]
            },
            {
                "name": "Iceland",
                "connections": ["Greenland", "Great Britain", "Scandinavia"]
            },
            {
                "name": "Scandinavia",
                "connections": ["Iceland", "Great Britain", "Northern Europe", "Ukraine"]
            },
            {
                "name": "Northern Europe",
                "connections": ["Great Britain", "Scandinavia", "Western Europe", "Southern Europe", "Ukraine"]
            },
            {
                "name": "Western Europe",
                "connections": ["Great Britain", "Northern Europe", "Southern Europe", "North Africa"]
            },
            {
                "name": "Southern Europe",
                "connections": ["Northern Europe", "Western Europe", "North Africa", "Egypt", "Middle East", "Ukraine"]
            }
        ]
    }

]