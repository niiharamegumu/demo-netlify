const thanksArgs = require("../data/thanksArgs.js");

exports.handler = async (event, context) => {
    if ("id" in event["queryStringParameters"]) {
        let id = Number(event["queryStringParameters"]["id"]);
        try {
            let thank = await findThank(id);
            console.log(JSON.stringify(thank))
            return {
                statusCode: 200,
                body: JSON.stringify(thank)
            };
        }catch (e){
            return {
                statusCode: 404,
                body: JSON.stringify({
                    statusCode: 404,
                    message: "Not Found."
                })
            }
        }
    }
    return {
        statusCode: 400,
        body: JSON.stringify({
            statusCode: 400,
            message: "Bad Request."
        })
    }
};

function findThank (id) {
    let thank = thanksArgs.find(item =>item.id === id);
    if ( thank === undefined ) {
        throw new Error
    }
    return thank;
}
