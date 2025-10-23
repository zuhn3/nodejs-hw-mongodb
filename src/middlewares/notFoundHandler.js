import createHttpError from "http-errors"
export async function notFoundHandler(req, res, next) {

    if(req.status == 404){
        next(createHttpError(404, "Route not found"))
    }

}