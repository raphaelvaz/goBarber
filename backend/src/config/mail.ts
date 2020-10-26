interface IMailConfig {
    driver: 'ethereal' | 'ses';

    defaults: {
        from: {
            email: string;
            name: string;
        }
    }
}

export default {
    driver: process.env.MAIL_DRIVER || 'ethereal',
    defaults: {
        from: {
            email: 'seuemailadressconfigurado@eu.com.br',
            name: 'exemplo',
        },
    }
} as IMailConfig;
