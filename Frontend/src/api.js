export const sendPostRequest = () => {
    const payload = {
        base64: "aGVsbG8gd29ybGQ=", // "hello world" em Base64
        uuid: "123e4567-e89b-12d3-a456-426614174000"
    };

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    };

    const apiUrl = 'https://f3ab9269-e495-4e9f-92ed-48c02a09974c-00-2jqb9bh52d3bj.worf.replit.dev/upload';

    fetch(apiUrl, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
};
