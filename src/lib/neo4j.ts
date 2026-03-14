import neo4j, { Driver } from "neo4j-driver"

declare global {
  var neo4jDriver: Driver | undefined
}

const PASSWORD = process.env.NEO4J_PASSWORD as string
const URI = process.env.NEO4J_URI as string
const USER = process.env.NEO4J_USERNAME as string

export const getDriver = (): Driver => {
  if (!global.neo4jDriver) {
    global.neo4jDriver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD))
  }
  return global.neo4jDriver
}
