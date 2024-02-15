import { AnySchema } from 'yup';
import { Request, Response, NextFunction } from 'express';

const validate = (schema: AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.validate({
            body: req.body,
            query: req.query,
            params: req.params
        });
        return next();
    } catch (error) {
        return res.status(400).send(error);
    }
}

export default validate