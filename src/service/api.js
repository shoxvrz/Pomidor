import axios from 'axios';

const BASE_URL = `https://api.telegram.org/bot${import.meta.env.VITE_TGBOT_TOKEN}/sendMessage`;

const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": 'application/json'
    }
});

export const sendTgMessage = async (orderData) => {
    const message = `
        *Buyurtma Ma'lumotlari*
        Ismi: ${orderData.name}
        Familiyasi: ${orderData.surname}
        Email: ${orderData.email}
        Ko'chasi: ${orderData.street}
        Shahar: ${orderData.city}
        Tuman: ${orderData.tuman}
        Postkod: ${orderData.postcode}
        Davlat: ${orderData.country}
        Tel Nomer: ${orderData.telNomer}
        Narxi: ${orderData.price.toFixed(0)}.000 so'm
        Buyurtma qilingan taomlar: ${orderData.items.map(item => `${item.name} (${item.quantity})`).join(', ')}
    `;

    await instance.post("", {
        chat_id: import.meta.env.VITE_CHAT_ID,
        text: message,
        parse_mode: 'Markdown'
    });
};
