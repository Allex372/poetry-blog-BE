module.exports = {
    DATA_OF_YEAR: new Date().getFullYear(),
    USER: 'User',
    O_Auth: 'O_Auth',
    AUTHORIZATION: 'Authorization',
    Products: 'Products',

    UserAccess: 'user',
    AdminAccess: 'admin',

    AdminMail: 'alexalex372.aa@gmail.com',

    PHOTO_MAX_SIZE: 10 * 1024 * 1024, // 2MB
    FILE_MAX_SIZE: 5 * 1024 * 1024, // 5MB
    PHOTOS_MIMETYPES: [
        'image/gif',
        'image/jpeg',
        'image/pjpeg',
        'image/png',
        'image/tiff',
        'image/webp'
    ],

    DOCS_MIMETYPES: [
        'application/msword', // DOC
        'application/pdf', // PDF
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // XLS
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // DOC 2007
    ],

    VIDEOS_MIMETYPES: [
        'video/mpeg',
        'video/mp4',
    ]
};
