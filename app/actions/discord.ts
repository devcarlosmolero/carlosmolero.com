const TOKEN =
    'MTE1NDE4MTUzMjU4MDMyNzQ0NA.G42-tR.BKCBq6NYOJTyTS2owlsouPgHdRgaIWBKZ6oAeE'
const CHANNEL_ID = '1217540606684037230'
const ENDPOINT = `https://discord.com/api/v10/channels/${CHANNEL_ID}/messages`

export async function sendDiscordMessage(message: string) {
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bot ${TOKEN}`,
    }
    return fetch(ENDPOINT, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ content: message }),
    })
}
