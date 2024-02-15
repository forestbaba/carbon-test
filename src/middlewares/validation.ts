import { object, string  } from 'yup';


export const validateLogin = object({
    body: object({
        password: string().required({ error: true, message: 'password is required' }).min(6, { error: true, message: "password is too short - should be 6 characters minimum" }),
        email: string().email({ error: true, message: "must be a valid email" }).required({ error: true, message: "email is required" }),
    }),
})
export const validateSignup = object({
    body: object({
        name: string().required({ error: true, message: 'name is required' }).min(3, { error: true, message: "name is too short - should be 3 characters minimum" }),
        password: string().required({ error: true, message: 'password is required' }).min(6, { error: true, message: "password is too short - should be 6 characters minimum" }),
        email: string().email({ error: true, message: "must be a valid email" }).required({ error: true, message: "email is required" }),
    }),
})

export const validateCreateInventory = object({
    body: object({
        name: string().required({ error: true, message: 'name is required' }).min(3, { error: true, message: "name is too short - should be 3 characters minimum" }),
    }),
})
export const validateChangeStatus =  object({
    body:  object({
        status: string().oneOf(['picked_up', 'in_transit', 'warehouse', 'delivered']).required({ error: true, message: 'status field is required' })
    }),
})