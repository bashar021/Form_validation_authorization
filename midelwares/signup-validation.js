
function signup_validation (req, res, next) {
    // console.log('this is signup validation')
    // console.log(req.body)
    next()
}
module.exports = signup_validation;

// will follow to all the requests comming to the routes
// router.use((req, res, next) => {
//     console.log('Time:', Date.now())
//     console.log('router based middleware is working')
//     next()
// })

// specific request midleware 
// router.use("/login",(req, res, next) => {
//     console.log('Time:', Date.now())
//     console.log('router based middleware is working')
//     next()
// })

// function based midleware 
// function logMethod (req, res, next) {
//     console.log('Request Type:', req.method)
//     next()
// }