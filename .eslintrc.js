module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "plugin:react/recommended",
        "prettier"
    ],
    "parserOptions": {
        // "ecmaFeatures": {
        //     "jsx": true,
        // },
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        // "semi":["off", "always"],
        // "quotes":["error", "double"],
        "react/prop-types": "off",
        "exclude": "/node_modules/",
    },
    "settings":{
        "react":{
            "version":"detect",
        }
    }
}
