exports.prodEnvironment = () => {

    const keys = {
        db_root: "mongodb+srv://root:8555@cluster0.rqrol.mongodb.net/user",
        db_pass: "8555",
        jwt_secret: "vinay"
    }
    return keys
}