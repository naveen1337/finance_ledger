// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import knex from "knex"
import dbConnection from '../../../config/db_config'
import Ajv from "ajv"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    let connection: any = null
    try {
        const ajv = new Ajv()

        if (req.method !== 'POST') {
            return res.status(405).send({ message: 'Only POST requests allowed' })
        }
        const valid = ajv.validate(schema, req.body)
        if (!valid) {
            return res.status(400).json({ success: true, msg: ajv?.errors?.[0]?.message})
        }
        const connection = await dbConnection.connect()
        const result = await connection.query('SELECT * from app_control')
        //   let connection = await dbConnection.getConnection();
        connection.release()
        return res.status(200).json({ success: true, data: result.rows })
    }
    catch (err) {
        connection?.release()
        console.log(err)
        return res.status(500).json({ status: false, msg: "exception" })
    }
}


const schema = {
    type: "object",
    properties: {
        amount: { type: "integer" },
        from_reserve: { type: "boolean" },
        via: { type: "string" },
        t_id: { type: "string" }
    },
    required: ["amount", "from_reserve", "via"],
    additionalProperties: false
}
