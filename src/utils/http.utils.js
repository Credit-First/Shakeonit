export async function httpGet(url) {
    const data = await fetch(url);
    return data.json();
}