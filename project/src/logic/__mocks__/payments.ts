import payment_options from './data/payment_options.json';

const delay = (t:number) => new Promise(resolve => setTimeout(resolve, t));

async function doGetPaymentOptions():Promise<any> {
    return await delay(1000).then(() => Promise.resolve(payment_options));
}

export {
    doGetPaymentOptions,
}