import jwt from 'jsonwebtoken'

// doctor authentication middleware
const authWorker = async (req, res, next) => {
    const { wtoken } = req.headers
    if (!wtoken) {
        return res.json({ success: false, message: 'Not Authorized Login Again' })
    }
    try {
        const token_decode = jwt.verify(wtoken, process.env.JWT_SECRET)
        req.body.workerId = token_decode.id
        next()
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export default authWorker; 