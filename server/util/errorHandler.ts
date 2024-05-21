
import { NextFunction, Request, Response } from "express";

export const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error('errorhandler: ', err);
    res.status(500).send({ errors: [{ message: "Something went wrong" }] });
};