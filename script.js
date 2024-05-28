// Define a função para obter variáveis de ambiente do servidor
async function getEnvConfig() {
    const response = await fetch('/env-config.json');
    return response.json();
}

getEnvConfig().then(config => {
    const isLocal = config.USE_LOCALSTACK === 'true';

    if (isLocal) {
        AWS.config.update({
            region: config.AWS_REGION,
            accessKeyId: 'test',  // Valores fictícios para LocalStack
            secretAccessKey: 'test'
        });
    } else {
        AWS.config.update({
            region: config.AWS_REGION,
            accessKeyId: config.AWS_ACCESS_KEY_ID,
            secretAccessKey: config.AWS_SECRET_ACCESS_KEY
        });
    }

    const s3 = new AWS.S3({
        apiVersion: '2006-03-01',
        endpoint: isLocal ? 'http://localhost:4566' : undefined,
        s3ForcePathStyle: isLocal,
        params: { Bucket: config.S3_BUCKET_NAME }
    });

    window.uploadFile = function() {
        const fileInput = document.getElementById('fileInput');
        const uploadButton = document.getElementById('uploadButton');
        const loadingText = document.getElementById('loadingText');
        const file = fileInput.files[0];

        if (!file) {
            alert('Please choose a file to upload first.');
            return;
        }

        // Mostrar o texto "Carregando..." e esconder o botão
        loadingText.style.display = 'block';
        uploadButton.style.display = 'none';

        // Gera um UUID e concatena com o nome do arquivo original
        const uuid = uuidv4();
        const fileNameWithUuid = `${uuid}-${file.name}`;

        const params = {
            Key: `video-download-from-front-end/${fileNameWithUuid}`,
            Body: file
        };

        s3.upload(params, (err, data) => {
            // Esconder o texto "Carregando..." e mostrar o botão novamente
            loadingText.style.display = 'none';
            uploadButton.style.display = 'block';

            if (err) {
                console.error('Error uploading file:', err);
                alert('Error uploading file.');
            } else {
                console.log('Successfully uploaded file.', data);
                alert('Successfully uploaded file.');
            }
        });
    }

    // Função para gerar UUID (caso não esteja disponível via CDN, você pode usar essa implementação)
    function uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (Math.random() * 16) | 0,
                v = c == 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }
});
