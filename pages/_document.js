import { Html, Head, Main, NextScript } from 'next/document';

export default function MyDocument() {
    return (
        <Html lang="en">
            <Head>
                <meta name="msvalidate.01" content="0BEA33B18438C0D3F33F305591BD5F33" />
                <meta name="google-site-verification" content="T6GVfzU1r-LutM3nsjLXK_1nAHD3XbcBQU_0hw6Gjl4" />
                <meta charSet="UTF-8" />
                <meta name="description" content="Next.js Application Documentation" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Karla:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet" />


                {/* Favicon (Logo) */}
                <link rel="icon" href="/logo2.png" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
