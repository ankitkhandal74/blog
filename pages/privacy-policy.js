// pages/privacy.js

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
    return (
        <div>
            <Header />
            <div className="max-w-3xl mx-auto p-5 bg-white rounded-lg">
                <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
                <p className="mb-4">Last updated: [Date]</p>

                <h2 className="text-2xl font-semibold mb-2">Introduction</h2>
                <p className="mb-4">
                    We are committed to protecting your privacy. This privacy policy explains how we collect, use, and share information about you when you use our services.
                </p>

                <h2 className="text-2xl font-semibold mb-2">Information We Collect</h2>
                <p className="mb-4">
                    We may collect the following types of information:
                </p>
                <ul className="list-disc pl-5 mb-4">
                    <li>
                        <strong>Personal Information:</strong> Name, email address, phone number, and any other information you provide.
                    </li>
                    <li>
                        <strong>Usage Data:</strong> Information about how you access and use our services, including IP address, browser type, pages visited, and time spent on pages.
                    </li>
                    <li>
                        <strong>Cookies:</strong> Small data files placed on your device that help us improve your experience on our site. You can control cookie preferences through your browser settings.
                    </li>
                </ul>

                <h2 className="text-2xl font-semibold mb-2">How We Use Your Information</h2>
                <p className="mb-4">
                    We use your information to:
                </p>
                <ul className="list-disc pl-5 mb-4">
                    <li>Provide and maintain our services.</li>
                    <li>Notify you about changes to our services.</li>
                    <li>Monitor the usage of our services to improve user experience.</li>
                    <li>Communicate with you, including customer support and marketing.</li>
                    <li>Analyze data to enhance our offerings and user engagement.</li>
                </ul>

                <h2 className="text-2xl font-semibold mb-2">Sharing Your Information</h2>
                <p className="mb-4">
                    We may share your information in the following situations:
                </p>
                <ul className="list-disc pl-5 mb-4">
                    <li>With service providers to facilitate our services (e.g., payment processors, analytics providers).</li>
                    <li>With your consent, such as when you opt to share your data with third-party services.</li>
                    <li>For legal reasons, if required by law or to protect our rights.</li>
                    <li>In connection with a business transfer, such as a merger or acquisition.</li>
                </ul>

                <h2 className="text-2xl font-semibold mb-2">Your Rights</h2>
                <p className="mb-4">
                    Depending on your location, you may have the following rights:
                </p>
                <ul className="list-disc pl-5 mb-4">
                    <li>Access: Request a copy of the personal data we hold about you.</li>
                    <li>Correction: Request correction of inaccurate or incomplete data.</li>
                    <li>Deletion: Request deletion of your personal data under certain circumstances.</li>
                    <li>Objection: Object to the processing of your personal data in certain situations.</li>
                    <li>Data Portability: Request transfer of your personal data to another service provider.</li>
                </ul>

                <h2 className="text-2xl font-semibold mb-2">Data Security</h2>
                <p className="mb-4">
                    We take reasonable measures to protect your information from loss, theft, and misuse. However, no method of transmission over the internet or method of electronic storage is 100% secure. Therefore, while we strive to protect your personal information, we cannot guarantee its absolute security.
                </p>

                <h2 className="text-2xl font-semibold mb-2">Third-Party Links</h2>
                <p className="mb-4">
                    Our services may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to read the privacy policies of any linked websites you visit.
                </p>

                <h2 className="text-2xl font-semibold mb-2">Children's Privacy</h2>
                <p className="mb-4">
                    Our services are not intended for children under the age of 13. We do not knowingly collect personal data from children. If you believe we have collected information from a child, please contact us, and we will take steps to delete such information.
                </p>

                <h2 className="text-2xl font-semibold mb-2">Changes to This Privacy Policy</h2>
                <p className="mb-4">
                    We may update our privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page with a new effective date. You are advised to review this privacy policy periodically for any changes.
                </p>

                <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
                <p className="mb-4">
                    If you have any questions about this privacy policy, please contact us at:
                </p>
            </div>
            <Footer />
        </div>
    );
}
