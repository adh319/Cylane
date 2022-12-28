module.exports = {
  name: "loop",
  run: async (client, json, ws) => {
    const player = client.manager.players.get(json.guild)
    
    if (!player) return ws.send(JSON.stringify({ error: "0x100", message: "No player on this guild" }))

    if (player.loop === "queue") {

      await player.setLoop("none")

      ws.send(JSON.stringify({ guild: player.guildId, op: 9 }))
      return client.logger.info(`Unlooped player via websockets @ ${json.guild}`)
    } else if (player.loop === "none") {

      await player.setLoop("queue")

      ws.send(JSON.stringify({ guild: player.guildId, op: 8 }))
      client.logger.info(`Looped player via websockets @ ${json.guild}`)
    }
  }
}