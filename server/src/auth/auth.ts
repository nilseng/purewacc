import dotenv from "dotenv"
import axios, { AxiosRequestConfig } from "axios"
import jwt from "express-jwt";
import jwksRsa from "jwks-rsa"
import jwtAuthz from "express-jwt-authz"

dotenv.config()

export const checkJwt = jwt({
    // Dynamically provide a signing key
    // based on the kid in the header and 
    // the signing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
    }),
    audience: process.env.AUTH0_AUDIENCE,
    issuer: `https://${process.env.AUTH0_DOMAIN}`,
    algorithms: ['RS256']
});

export const checkAdminScope = jwtAuthz(['admin'])

const body = {
    client_id: process.env.AUTH0_CLIENT_ID,
    client_secret: process.env.AUTH0_SECRET,
    audience: process.env.AUTH0_MGMT_API_AUDIENCE,
    grant_type: 'client_credentials'
}

const options: AxiosRequestConfig = {
    method: 'POST',
    url: process.env.AUTH0_TOKEN_URI || "",
    headers: { 'content-type': 'application/json' },
    data: body
};

export const getManagementApiToken = async () => {
    try {
        const res = await axios(options)
        return res
    }
    catch (err) {
        console.error(err)
        return
    }
}