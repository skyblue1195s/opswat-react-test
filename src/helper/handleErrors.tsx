export const handleErrors = (errors: any) => {
    const errorsValue = Object.keys(errors).map(key => errors[key])
    return errorsValue
}