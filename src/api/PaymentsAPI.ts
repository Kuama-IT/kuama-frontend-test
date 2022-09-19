class PaymentsApi {
    baseUrl: string;

    constructor() {
        this.baseUrl = 'http://127.0.0.1:3000/api';
    }

    getPayments(): Promise<detailsDto> {
        return new Promise((resolve, reject) => {
            fetch(this.baseUrl + '/payments')
                .then((response) => response.json())
                .then(data => { resolve(data) })
                .catch(error => {
                    reject(error);
                })
        })
    }
}

export default new PaymentsApi();