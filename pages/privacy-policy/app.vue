<template>
  <div class="prose max-w-none text-sm">
    <h2 class="text-lg font-semibold mb-3">1. Privacy Policy</h2>
    <p>
      Thank you for your interest in this Privacy Policy, and welcome to TicDrive our iOS and Android mobile application
      (our "App"). This policy is intended to inform the users of our App about the nature, scope, and purpose of the
      collection and use of personal data by us.
    </p>

    <div v-for="(section, index) in privacyPolicySections" :key="index">
      <h2 class="text-lg font-semibold mb-3 mt-5">{{ section.title }}</h2>
      <div v-html="section.content"></div>
    </div>

    <h2 class="text-lg font-semibold mb-3 mt-8">2. Terms of Use</h2>
    <div v-for="(section, index) in termsOfUseSections" :key="index">
      <h2 class="text-lg font-semibold mb-3 mt-5">{{ section.title }}</h2>
      <div v-html="section.content"></div>
    </div>

    <h2 class="text-lg font-semibold mb-3 mt-8">3. End-User License Agreement (EULA)</h2>
    <div v-for="(section, index) in eulaSections" :key="index">
      <h2 class="text-lg font-semibold mb-3 mt-5">{{ section.title }}</h2>
      <div v-html="section.content"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'privacy-policy',
});

const privacyPolicySections = [
  {
    title: 'WHO IS THE DATA CONTROLLER?',
    content: `A "data controller" is a person or organization who alone or jointly determines the purposes for which and the manner in which any personal data is, or is likely to be, processed. In this sense, TicDrive of Via Leonardo da Vinci, 12b. 35133 Padova PD, Italy ("TicDrive", "we", "us", or "our") is the data controller. If you have any questions about this policy or about data protection at TicDrive in general, please email us using mariancompany07@gmail.com.`
  },
  {
    title: 'WHAT IS PERSONAL DATA?',
    content: 'Personal Data is information that makes it possible to identify a natural person. This includes, in particular, your name, date of birth, address, telephone number, and e-mail address, but also your IP address. Anonymous data exists if no personal reference to the user can be made.'
  },
  {
    title: 'WHAT IS PROCESSING?',
    content: '"Processing" means and covers virtually any handling of data.'
  },
  {
    title: 'WHAT LAW APPLIES?',
    content: 'We will only use your Personal Data in accordance with Italy\'s Data Protection Code Legislative Decree no. 101 ("DPC"), the EU\'s General Data Protection Regulation ("GDPR"), and, of course, only as described in this Privacy Policy.'
  },
  {
    title: 'WHAT ARE THE LEGAL BASES FOR PROCESSING YOUR DATA?',
    content: 'We have to have at least one of the following legal bases to process your Personal Data: a) you have given your consent; b) the data is necessary for the fulfillment of a contract/pre-contractual measures; c) the data is necessary for the fulfillment of a legal obligation; or d) the data is necessary to protect our legitimate interests, provided that your interests are not overridden.'
  },
  {
    title: 'WHAT PERSONAL DATA DO WE COLLECT FROM YOU?',
    content:
      `<p>We may collect and process the following Personal Data about you:</p>

<p class="font-semibold mt-3">a) Personal Data that you give us:</p>

<p>This is information about you that you give to us. It may include, for example, your name, email address, and phone number when you contact us. The legal basis is the initiation of a contract with you and your consent.</p>

<p>We also process the Personal Data when you create an account in order to be able to provide you access to our Services. The Data you submit typically includes your name, email address, phone number, password, and your vehicle details. The legal basis is the initiation of a contract with you and your consent.</p>

<p>We may collect and process information about your location (from your address) and the time the location information is recorded to provide the services with location-based information and features. Some of these services require your Personal Data for the feature to work, and we may associate location data with your device ID, IP address, and/or other information we hold about you.</p>

<p>As a registered user, you have the opportunity to create a user profile with just a few clicks and details, and the relevant profile data you provide will be posted on your profile. Of course, you can change or remove the information or delete your profile at any time via the settings in your profile. You have choices about the information on your profile. Please do not post or add Personal Data to your profile that you would not want to be available. The legal basis for the processing of your Personal Data is the establishment and implementation of the user contract for the use of our Services.</p>

<p>If you wish to use our App and its features, we process the Personal Data and Content you voluntarily provide for the purpose of providing your App. Depending on how you use our App, you may provide content such as text, images, video, etc. and upload Personal Data.</p>

<p>While we need certain Personal Data to allow you to use our App, your Personal Data is never shared without a lawful reason. However, Content uploaded by you will be made available and may be viewed and otherwise accessed by others. In turn, we may process:</p>

<ul class="list-disc pl-6 mt-2 mb-2">
  <li><span class="font-medium">Content Data.</span> Content Data includes photos, text and content, reviews, videos, messages, or other digital content you create, broadcast, perform, or upload on our App and information about the content you create, broadcast, perform, or upload, including metadata that is provided with that Content.</li>
  <li><span class="font-medium">Images and facial-related information.</span> In providing our App we may also process images and facial-related information from you. Images are used and processed solely for the purpose explicitly consented to, and we do not collect, use, or store any images and facial-related information for other purposes.</li>
  <li><span class="font-medium">Chats and communications.</span> Of course, we also process your chats and communications with workshops, as well as the content you may provide to others through our App as you interact with them.</li>
  <li><span class="font-medium">Use of our App.</span> We also collect information about your vehicle and activities on our App, such as your requirements and notes you attach to bookings, availability, booking details, booking dates, etc.; how you use our App and how you interact with our workshops.</li>
  <li><span class="font-medium">Support ticket.</span> If you create a support ticket, we will request Personal Data in accordance with your request; this may include your name, email address, and other booking-related data you voluntarily provide. If you submit a support ticket, we process the data for the purpose of processing and handling your ticket. Our employees will also have access to data that you knowingly share with us for technical support or to import data into our services. We communicate our privacy and security guidelines to our employees and enforce privacy safeguards strictly. The legal basis of the data processing is our obligation to fulfil the contract and/or our legitimate interest in processing your support ticket.</li>
  <li><span class="font-medium">Third-party information.</span> If you are providing us with Personal Data relating to a third party, you agree a) that you have in place all necessary appropriate consents and b) that such third party has read this Privacy Policy. You agree to indemnify us in relation to all and any liabilities, penalties, fines, awards, or costs arising from your non-compliance with these requirements.</li>
</ul>

<p>Finally, we use content or service offers of third-party providers on the basis of our legitimate interest to integrate their content and services. The following provides an overview of third-party providers together with links to their privacy policies, which contain further information on the processing of data and so-called opt-out measures, if any:</p>

<ul class="list-disc pl-6 mt-2 mb-2">
  <li>Payment and Subscription Services: <a href="https://stripe.com/en-gb-gr/privacy" class="text-blue-600 hover:underline">Stripe</a> (we have no access to any payment information you submit to Stripe).</li>
  <li>Maps and Location services via places: <a href="https://policies.google.com/privacy?hl=en-US" class="text-blue-600 hover:underline">Google</a></li>
  <li>Data Storage: <a href="https://railway.com/legal/privacy" class="text-blue-600 hover:underline">Railway</a></li>
  <li>Media Storage: <a href="https://privacy.microsoft.com/en-GB/data-privacy-notice" class="text-blue-600 hover:underline">Azure</a> (Microsoft)</li>
</ul>

<p>The legal basis for providing the above is the fulfillment of the user contract for the use of the App as well as your consent.</p>

<p>We also collect, use, and share aggregated data, such as statistical or demographic data, for any purpose, including improving our App and services. Aggregated data could be derived from your Personal Data but is not considered Personal Data in law as this data will not directly or indirectly reveal your identity. However, if we combine or connect aggregated data with your Personal Data so that it can directly or indirectly identify you, we treat the combined data as Personal Data which will be used in accordance with this Privacy Policy.</p>

<p>We process data in the context of administrative tasks as well as organisation of our data, business, and compliance with legal obligations, such as archiving. In this regard, we process the same data that we process in the course of providing our contractual services. The processing bases are our legal obligations and our legitimate interest.</p>

<p>Lastly, we use your data (name and email) within the legally permissible scope for marketing purposes, e.g., to draw your attention to special promotions and discount offers. In addition, we may draw your attention to comparable offers by email, e.g., we may inform you about exclusive promotions or special events. The legal basis for processing is our legitimate interest.</p>

<p class="font-semibold mt-4">b) Personal Data that our App collects about you:</p>

<p>The App can be downloaded from the "Google Playstore'' a service offered by <a href="https://policies.google.com/privacy?hl=en-US" class="text-blue-600 hover:underline">Google LLC</a>, or the Apple App service "App Store" a service of <a href="https://www.apple.com/legal/privacy/en-ww/" class="text-blue-600 hover:underline">Apple Inc</a>., to install our App. Downloading it may require prior registration with the respective App store and/or installation of the respective App store software.</p>

<p>As far as we are aware, Google collects and processes the following data: license check, network access, network connection, WLAN connections, and location information. However, it cannot be ruled out that Google also transmits the information to a server in a third country. We cannot influence which Personal Data Google processes with your registration and the provision of downloads in the respective App store and App store software. The responsible party in this respect is solely Google as the operator of the Google Play Store.</p>

<p>As far as we are aware, Apple collects and processes the following data: device identifiers, IP addresses, and location information. It cannot be excluded that Apple also transmits the information to a server in a third country. We cannot influence which Personal Data Apple processes with your registration and the provision of downloads in the respective app store and app store software. The responsible party in this respect is solely Apple as the operator of the Apple App Store.</p>

<p>Google and Apple may collect information from and about the device(s) you use to access our App, including hardware and software information such as IP address, device ID and type, device-specific and App settings and properties, App crashes, advertising IDs (AAID), information about your wireless and mobile network connection, such as your service provider and signal strength, and information about device sensors such as accelerometer, gyroscope, and compass.</p>

<p>We may request permission to store your App data including your Internet Connection and Network, Push Notifications, Gallery, Camera and Location. The legal basis for data processing is our legitimate interest, the provision of contractual or pre-contractual measures, and your consent. You can deny access on your device via the Settings/Notifications/ options of your device; however, this means that our App may not function as intended.</p>

<p>When you use one of our location-enabled services, we may collect and process information about your location (latitude and longitude) and the time the location information is recorded to provide the services with location-based information and features. Some of these services require your Personal Data for the feature to work, and we may associate location data with your device ID and other information we hold about you. We keep this data for no longer than is reasonably necessary for providing services to you. If you wish to use the particular feature, you will be asked to consent to your data being used for this purpose. You can withdraw your consent at any time by disabling the GPS or other location-tracking functions on your device, provided your device allows you to do this. See your device manufacturer's instructions for further details.</p>

<p>We use the Google <a href="https://firebase.google.com/support/privacy" class="text-blue-600 hover:underline">Firebase</a> developer App and related features and services provided by Google. We use the following Google Firebase services in our App: a) Firebase Analytics, b) Firebase Crashlytics, c) Firebase Firestore for cloud storage, d) Firebase Authentication, d) <a href="https://firebase.google.com/support/privacy" class="text-blue-600 hover:underline">Firebase</a> Cloud Messaging for Push Notifications. By integrating Google services, Google may collect and process information (including personal data). It cannot be excluded that Google also transfers the information to a server in a third country. We cannot influence which data Google collects and processes. Firebase's key security and privacy information can be found here: <a href="https://firebase.google.com/support/privacy" class="text-blue-600 hover:underline">https://firebase.google.com/support/privacy</a> The legal basis is the implementation of the user contract for the use of the App.</p>

<p>We use Sentry.io a cloud-based analytics service of <a href="https://sentry.io/privacy/?original_referrer=https%3A%2F%2Fwww.google.com%2F&utm_content=g&utm_id=%7Bcampaignid_Google_Search_Brand_EMEA_Alpha%7D&utm_medium=cpc&utm_source=google&utm_term=sentry" class="text-blue-600 hover:underline">Functional Software, Inc</a> that monitors the stability of web, mobile and server applications. Programme errors are reported by Sentry.io and can be analysed. By integrating Sentry.io, Functional Software, Inc may collect and process information (including personal data). It cannot be excluded that Functional Software, Inc also transfers the information to a server in a third country. We cannot influence which data Sentry.io collects and processes.</p>

<p>When you use our App, you will receive so-called push messages from us, even if you are not currently using our App. These are messages that we send you as part of the performance of the contract using <a href="https://firebase.google.com/support/privacy" class="text-blue-600 hover:underline">Firebase</a> Cloud Messaging for Push Notifications for Android devices and the <a href="https://www.apple.com/legal/privacy/en-ww/" class="text-blue-600 hover:underline">Apple</a> Push Notification service (APNs) for iOS devices. You can adjust or stop receiving push messages at any time via a) the device settings of your device or b) or by enabling or disabling specific types of notifications within the App. Insofar as you consent to the use of push messages, consent is the legal basis for the processing.</p>

<p>Our App uses the web analytics service Google Analytics for Firebase, which uses tracking technologies to track your use of our App. In this respect, information is generated about, among other things, the number of users and their sessions, the session duration, the operating system used by the users, their device model, the region from which our App is accessed, the first start of our App, our App execution and any updates.</p>

<p>In order to provide the relevant data for analysis, Firebase Analytics uses your a) device's advertising ID, b) an App instance ID (a randomly generated number that identifies a single app installation), c) and the IP address, which is shortened (IP masking) before being processed on Google's servers (which may be located outside the EEA) to generate the usage analysis. You can object to the use of Firebase Analytics at any time by disabling the sending of usage statistics in your device settings (Reset Advertising ID). We have no influence on these data processing operations. The basis for processing is our legitimate interest and your consent.</p>`
  },

  {
    title: 'OTHER USE OF YOUR PERSONAL DATA',
    content: `<p>We may also collect, store, and use your Personal Data for the following purposes:</p>

    <ul class="list-disc pl-6 mt-2 mb-2">
      <li>to operate, manage, develop, and promote our business and, in particular, our relationship with you and related transactions, including, for example:
        <ul class="list-disc pl-6 mt-1 mb-1">
          <li>marketing purposes (when we have either gathered prior opt-in consent and/or have a legitimate interest to send you communications which we believe to be relevant and of use to you);</li>
          <li>to operate, administer, and improve our App and other aspects of the way in which we conduct our business;</li>
          <li>to offer you our App and services;</li>
          <li>to provide you with services or information that you may have requested; and</li>
          <li>to keep you informed and updated on relevant topics or services you may be interested in.</li>
        </ul>
      </li>
      <li>to protect our business from fraud, money laundering, breach of confidence, theft of proprietary materials, and other financial or business crimes;</li>
      <li>to comply with our legal and regulatory obligations, bring and defend legal claims and assert legal rights; and</li>
      <li>if the purpose is directly connected with an assigned purpose previously made known to you.</li>
    </ul>

    <p>We will only process your Personal Data as necessary so that we can pursue the purposes described above and where we have a legal basis for such processing. Where our lawful basis for processing is that such processing is necessary to pursue our legitimate interests, we will only process your Personal Data where we have concluded that our processing does not prejudice you or your privacy in a way that would override our legitimate interest. In exceptional circumstances, we may also be required by law to disclose or otherwise process your Personal Data.</p>`
  },


  {
    title: 'CHANGE OF PURPOSE',
    content: `<p>We will only use your Personal Data for the purposes for which we collected it as detailed above, unless we reasonably consider that we need to use it for another reason and that reason is compatible with the original purpose. If we need to use your Personal Data for an unrelated purpose, we will notify you, and we will explain the legal basis which allows us to do so.</p>`
  },
  {
    title: 'STORAGE AND RETENTION',
    content: `<p>Your personal data will remain with us in a PostgreSQL database hosted on a Railway.com instance until the purpose for processing the data no longer applies. If you assert a justified request for deletion or revoke your consent to data processing, your data will be deleted unless we have other legally permissible reasons for storing your personal data (e.g., retention periods under tax or commercial law); in the latter case, the data will be deleted once these reasons no longer apply.</p>`
  },
  {
    title: 'WHEN DO WE DISCLOSE YOUR PERSONAL DATA?',
    content: `<p>We may share your information with organisations that help us provide the services described in this policy and who may process such data on our behalf and in accordance with this policy to support our App and our services. If you wish to learn more about how the relevant provider processes your personal data, please follow the links embedded in the above-mentioned provider's name.</p>

    <p>Typically, and unless otherwise stated in this policy, data may be shared on the basis of our contractual and pre-contractual obligations. Equally, if you have consented to it, or where we have a legal obligation to do so on the basis of our legitimate interests (e.g., when using agents, hosting providers, tax, business and legal advisors, accounting, and similar services that allow us to perform our contractual obligations, administrative tasks, and duties efficiently and effectively). If we commission third parties to process data on the basis of a so-called "processing agreement".</p>

    <p>We may also disclose information in other circumstances, such as when you agree to it or if the law, a court order, a legal obligation, or a regulatory authority asks us to. If the purpose is the prevention of fraud or crime or if it is necessary to protect and defend our rights, property, or personal safety of our staff, the App and its users.</p>`
  },
  {
    title: 'HOW WE SECURE YOUR PERSONAL DATA',
    content: `<p>Our App uses SSL or TLS encryption to ensure the security of data processing and to protect the transmission of confidential content, such as login data or contact requests that you send to us. We have also implemented numerous security measures ("technical and organizational measures"), for example, encryption or need-to-know access, to ensure the most complete protection of Personal Data processed through our App.</p>`
  },
];






const termsOfUseSections = [
  {
    title: '1. GENERAL TERMS',
    content: `<p>1.1. We may change these Terms from time to time and shall notify you accordingly if we do. If you do not agree to such terms, you must not use our App.</p>
    <p>1.2. We reserve the right to change, modify, suspend, or discontinue any portion of our App and/or other software, or content provided by us in connection with our App at any time.</p>
    <p>1.3. You agree that access to or operation of our App may from time to time be interrupted or encounter technical difficulties.</p>`
  },
  {
    title: '2. LICENSE GRANT',
    content: `<p>2.1. So long as you comply with these Terms, our End User Licence Agreement ("EULA") and our Privacy Policy, we grant you a non-transferable, non-exclusive licence to use our App as set out in our EULA.</p>
    <p>2.2. We and our licensors reserve all rights not granted to you in these Terms.</p>`
  },
  {
    title: '3. ACCOUNT AND PASSWORD',
    content: `<p>3.1. The services are provided via a dedicated account on a one-account-per-person basis.</p>
    <p>3.2. You are responsible for keeping your account confidential.</p>
    <p>3.3. By registering for an account, which involves providing us with certain mandatory and voluntary information as required for a successful registration, and using our App, you agree and acknowledge that:</p>
    <p>3.3.1. you have read the terms set out in these Terms and agree to be bound by and comply with them; and</p>
    <p>3.3.2. you must be at least 18 years of age.</p>
    <p>3.4. You are also responsible for any use of any account that you have access to, whether or not you authorized that use.</p>
    <p>3.5. You will immediately notify us of any unauthorized use of your accounts.</p>
    <p>3.6. You are solely responsible for any losses, damages, fees, or liability due to your lost, stolen, hacked, or otherwise compromised account.</p>`
  },
  {
    title: '4. ACCOUNT SUSPENSION AND TERMINATION',
    content: `<p>We reserve the right, at our sole discretion, to suspend or delete, at any time and without notice, any user account that we deem inappropriate, offensive, or in violation ("Breach") of these Terms. When a Breach of these Terms has occurred, we may take such action, without any liability for action taken, as we deem appropriate, including but not limited to all or any of the following actions:</p>
    <ul class="list-disc pl-6 mt-2">
      <li>4.1.1. immediate temporary or permanent withdrawal of your right to use our App;</li>
      <li>4.1.2. immediate temporary or permanent removal of any services rendered;</li>
      <li>4.1.3. issuance of a warning to you;</li>
      <li>4.1.4. legal proceedings against you for reimbursement of all costs on an indemnity basis (including but not limited to reasonable administrative and legal costs) resulting from the breach;</li>
      <li>4.1.5. further legal action against you; and/or</li>
      <li>4.1.6. disclosure of such information to law enforcement authorities as we reasonably feel is necessary.</li>
    </ul>`
  },
  {
    title: '5. END OF LIFE',
    content: `<p>We reserve the right to End-Of-Life (EOL) our App at our sole discretion and shall provide 3 months notification of such EOL event. If you prepaid Fees for a service which is subject to EOL, we will use commercially reasonable efforts to a) transition you to a substantially similar Service or b) upon our express written agreement, ensure the App availability, without uptime guarantee or test bug fixes, patches, or enhancements to the App.</p>`
  },


  {
    title: '6. SERVICE LEVELS AND SUPPORT',
    content: `<p>6.1. We shall render all commercially reasonable efforts to provide technical support to assist you in using our App. The total amount of technical support provided by us shall be governed under the fair use principle.</p>
    <p>6.2. We have no obligation to provide any support:</p>
    <ul class="list-disc pl-6 mt-2">
      <li>6.2.1. for anything other than our Services;</li>
      <li>6.2.2. if you or a third party has altered or modified any portion of the Services;</li>
      <li>6.2.3. if you have not used the Services in accordance with the documentation or instructions provided by us;</li>
      <li>6.2.4. to anyone other than you.</li>
    </ul>
    <p>6.3. The response time for contacts concerning technical support made by you will not exceed 72 hours. If the response time exceeds 72 hours, we will present you with a technical justification and define a new deadline for carrying out and completing the support service.</p>`
  },
  {
    title: '7. DATA CHARGES AND MOBILE DEVICES',
    content: `<p>You are responsible for all data-related charges that you may incur for using our App, including, without limitation, mobile, text-messaging, and data charges. You should understand or ask your service provider what charges you may incur before using the App.</p>`
  },
  {
    title: '8. TECHNICAL ERROR',
    content: `<p>In the unlikely event that you are experiencing or have experienced a technical error, please contact us with details and images of your experience so we can investigate the error and determine if a refund is owed to you.</p>`
  },
  {
    title: '9. TECHNICAL REQUIREMENTS',
    content: `<p>9.1. We attempt to keep our App updated so that it complies with modified/new versions of the firmware and new hardware. You are not granted rights to claim such an update.</p>
    <p>9.2. You acknowledge that it is your responsibility to confirm and determine that the end-user device on which you intend to use our App satisfies the technical specifications required.</p>
    <p>9.3. We reserve the right to modify the technical specifications as it sees appropriate at any time.</p>`
  },
  {
    title: '10. UPLOADING CONTENT TO OUR APP',
    content: `<p>10.1. You irrevocably and unconditionally represent and warrant that any of your content uploaded to our App complies with our Privacy Policy and any other applicable laws.</p>
    <p>10.2. You are fully responsible for your content uploaded to our App. We will not be responsible or liable to any third party for:</p>
    <ul class="list-disc pl-6 mt-2">
      <li>10.2.1. the content or accuracy of any content or data uploaded by you, by us on your behalf, or any other user of our App; or</li>
      <li>10.2.2. the loss of any content or data provided to us by you. You should keep a record of all such content and data.</li>
    </ul>
    <p>10.3. We will only use the content uploaded by you for the purposes of carrying out our obligations in these Terms or any other purpose expressly set out in these Terms or otherwise agreed between us. We will not otherwise disclose or distribute the content uploaded by you, save for when required by law, a court of competent jurisdiction, or any governmental or regulatory authority.</p>
    <p>10.4. We may use the content uploaded by you for the purpose of data analytics or to implement artificial intelligence or machine learning. Any such content shall be anonymised and used only for the purposes of improving the services and our response to users of the App.</p>
    <p>10.5. We have the right to disclose your identity to any third party claiming that any content posted or uploaded by you to our App constitutes a violation of their rights under applicable law.</p>
    <p>10.6. We have the right to delete any content uploaded to our App if, in our opinion, it does not comply with the content standards set out.</p>`
  },
  {
    title: '11. WARRANTIES',
    content: `<p>11.1. While we make all efforts to maintain the accuracy of the information on our App, we provide the website and all related content on an "as is" and "as available" basis, unless otherwise specified in writing. We make no representations or warranties of any kind, express or implied, as to the operation of any of the foregoing, unless otherwise specified in writing.</p>
    <p>11.2. We make no representations about the suitability, reliability, timeliness, comprehensiveness, and accuracy of the content on our App, information, services, and other content contained on our App.</p>
    <p>11.3. We cannot guarantee that the content on our App will always be correct, fault, error, virus free or free of any other harmful components.</p>
    <p>11.4. We do not accept liability for incorrect content or errors and omissions in our Content and information on our App or its content (whether of legal, typographical, technical, or other nature).</p>
    <p>11.5. To the full extent permissible by law, we disclaim all warranties, express or implied, relating to our App, including but not limited to implied warranties of merchantability and fitness for a particular purpose. We do not warrant that our App, the related content, or electronic communications sent by us are free of viruses or other harmful components.</p>`
  },
  {
    title: '12. SUBMISSIONS',
    content: `<p>12.1. You acknowledge and agree that any questions, comments, suggestions, ideas, feedback, or other information regarding the App ("Submissions") provided by you to us are non-confidential and shall become our sole property. We shall own exclusive rights, including all intellectual property rights, and shall be entitled to the unrestricted use and dissemination of these Submissions for any lawful purpose, commercial or otherwise, without acknowledgment or compensation to you.</p>
    <p>12.2. You hereby waive all moral rights to any such Submissions, and you hereby warrant that any such Submissions are original with you or that you have the right to submit such Submissions. You agree there shall be no recourse against us for any alleged or actual infringement or misappropriation of any proprietary right in your Submissions.</p>`
  },
  {
    title: '13. LIMITATION OF LIABILITY',
    content: `<p>13.1. We are not liable for the completeness, accuracy, or correctness of any information uploaded on our App and any related content. You expressly agree that your use of the services and our App, is at your sole risk.</p>
    <p>13.2. You agree not to use the services, our App and the related content for any resale purposes, and we have no liability to you, whether in contract, tort (including negligence), breach of statutory duty, or otherwise, arising under or in connection with these Terms (including but not limited to the use of, or inability to use, the services, our App or any other website or software) for:</p>
    <ul class="list-disc pl-6 mt-2">
      <li>13.2.1. loss of profits, sales, business, or revenue;</li>
      <li>13.2.2. business interruption;</li>
      <li>13.2.3. loss of anticipated savings;</li>
      <li>13.2.4. loss or corruption of data or information;</li>
      <li>13.2.5. loss of business opportunity, goodwill, or reputation; or</li>
      <li>13.2.6. any other indirect or consequential loss or damage.</li>
    </ul>
    <p>13.3. Nothing in these Terms shall limit or exclude our liability for:</p>
    <ul class="list-disc pl-6 mt-2">
      <li>13.3.1. death or personal injury resulting from our negligence;</li>
      <li>13.3.2. fraud; and/or</li>
      <li>13.3.3. any other matter in respect of which we are prohibited under applicable law from limiting or excluding our liability.</li>
    </ul>
    <p>13.4. These Terms set out the full extent of our obligations and liabilities in respect of the supply of the services and our App. Except as expressly stated in these Terms, there are no conditions, warranties, representations, or other terms, express or implied, that are binding on us. Any condition, warranty, representation, or other term concerning the supply of the services and our App which might otherwise be implied into, or incorporated in, these Terms whether by statute, common law, or otherwise, is excluded to the fullest extent permitted by law.</p>`
  },

  {
    title: '14. TERMINATION',
    content: `<p>14.1. To the fullest extent consistent with applicable law, we may suspend, modify or terminate your access to and use of our App, with no liability or notice to you, in the event that (a) we cease providing our App to users generally; (b) you breach any terms of these Terms (including the App Store Agreement(s) and our other policies specified in these Terms); (c) the owner of the applicable App Store terminates your App Store Account; or (d) we otherwise deem it necessary to suspend or modify your access to and use of our App or terminate these Terms in our sole discretion.</p>
    <p>14.2. You may also terminate these Terms by deleting and uninstalling the App on all of your devices or by deleting your App Store Account. A suspension or modification of your access to and use of our App will result in your inability to access and use some or all features of our App, as determined by us in our sole discretion.</p>
    <p>14.3. Upon any termination of these Terms, the rights granted to you will automatically terminate. You may no longer exercise any of those rights or these Terms. Subject to applicable law, we may, in our sole discretion, provide continued access to and use of our App after such termination.</p>
    <p>14.4. Except to the extent required by law, all payments and fees are non-refundable under all circumstances, regardless of whether or not these Terms have been terminated.</p>`
  },
  {
    title: '15. COMMUNICATION BETWEEN US',
    content: `<p>15.1. If you wish to contact us in writing, or if any condition in these Terms requires you to give us notice in writing. We will confirm receipt of this by contacting you in writing, normally by e-mail.</p>
    <p>15.2. If we have to contact you or give you notice in writing, we will do so by e-mail to the address you provide to us in your request for our App.</p>`
  },
  {
    title: '16. EVENTS OUTSIDE OUR CONTROL',
    content: `<p>16.1. We will not be liable or responsible for any failure to perform, or delay in performance of, any of our obligations under these Terms that is caused by any act or event beyond our reasonable control, including failure of public or private telecommunications networks (Event Outside Our Control).</p>
    <p>16.2. If an Event Outside Our Control takes place that affects the performance of our obligations under these Terms:</p>
    <ul class="list-disc pl-6 mt-2">
      <li>16.2.1. our obligations under these Terms will be suspended and the time for performance of our obligations will be extended for the duration of the Event Outside Our Control; and</li>
      <li>16.2.2. we will use our reasonable endeavors to find a solution by which our obligations under these Terms may be performed despite the Event Outside Our Control.</li>
    </ul>`
  },
  {
    title: '17. OTHER IMPORTANT TERMS',
    content: `<p>17.1. We may transfer our rights and obligations under these Terms to another organization, but this will not affect your rights or our obligations under these Terms.</p>
    <p>17.2. You may only transfer your rights or obligations under these Terms to another person if we agree in writing.</p>
    <p>17.3. If we fail to insist that you perform any of your obligations under these Terms, or if we do not enforce our rights against you, or if we delay in doing so, that will not mean that we have waived our rights against you and will not mean that you do not have to comply with those obligations. If we do waive a default by you, we will only do so in writing, and that will not mean that we will automatically waive any later default by you.</p>
    <p>17.4. Each of the conditions of these Terms operates separately. If any court or competent authority decides that any of them are unlawful or unenforceable, the remaining conditions will remain in full force and effect.</p>
    <p>17.5. Please note that these Terms, its subject matter and its formation are governed by the law of Italy. You and we both agree that the courts of Italy will have non-exclusive jurisdiction.</p>`
  }
];




const eulaSections = [
  {
    title: '1. APPLE AND GOOGLE',
    content: `<p>1.1. Our App is only available through accessing (or downloading from) a third-party platform or store, including but not limited to the Google Play Store and Apple App Store (each, an "App Store").</p>
    <p>1.2. Your use of our App is also governed by any applicable agreements you have with any App Store (the "App Store Agreement(s)"). In the event of a conflict between any other App Store Agreement(s) from which you acquire our App and this EULA with respect to your use of our App, this EULA will take priority.</p>
    <p>1.3. We are responsible for providing any maintenance and support services with respect to the App as specified in this EULA or to us as otherwise required under applicable law, and you acknowledge that each App Distributor has no obligation whatsoever to furnish any maintenance and support services with respect to the App.</p>
    <p>1.4. You must comply with applicable third-party terms of agreement when using the App.</p>
    <p>1.5. You acknowledge and agree that each App Distributor will have the right (and will be deemed to have accepted the right) to enforce the terms and conditions in this License against you as a third-party beneficiary thereof.</p>
    <p>1.6. By downloading the App you agree to the terms of this EULA which will bind you. The terms of this EULA.</p>
    <p>1.7. If you do not agree to the terms of this EULA, we will not license our App to you, and you must stop the downloading process now. In this case the downloading process will terminate. This agreement has been entered into on the date of your first download of our App.</p>`
  },
  {
    title: '2. AGREED TERMS',
    content: `<p>2.1. The terms of this EULA apply to our App or any of the services accessible through our App ("Service(s)"), including any updates or supplements to our App or any Service(s), unless they come with separate terms, in which case those terms apply.</p>
    <p>2.2. We may change these terms at any time by message with details of the change or notifying you of a change when you next start our App. The new terms may be displayed on-screen, and you may be required to read and accept them to continue your use of the Service(s).</p>
    <p>2.3. From time to time, updates to the App may be issued through the App Store. Depending on the update, you may not be able to use the Services until you have downloaded the latest version of our App and accepted any new terms.</p>
    <p>2.4. By using our App or any Service(s), you acknowledge and agree that internet transmissions are never completely private or secure. You understand that any message or information you send using our App or any Service(s) may be read or intercepted by others, even if there is a special notice that a particular transmission is encrypted.</p>
    <p>2.5. By using our App or any of the Service(s), you consent to us collecting and using technical information about the devices and related software, hardware, and peripherals for Services that are internet-based or wireless to improve our products and to provide any Service(s) to you.</p>
    <p>2.6. The outcome of any study completed on the data collected (which shall be aggregated and anonymized) may form part of one or more scientific publications and may inform research and policies related to health and well-being, mobility, computer science, and related fields. You will not be identified in any report or publication. The data collected will be retained for analysis and may be used to inform public policy or to provide information to selected parties.</p>`
  },
  {
    title: '3. GRANT AND SCOPE OF LICENCE',
    content: `<p>3.1. In consideration of you agreeing to abide by the terms of this EULA, we grant you a non-transferable, non-exclusive licence to use our App, subject to these terms, our Privacy Policy and the App Store Rules, incorporated into this EULA by reference. We reserve all other rights.</p>
    <p>3.2. You may download our App onto an Apple or Android device, in line with the operating system requirements set out at the beginning of this agreement, and view, use and display our App on the devices for your personal purposes only.</p>`
  },




  {
    title: '4. LICENCE RESTRICTIONS',
    content: `<p>Except as expressly set out in this EULA or as permitted by any local law, you agree:</p>
    <ul class="list-disc pl-6 mt-2">
      <li>4.1. not to copy our App except where such copying is incidental to normal use of our App, or where it is necessary for the purpose of back-up or operational security;</li>
      <li>4.2. not to rent, lease, sub-license, loan, translate, merge, adapt, vary or modify our App;</li>
      <li>4.3. not to make alterations to, or modifications of, the whole or any part of our App, or permit our App or any part of it to be combined with, or become incorporated in, any other programs;</li>
      <li>4.4. not to disassemble, decompile, reverse-engineer, or create derivative works based on the whole or any part of our App or attempt to do any such thing except to the extent that such actions cannot be prohibited because they are essential for the purpose of achieving interoperability of our App with another software program, and provided that the information obtained by you during such activities:</li>
      <ul class="list-disc pl-6 mt-1">
        <li>4.4.1. is used only for the purpose of achieving inter-operability of our App with another software program;</li>
        <li>4.4.2. is not unnecessarily disclosed or communicated without our prior written consent to any third party; and</li>
        <li>4.4.3. is not used to create any software that is substantially similar to our App;</li>
      </ul>
      <li>4.5. to keep all copies of our App secure and to maintain accurate and up-to-date records of the number and locations of all copies of our App;</li>
      <li>4.6. to include our copyright notice on all entire and partial copies you make of our App on any medium;</li>
      <li>4.7. not to provide or otherwise make available our App in whole or in part (including object and source code), in any form to any person without prior written consent from us; and</li>
      <li>4.8. to comply with all technology control or export laws and regulations that apply to the technology used or supported by our App or any Service ("Technology").</li>
    </ul>`
  },
  {
    title: '5. ACCEPTABLE USE RESTRICTIONS',
    content: `<p>You must:</p>
    <ul class="list-disc pl-6 mt-2">
      <li>5.1. not use our App or any Service(s) in any unlawful manner, for any unlawful purpose, or in any manner inconsistent with this EULA, or act fraudulently or maliciously, for example, by hacking into or inserting malicious code, including viruses, or harmful data, into our App, any Service(s) or any operating system;</li>
      <li>5.2. not infringe our intellectual property rights or those of any third party in relation to your use of our App or any Service(s), including the submission of any material (to the extent that such use is not licensed by this EULA);</li>
      <li>5.3. not transmit any material that is defamatory, offensive or otherwise objectionable in relation to your use of our App or any Service(s);</li>
      <li>5.4. not use our App or any Service(s) in a way that could damage, disable, overburden, impair or compromise our systems or security or interfere with other users; and</li>
      <li>5.5. not collect or harvest any information or data from any Service(s) or our systems or attempt to decipher any transmissions to or from the servers running any Service(s); together referred to as Acceptable Use Restrictions.</li>
    </ul>`
  },
  {
    title: '6. INTELLECTUAL PROPERTY RIGHTS',
    content: `<p>6.1. You acknowledge that all intellectual property rights in our App, the Documents and the Technology anywhere in the world belong to us or our licensors, that rights in our App are licensed (not sold) to you, and that you have no rights in, or to, our App, the Documents or the Technology other than the right to use each of them in accordance with the terms of this EULA.</p>
    <p>6.2. You acknowledge that you have no right to have access to our App in source-code form.</p>`
  },
  {
    title: '7. LIMITATION OF LIABILITY',
    content: `<p>7.1. We are not liable for the completeness, accuracy or correctness of any information uploaded on our App and any related content. You expressly agree that your use of the services and our App, is at your sole risk.</p>
    <p>7.2. You agree not to use the Services, our App and the related content for any resale purposes, and we have no liability to you, whether in contract, tort (including negligence), breach of statutory duty, or otherwise, arising under or in connection with this EULA (including but not limited to the use of, or inability to use, the services, our App or any other website or software) for:</p>
    <ul class="list-disc pl-6 mt-2">
      <li>7.2.1. loss of profits, sales, business, or revenue;</li>
      <li>7.2.2. business interruption;</li>
      <li>7.2.3. loss of anticipated savings;</li>
      <li>7.2.4. loss or corruption of data or information;</li>
      <li>7.2.5. loss of business opportunity, goodwill, or reputation; or</li>
      <li>7.2.6. any other indirect or consequential loss or damage.</li>
    </ul>
    <p>7.3. Nothing in this EULA shall limit or exclude our liability for:</p>
    <ul class="list-disc pl-6 mt-2">
      <li>7.3.1. death or personal injury resulting from our negligence;</li>
      <li>7.3.2. fraud; and/or</li>
      <li>7.3.3. any other matter in respect of which we are prohibited under applicable law from limiting or excluding our liability.</li>
    </ul>
    <p>7.4. This EULA set out the full extent of our obligations and liabilities in respect of the supply of the services and our App. Except as expressly stated in this EULA, there are no conditions, warranties, representations, or other terms, express or implied, that are binding on us. Any condition, warranty, representation, or other term concerning the supply of the services and our App which might otherwise be implied into, or incorporated in, this EULA whether by statute, common law or otherwise, is excluded to the fullest extent permitted by law.</p>`
  },





  {
    title: '8. TERMINATION',
    content: `<p>8.1. We may terminate this EULA immediately by written notice to you:</p>
    <ul class="list-disc pl-6 mt-2">
      <li>8.1.1. if you commit a material or persistent breach of this EULA which you fail to remedy (if remediable) within 14 days after the service of written notice requiring you to do so; and</li>
      <li>8.1.2. if you breach any of the Licence Restrictions or the Acceptable Use Restrictions.</li>
    </ul>
    <p>8.2. On termination for any reason:</p>
    <ul class="list-disc pl-6 mt-2">
      <li>8.2.1. all rights granted to you under this EULA shall cease;</li>
      <li>8.2.2. you must immediately cease all activities authorised by this EULA, including your use of any Service(s); and</li>
      <li>8.2.3. you must immediately delete or remove our App from all your devices and immediately destroy all copies of our App then in your possession, custody or control and certify to us that you have done so.</li>
    </ul>`
  },
  {
    title: '9. COMMUNICATION BETWEEN US',
    content: `<p>9.1. If you wish to contact us in writing, or if any condition in this EULA requires you to give us notice in writing. We will confirm receipt of this by contacting you in writing, normally by e-mail.</p>
    <p>9.2. If we have to contact you or give you notice in writing, we will do so by e-mail to the address you provide to us in your request for our App.</p>`
  },
  {
    title: '10. EVENTS OUTSIDE OUR CONTROL',
    content: `<p>10.1. We will not be liable or responsible for any failure to perform, or delay in performance of, any of our obligations under this EULA that is caused by any act or event beyond our reasonable control, including failure of public or private telecommunications networks (Event Outside Our Control).</p>
    <p>10.2. If an Event Outside Our Control takes place that affects the performance of our obligations under this EULA:</p>
    <ul class="list-disc pl-6 mt-2">
      <li>10.2.1. our obligations under this EULA will be suspended and the time for performance of our obligations will be extended for the duration of the Event Outside Our Control; and</li>
      <li>10.2.2. we will use our reasonable endeavors to find a solution by which our obligations under this EULA may be performed despite the Event Outside Our Control.</li>
    </ul>`
  },
  {
    title: '11. OTHER IMPORTANT TERMS',
    content: `<p>11.1. We may transfer our rights and obligations under this EULA to another organization, but this will not affect your rights or our obligations under this EULA.</p>
    <p>11.2. You may only transfer your rights or obligations under this EULA to another person if we agree in writing.</p>
    <p>11.3. If we fail to insist that you perform any of your obligations under this EULA, or if we do not enforce our rights against you, or if we delay in doing so, that will not mean that we have waived our rights against you and will not mean that you do not have to comply with those obligations. If we do waive a default by you, we will only do so in writing, and that will not mean that we will automatically waive any later default by you.</p>
    <p>11.4. Each of the conditions of this EULA operates separately. If any court or competent authority decides that any of them are unlawful or unenforceable, the remaining conditions will remain in full force and effect.</p>
    <p>11.5. Please note that this EULA, its subject matter and its formation are governed by the law of Italy. You and we both agree that the courts of Italy will have non-exclusive jurisdiction.</p>`
  },
];
</script>