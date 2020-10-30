import dotenv from "dotenv"
import axios, { AxiosRequestConfig } from "axios"
import jwksClient from 'jwks-rsa'
import jwt, { Algorithm } from 'jsonwebtoken'
import jwtAuthz from 'express-jwt-authz'

dotenv.config()

const body = {
    client_id: process.env.AUTH0_CLIENT_ID,
    client_secret: process.env.AUTH0_SECRET,
    audience: process.env.AUTH0_AUDIENCE,
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

const client = jwksClient({
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
});

const getKey = (header: any, cb: any) => {
    client.getSigningKey(header.kid, (err, key: jwksClient.SigningKey) => {
        const signingKey = (key as jwksClient.CertSigningKey).publicKey || (key as jwksClient.RsaSigningKey).rsaPublicKey;
        cb(null, signingKey);
    });
}

export const isTokenValid = async (token: string) => {
    if (token) {
        const bearerToken = token.split(" ")

        const result = new Promise((resolve, reject) => {
            jwt.verify(
                bearerToken[1],
                getKey,
                {
                    issuer: `https://${process.env.AUTH0_DOMAIN}/`,
                    algorithms: ["RS256"]
                },
                (error, decoded) => {
                    if (error) {
                        resolve({ error })
                    }
                    if (decoded) {
                        resolve(decoded)
                    }
                }
            )
        })

        return result
    }

    return { error: 'No Token provided' }
}

const checkScopes = (scopes: string[]) => jwtAuthz(scopes)