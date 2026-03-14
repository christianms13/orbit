"use server"

import { getDriver } from "@/lib/neo4j"

interface Neo4jNode {
  labels: string[]
  properties: Record<string, unknown>
}

export async function findShortestPath(actor1Name: string, actor2Name: string) {
  const driver = getDriver()
  const session = driver.session()

  try {
    const query = `
      MATCH (start:Actor {name: $actor1Name})
      MATCH (end:Actor {name: $actor2Name})
      MATCH p = shortestPath((start)-[:ACTED_IN*1..6]-(end))
      RETURN nodes(p) AS pathNodes
    `

    const result = await session.executeRead((tx) =>
      tx.run(query, { actor1Name, actor2Name })
    )

    if (result.records.length === 0) {
      return { message: "❌ no connection found between these actors", success: false }
    }

    const rawNodes = result.records[0].get("pathNodes")
    const path = rawNodes.map((node: Neo4jNode) => ({
      type: node.labels[0],
      ...node.properties
    }))

    return { path, success: true }

  } catch (e) {
    console.error("❌ pathfinding error:", e)
    return { message: "❌ failed to calculate path", success: false }
  } finally {
    await session.close()
  }
}
