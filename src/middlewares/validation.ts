import { object, string, bool, ref, number, array } from 'yup';


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
export const validateRegisterBusiness = object({
    body: object({
        name: string().required({ error: true, message: 'name is required' }).min(3, { error: true, message: "name is too short - should be 3 characters minimum" }),
        owner_id: number().required({ error: true, message: 'owner id is required' })
    }),
})
export const validateCreateDepartment = object({
    body: object({
        name: string().required({ error: true, message: 'name is required' }).min(3, { error: true, message: "name is too short - should be 3 characters minimum" }),
    }),
})
export const validateCreateDepartmentHead = object({
    body: object({
        name: string().required({ error: true, message: 'name is required' }).min(3, { error: true, message: "name is too short - should be 3 characters minimum" }),
        password: string().required({ error: true, message: 'password is required' }).min(6, { error: true, message: "password is too short - should be 6 characters minimum" }),
        department_id: number().required({ error: true, message: 'department_id is required' }),
        email: string().email({ error: true, message: "must be a valid email" }).required({ error: true, message: "email is required" }),
    }),
})
export const validateCreateInventory = object({
    body: object({
        name: string().required({ error: true, message: 'name is required' }).min(3, { error: true, message: "name is too short - should be 3 characters minimum" }),
        price: number().required({ error: true, message: 'price is required' }),
        quantity: number().required({ error: true, message: 'quantity is required' }),
        department_id: number().required({ error: true, message: 'department_id is required' }),
    }),
})
export const validateCreateOrder = object({
    body: object({
        business_id: number().required({ error: true, message: 'business_id is required' }),
        department_id: number().required({ error: true, message: 'department_id is required' }),
        order_items: array()
            .of(object().shape({ item_id: number(), quantuty: number() }))
            .compact((v) => !v.checked)
            .required('Order item is required')
    }),
})