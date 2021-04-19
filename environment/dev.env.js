exports.devEnvironment = () => {

    const keys = {
        db_root: "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false",
        db_pass: "8555",
        jwt_secret: "vinay"
    }
    return keys
}