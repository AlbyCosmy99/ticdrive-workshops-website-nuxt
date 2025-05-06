<template>
  <div class="prose max-w-none text-sm">
    <h2 class="text-lg font-semibold mb-3">1. Privacy Policy</h2>
    <p>
      Thank you for your interest in this Privacy Policy, and welcome to TicDrive our iOS and Android mobile application
      (our "App"). This policy is intended to inform the users of our App about the nature, scope, and purpose of the
      collection and use of personal data by us.
    </p>

    <!-- Privacy Policy content -->
    <div v-for="(section, index) in privacyPolicySections" :key="index">
      <h2 class="text-lg font-semibold mb-3 mt-5">{{ section.title }}</h2>
      <div v-html="section.content"></div>
    </div>

    <!-- Terms of Use content -->
    <h2 class="text-lg font-semibold mb-3 mt-8">Terms of Use</h2>
    <p>
      These Terms of Use (the "Terms") apply between you ("you") and TicDrive of Via Leonardo da Vinci, 12b. 35133
      Padova PD, Italy ("TicDrive", "we", "us", "our") for our iOS and Android mobile application (our "App") and
      constitute a legal agreement between you and us governing your access to our App and Services.
    </p>
    <!-- Add rest of Terms of Use content -->

    <!-- EULA content -->
    <h2 class="text-lg font-semibold mb-3 mt-8">End-User License Agreement (EULA)</h2>
    <p>
      This end-user licence agreement ("EULA") is a legal agreement between you ("End-user" or "you") and TicDrive of
      Via Leonardo da Vinci, 12b. 35133 Padova PD, Italy ("TicDrive", "we", "us", "our") for the use of our iOS and
      Android mobile application (our "App").
    </p>
    <!-- Add rest of EULA content -->
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





























  }
];
</script>