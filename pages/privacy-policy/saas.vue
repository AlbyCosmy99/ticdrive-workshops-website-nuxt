<template>
  <template>
    <div class="prose max-w-none text-sm">
      <h2 class="text-lg font-semibold mb-3">1. Privacy Policy</h2>
      <p>
        Welcome to TicDrive! We are pleased that you are using our Software as a
        Service (SaaS) located at
        <a
          href="https://www.ticdrive.it/auth/login"
          class="text-blue-600 hover:underline"
          >www.ticdrive.it</a
        >. Data protection and data security when using our Services are very
        important to us. We would therefore like to inform you which of your
        personal data we collect and for what purposes it is used.
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
    </div>
  </template>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'privacy-policy',
});
const privacyPolicySections = [
  {
    title: 'BACKGROUND',
    content: `<p>This Privacy Policy describes our privacy practices in plain language, keeping legal and technical jargon to a minimum, to make sure you understand the information provided. However, to achieve this objective we would like to explain to you the following concepts.</p>
    <p>a) What is Personal Data?</p>
    <p>Personal Data is any includes information relating to an individual who can be identified or who is identifiable, directly from the information in question; or who can be indirectly identified from that information in combination with other information.</p>
    <p>b) What is Processing?</p>
    <p>"Processing" means and covers virtually any handling of data.</p>`,
  },
  {
    title: 'WHAT LAW APPLIES?',
    content: `<p>We will only use your Personal Data in accordance with Italy's Data Protection Code Legislative Decree no. 101 ("DPC"), the EU's General Data Protection Regulation ("GDPR"), and, of course, only as described in this Privacy Policy.</p>`,
  },
  {
    title: 'WHO IS RESPONSIBLE?',
    content: `<p>TicDrive of Via Leonardo da Vinci, 12b. 35133 Padova PD, Italy ("TicDrive", "we", "us", or "our"). We encourage you to read this Privacy Policy carefully, and if you have any questions or concerns about how we use your Personal Data, please email us using mariancompany07@gmail.com.</p>`,
  },
  {
    title: 'DATA COLLECTION',
    content: `<p>All Personal Data that we obtain from you will only be processed for the purposes described in more detail below. In particular, we collect Personal Data only if:</p>
    <ul class="list-disc pl-6 mt-2">
      <li>you have given your consent;</li>
      <li>the data is necessary for the fulfillment of a contract/pre-contractual measures;</li>
      <li>the data is necessary for the fulfillment of a legal obligation; or</li>
      <li>the data is necessary to protect the legitimate interests of our company and business.</li>
    </ul>`,
  },
  {
    title: 'DATA RETENTION',
    content: `<p>We process and store your Personal Data only for the period of time required to achieve the respective processing purpose or for as long as a legal retention period exists (in particular, commercial and tax law in accordance with applicable commercial laws and fiscal codes and others for up to 8 years). Once the purpose has been achieved or the retention period has expired, the corresponding data is routinely deleted.</p>`,
  },
  {
    title: 'DATA WE COLLECT',
    content: `<p>a) Technical Data</p>
    <p>When you access our Service, some access data is recorded automatically and stored in a log file on our Railway server. This means if you access our Service, we process a) the IP address of your computer, b) the date and time of your access, c) the name and URL of the accessed file, d) the browser used, e) the amount of bytes transferred, f) the status of the page request, g) the session ID and g) the referrer URL. The legal basis for processing is our legitimate interest.</p>
    
    <p>b) Contacting us and contracting with us</p>
    <p>You can contact us in various ways, and data is always collected in the process. You provide us with most of the data that we process when you contact us, such as your name and email address. This data is collected and processed exclusively for the purpose of contacting you and processing your request and then deleted again, provided that there is no legal obligation to retain it.</p>`,
  },
  {
    title: 'DATA SHARING',
    content: `<p>In certain cases, it is necessary to transmit the processed Personal Data in the course of data processing. In this respect, there are different recipient bodies and categories of recipients.</p>
    
    <p>a) Internal</p>
    <p>If necessary, we transfer your Personal Data within TicDrive. Of course, we comply with the UAVG and the GDPR and ensure that your data is processed properly. Access to your Personal Data is only granted to authorized employees who need access to the data due to their job, e.g., to provide our services or to contact you in case of queries.</p>
    
    <p>b) External bodies</p>
    <p>Personal Data is transferred to our service providers in the following instances:</p>
    <ul class="list-disc pl-6 mt-2">
      <li>in the context of fulfilling our contract with you,</li>
      <li>to use marketing services and to advertise our services online,</li>
      <li>to communicate with you,</li>
      <li>to provide our Services, and</li>
      <li>to state authorities and institutions as far as this is required or necessary.</li>
    </ul>
     <p>c) International transfer</p>
     <p>We may transfer your Personal Data to other companies as necessary for the purposes described in this Privacy Policy. In order to provide adequate protection for your Personal Data when it is transferred, we have contractual arrangements regarding such transfers. We take all reasonable technical and organizational measures to protect the Personal Data we transfer.</p>`,
  },

  {
    title: 'DATA SECURITY',
    content: `<p>Our services use SSL or TLS encryption to ensure the security of data processing and to protect the transmission of confidential content that you send to us. We have also implemented numerous security measures ("technical and organizational measures") for example encryption or need-to know access, to ensure the most complete protection of Personal Data processed through our Services.</p>`,
  },
  {
    title: 'YOUR RIGHTS AND PRIVILEGES',
    content: `<p>Privacy rights</p>
    <p>You can exercise the following rights:</p>
    <ul class="list-disc pl-6 mt-2">
      <li>The right to access;</li>
      <li>The right to rectification;</li>
      <li>The right to erasure;</li>
      <li>The right to restrict processing;</li>
      <li>The right to object to processing;</li>
      <li>The right to data portability;</li>
    </ul>

    <p class="mt-4">Update your information and withdraw your consent</p>
    <p>If you believe that the information we hold about you is inaccurate or request its rectification, deletion, or object to legitimate interest processing, please do so by contacting us.</p>

    <p class="mt-4">Access Request</p>
    <p>In the event you want to make a Data Subject Access Request, please contact us. We will respond to requests regarding access and correction as soon as reasonably possible. Should we not be able to respond to your request within thirty (30) days, we will tell you why and when we will be able to respond to your request. If we are unable to provide you with any Personal Data or to make a correction requested by you, we will tell you why.</p>

    <p class="mt-4">What we do not do</p>
    <ul class="list-disc pl-6 mt-2">
      <li>We do not request Personal Data from minors and children;</li>
      <li>We do not process special category data without obtaining prior specific consent;</li>
      <li>We do not use automated decision-making, including profiling; and</li>
      <li>We do not sell your Personal Data.</li>
    </ul>`,
  },
  {
    title: 'Who is the competent data protection authority?',
    content: `<p>The supervisory authority in Italy is the Italian Data Protection Authority, Garante per la protezione dei dati personali, Piazza Venezia 11, 00187 Rome, (<a href="www.garanteprivacy.it" class="text-blue-600 hover:underline">www.garanteprivacy.it</a>). However, we would appreciate the opportunity to address your concerns before you contact the Garante per la protezione dei dati personali or any other supervisory authority.</p>`,
  },
  {
    title: 'DATA BREACHES AND NOTIFICATION',
    content: `<p>Databases or records containing Personal Data may be breached accidentally or through unlawful intrusion. As soon as we become aware of a data breach, we will notify all affected individuals whose Personal Data may have been compromised, and the notification will be accompanied by a description of the measures that will be taken to repair the damage caused by the data breach. Notifications will be sent as soon as possible after the violation is discovered.</p>`,
  },
  {
    title: 'HELP AND COMPLAINTS',
    content: `<p>If you have any questions about data protection at TicDrive, you can contact us by email using mariancompany07@gmail.com with "Data Protection" in the subject line.</p>`,
  },
  {
    title: 'CHANGES',
    content: `<p>The first version of this policy was issued on Wednesday, 30th April, 2025, and is the current version. Any prior versions are invalid, and if we make changes to this policy, we will revise the effective date.</p>`,
  },
];

const termsOfUseSections = [
  {
    title: '1. GENERAL TERMS',
    content: `<p>1.1. We license use of our SaaS to you on the basis of these Terms. We do not sell our SaaS to you, and we remain the owner of our SaaS at all times.</p>
    <p>1.2. The provisions set out in these Terms govern your access to and your use of our SaaS and shall constitute a legally binding agreement between you and us.</p>
    <p>1.3. We may change such terms from time to time and shall notify you accordingly if we do. If you do not agree to such terms, you must not use our SaaS.</p>
    <p>1.4. Subject to you agreeing to abide by these Terms, we hereby grant to you a revocable, non-exclusive, and non-transferable license to use our SaaS on these Terms.</p>
    <p>1.5. We reserve the right, without any notice, explanation, or liability and in our sole discretion, to refuse to allow you or suspend your access to our SaaS at any time, or remove or edit content on our SaaS or on any of our affiliated websites (including social media pages).</p>
    <p>1.6. We reserve the right to change, modify, suspend, or discontinue any portion of these Terms, the SaaS, or any other products, affiliated websites (including social media pages) and/or other software provided by us in connection with any of the foregoing at any time.</p>
    <p>1.7. You agree that access to or operation of any of the foregoing may from time to time be interrupted or encounter technical difficulties.</p>`,
  },
  {
    title: '2. YOUR ACCESS TO OUR SERVICES',
    content: `<p>2.1. By registering for our SaaS, which involves providing us with certain mandatory and voluntary information as required for a successful registration and using our SaaS, you agree and acknowledge that:</p>
    <ul class="list-disc pl-6 mt-2">
      <li>2.1.1. you are at least 18 years of age and not a minor in your country of residence;</li>
      <li>2.1.2. you have read the terms set out in these Terms and agree to be bound by and comply with them.</li>
    </ul>`,
  },
  {
    title: '3. SAAS LICENSE',
    content: `<p>3.1. We grant you a personal, non-exclusive, non-assignable and non-transferable right to access and to use the Service within the limits determined by us.</p>
    <p>3.2. The license is granted for the sole and exclusive purpose of enabling you to use the Service for your internal business operations only.</p>
    <p>3.3. The right of use shall mean the right to represent and implement the Service in accordance with its intended purpose in SaaS mode via a connection to an electronic communications network portal.</p>`,
  },
  {
    title: '4. AVAILABILITY',
    content: `<p>4.1. Although we will try to provide continuous access to the Service, we cannot and do not guarantee that our SaaS will be available 100% of the time and will not be liable in the event our SaaS are unavailable.</p>
    <p>4.2. You acknowledge that availability of our SaaS depends further on your compliance with your usage allowances as per your selected plan and scheduled and emergency maintenance periods. We undertake to notify you of scheduled and unscheduled outages and they are not expected to take more than four (4) hours.</p>`,
  },
  {
    title: '5. END OF LIFE',
    content: `<p>We reserve the right to End-Of-Life (EOL) the Service at our sole discretion and shall provide 3 months notification of such EOL event.</p>`,
  },

  {
    title: '6. SERVICE LEVELS AND SUPPORT',
    content: `<p>6.1. During the Term, we shall render all commercially reasonable efforts to provide technical support to assist you in using our portal and the SaaS. The total amount of technical support provided by us shall be governed under the fair use principle.</p>
    <p>6.2. We have no obligation to provide any support:</p>
    <ul class="list-disc pl-6 mt-2">
      <li>6.2.1. for anything other than our SaaS;</li>
      <li>6.2.2. if you or a third party has altered or modified any portion of the SaaS;</li>
      <li>6.2.3. if you have not used the SaaS in accordance with the documentation or instructions provided by us;</li>
      <li>6.2.4. to anyone other than you.</li>
    </ul>
    <p>6.3. The response time for contacts concerning technical support made by you will not exceed 72 hours. If the response time exceeds 72 hours, we will present you with a technical justification and define a new deadline for carrying out and completing the support service.</p>`,
  },
  {
    title: '7. PROPRIETARY RIGHTS',
    content: `<p>7.1. You acknowledge and agree that we own all intellectual property rights in our SaaS. Except as expressly stated herein, this agreement does not grant you any rights to, or in, patents, copyrights, database rights, trade secrets, trade names, trademarks (whether registered or unregistered), or any other rights or licenses in respect of our SaaS.</p>
    <p>7.2. You confirm that you have all the rights in relation to our SaaS that are necessary to grant all the rights it purports to grant under, and in accordance with, these Terms.</p>`,
  },
  {
    title: '8. UPLOADING CONTENT',
    content: `<p>8.1. You irrevocably and unconditionally represent and warrant that any of your content uploaded to our portal complies with our Privacy Policy, Italy's Data Protection Code ("DPC") and the EU General Data Protection Regulation ("GDPR") and any other applicable laws.</p>
    <p>8.2. You are fully responsible for your content uploaded to our SaaS. We will not be responsible, or liable to any third party, for:</p>
    <ul class="list-disc pl-6 mt-2">
      <li>8.2.1. the content or accuracy of any content or data uploaded or produced by you using the SaaS; or</li>
      <li>8.2.2. the loss of any content or data uploaded or produced by you using the SaaS. You should keep a record of all such content and data.</li>
    </ul>
    <p>8.3. We will only use the content uploaded by you for the purposes of carrying out the SaaS, carrying out our obligations in this Agreement and any other purpose expressly set out in this Agreement or otherwise agreed between us. We will not otherwise disclose or distribute the content or data uploaded or produced by you using the SaaS, save for when required by law, a court of competent jurisdiction, or any governmental or regulatory authority.</p>
    <p>8.4. We may use the content or data uploaded or produced by you using the SaaS for the purpose of data analytics or to further develop our SaaS or machine learning. Any such content shall be anonymized and used only for the purposes of improving the SaaS and our response to users of our portal.</p>
    <p>8.5. We have the right to disclose your identity to any third party claiming that any content or data uploaded or produced by you to our SaaS constitutes a violation of their rights under applicable law.</p>`,
  },
  {
    title: '9. PROHIBITED USES',
    content: `<p>9.1. You may use our SaaS only for lawful purposes. You may not use our SaaS:</p>
    <ul class="list-disc pl-6 mt-2">
      <li>9.1.1. in any way that breaches any applicable local or international laws or regulations;</li>
      <li>9.1.2. in any way that is unlawful or fraudulent, or has any unlawful or fraudulent purpose or effect;</li>
      <li>9.1.3. to send, knowingly receive, upload, download, use or re-use any material which does not comply with our content standards as set out in our prevailing terms and conditions as amended from time to time; and</li>
      <li>9.1.4. to knowingly transmit any data, send or upload any material that contains viruses, Trojan horses, worms, time-bombs, keystroke loggers, spyware, adware or any other harmful programs or similar computer code designed to adversely affect the operation of any computer software or hardware.</li>
    </ul>
    <p>9.2. You also agree:</p>
    <ul class="list-disc pl-6 mt-2">
      <li>9.2.1. not to reproduce, duplicate, copy or re-sell any part of our SaaS in contravention of the provisions of our Terms; and</li>
      <li>9.2.2. not to access without authority, interfere with, damage or disrupt:</li>
      <li>9.2.3. any part of our SaaS;</li>
      <li>9.2.4. any equipment or network on which our portal and Service is stored;</li>
      <li>9.2.5. any software used in the provision of our SaaS; or</li>
      <li>9.2.6. any equipment or network or software owned or used by any third party.</li>
    </ul>`,
  },
  {
    title: '10. INDEMNITY',
    content: `<p>10.1. You agree to indemnify us and keep us indemnified against all claims, liabilities, damages, losses, costs, and expenses (including reasonable legal fees) suffered or incurred by us as a result of:</p>
    <ul class="list-disc pl-6 mt-2">
      <li>10.1.1. your breach of these Terms;</li>
      <li>10.1.2. any claim made against us for actual or alleged infringement of a third party's intellectual property rights arising out of or in connection with your use of our SaaS; and</li>
      <li>10.1.3. any claim made against us by a third party arising out of or in connection with your use of our SaaS.</li>
    </ul>`,
  },
  {
    title: '11. LIMITATION OF LIABILITY',
    content: `<p>11.1. Nothing in these Terms shall limit or exclude our liability for:</p>
    <ul class="list-disc pl-6 mt-2">
      <li>11.1.1. death or personal injury caused by our negligence;</li>
      <li>11.1.2. fraud or fraudulent misrepresentation; and</li>
      <li>11.1.3. any other liability that cannot be limited or excluded by law.</li>
    </ul>`,
  },
  {
    title: '12. WARRANTIES',
    content: `<p>12.1. While we make all efforts to maintain the accuracy of the information on our SaaS, we provide the SaaS and all related content on an "as is" and "as available" basis, unless otherwise specified in writing. We make no representations or warranties of any kind, express or implied, as to the operation of any of the foregoing, unless otherwise specified in writing.</p>
    <p>12.2. To the full extent permissible by law, we disclaim all warranties, express or implied, relating to our SaaS or any services, including but not limited to implied warranties of merchantability and fitness for a particular purpose. We do not warrant that the services, our SaaS, the related content, or electronic communications sent by us are free of viruses or other harmful components.</p>`,
  },
  {
    title: '13. LIMITATION OF LIABILITY',
    content: `<p>13.1. We are not liable for the completeness, accuracy or correctness of any information and any related content in our SaaS and on our portal. You expressly agree that your use of the SaaS and our portal, including reliance on any content and information, is at your sole risk.</p>
    <p>13.2. You agree not to use the SaaS, our portal, and the related content for any resale purposes, and we have no liability to you, whether in contract, tort (including negligence), breach of statutory duty, or otherwise, arising under or in connection with these Terms (including but not limited to the use of, or inability to use, the SaaS, our portal, or any other website or software) for:</p>
    <ul class="list-disc pl-6 mt-2">
      <li>13.2.1. loss of profits, sales, business, or revenue;</li>
      <li>13.2.2. business interruption;</li>
      <li>13.2.3. loss of anticipated savings;</li>
      <li>13.2.4. loss or corruption of data or information;</li>
      <li>13.2.5. loss of business opportunity, goodwill or reputation; or</li>
      <li>13.2.6. any other indirect or consequential loss or damage.</li>
    </ul>
    <p>13.3. Nothing in these Terms shall limit or exclude our liability for:</p>
    <ul class="list-disc pl-6 mt-2">
      <li>13.3.1. death or personal injury resulting from our negligence;</li>
      <li>13.3.2. fraud; and/or</li>
      <li>13.3.3. any other matter in respect of which we are prohibited under applicable law from limiting or excluding our liability.</li>
    </ul>
    <p>13.4. Our SaaS is not intended to serve a record-keeping function, and we shall not be liable for any loss of data or content.</p>
    <p>13.5. These Terms set out the full extent of our obligations and liabilities in respect of the supply of the SaaS and our portal. Except as expressly stated in these Terms, there are no conditions, warranties, representations, or other terms, express or implied, that are binding on us. Any condition, warranty, representation, or other term concerning the supply of the SaaS and our portal which might otherwise be implied into, or incorporated in, these Terms whether by statute, common law, or otherwise, is excluded to the fullest extent permitted by law.</p>`,
  },
  {
    title: '14. TERMINATION',
    content: `<p>14.1. To the fullest extent consistent with applicable law, we may suspend, modify, or terminate access to and use of our SaaS, with no liability or notice to you, in the event that (a) we cease providing our SaaS to users generally; (b) you breach any terms of these Terms and our other policies specified in these Terms; (c) we otherwise deem it necessary to suspend or modify your access to and use of our SaaS or terminate these Terms in our sole discretion.</p>
    <p>14.2. You may also terminate these Terms by deleting and uninstalling the SaaS on all of your devices or by deleting your account. A suspension or modification of your access to and use of our SaaS will result in your inability to access and use some or all features of our SaaS, as determined by us in our sole discretion.</p>
    <p>14.3. Upon any termination of these Terms, the rights granted to you will automatically terminate, and you may no longer exercise any of those rights or these Terms. Subject to applicable law, we may, in our sole discretion, provide continued access to and use of our SaaS after such termination.</p>
    <p>14.4. Except to the extent required by law, all payments and fees are non-refundable under all circumstances, regardless of whether or not these Terms have been terminated.</p>`,
  },
  {
    title: '15. COMMUNICATION BETWEEN US',
    content: `<p>15.1. If you wish to contact us in writing, or if any condition in these Terms requires you to give us notice in writing. We will confirm receipt of this by contacting you in writing, normally by e-mail.</p>
    <p>15.2. If we have to contact you or give you notice in writing, we will do so by e-mail to the address you provide to us in your request for our SaaS.</p>`,
  },
  {
    title: '16. EVENTS OUTSIDE OUR CONTROL',
    content: `<p>16.1. We will not be liable or responsible for any failure to perform, or delay in performance of, any of our obligations under these Terms that is caused by any act or event beyond our reasonable control, including failure of public or private telecommunications networks (Event Outside Our Control).</p>
    <p>16.2. If an Event Outside Our Control takes place that affects the performance of our obligations under these Terms:</p>
    <ul class="list-disc pl-6 mt-2">
      <li>16.2.1. our obligations under these Terms will be suspended and the time for performance of our obligations will be extended for the duration of the Event Outside Our Control; and</li>
      <li>16.2.2. we will use our reasonable endeavors to find a solution by which our obligations under these Terms may be performed despite the Event Outside Our Control.</li>
    </ul>`,
  },
  {
    title: '17. OTHER IMPORTANT TERMS',
    content: `<p>17.1. We may transfer our rights and obligations under these Terms to another organization, but this will not affect your rights or our obligations under these Terms.</p>
    <p>17.2. You may only transfer your rights or obligations under these Terms to another person if we agree in writing.</p>
    <p>17.3. If we fail to insist that you perform any of your obligations under these Terms, or if we do not enforce our rights against you, or if we delay in doing so, that will not mean that we have waived our rights against you and will not mean that you do not have to comply with those obligations. If we do waive a default by you, we will only do so in writing, and that will not mean that we will automatically waive any later default by you.</p>
    <p>17.4. Each of the conditions of these Terms operates separately. If any court or competent authority decides that any of them are unlawful or unenforceable, the remaining conditions will remain in full force and effect.</p>
    <p>17.5. Please note that these Terms, its subject matter and its formation are governed by the law of Italy. You and we both agree that the courts of Italy will have non-exclusive jurisdiction.</p>`,
  },
];
</script>
