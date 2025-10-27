import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, 
    },
    resources: {
      en: {
        translation: {
          // ... (النصوص السابقة من Hero)
          heroSubtitle: 'Cybersecurity & Web Application Penetration Testing',
          menuAriaLabel: 'Open Menu',
          toggleLanguage: 'العربية',

          // النصوص الجديدة لقسم Mission
          missionTitle: "Our Mandate",
          missionText1: "In a world of escalating digital threats, our mandate is absolute: to engineer <1>impenetrable digital fortresses</1>. We don't just build applications; we forge shields in the digital realm.",
          missionText2: "Our approach is a synthesis of <1>proactive threat intelligence</1> and bespoke security architecture. We anticipate vulnerabilities before they are exploited, transforming your digital presence from a potential liability into a resilient, secure asset.",
          missionText3: "We empower our clients to operate with confidence, knowing their digital infrastructure is not only innovative and performant, but <1>uncompromisingly secure</1>.",
        
          aboutTitle: "About.",
          aboutText1: "I'm a 18 high school student passionate about cybersecurity and computer maintenance. I'm developing my skills through experience and practice, and I'm striving to build a professional future in this field. I hold professional certifications from Microsoft and the Satr educational platform.",
            
          skillsTitle: "Core Capabilities",
          cyberSecuritySkills: {
            "0": "Web Pentesting",
            "1": "Digital Forensics",
            "2": "OSINT",
            "3": "Network Scanning"
          },
          webDevelopmentSkills: {
            "0": "HTML",
            "1": "CSS",
            "2": "JavaScript"
          },

          footerTitle: "Let’s Build the Future, Securely.",
          footerSubtitle: "Open a channel. Your next mission begins with a single message.",
          copyEmailLabel: "Copy email",
          emailCopied: "Email copied to clipboard!",
          professionalLinks: "PROFESSIONAL",
          socialLinks: "SOCIAL",
          linkedinLabel: "LinkedIn",
          githubLabel: "GitHub",
          twitterLabel: "Twitter",
          instagramLabel: "Instagram",
          youtubeLabel: "YouTube",
          tiktokLabel: "TikTok",
          telegramLabel: "Telegram",
          copyright: "rootx Industries. All Rights Reserved.",
          developedBy: "Designed & Developed by"

        }
      },
      ar: {
        translation: {
          // ... (النصوص السابقة من Hero)
          heroSubtitle: 'الأمن السيبراني واختبار اختراق تطبيقات الويب',
          menuAriaLabel: 'فتح القائمة',
          toggleLanguage: 'English',
          
          // النصوص الجديدة لقسم Mission
          missionTitle: "مهمتنا",
          missionText1: "في عالم تتصاعد فيه التهديدات الرقمية، مهمتنا مطلقة: بناء <1>حصون رقمية منيعة</1>. نحن لا نكتفي ببناء التطبيقات؛ بل نصنع دروعًا في العالم الرقمي.",
          missionText2: "نهجنا هو توليفة من <1>استخبارات التهديدات الاستباقية</1> وهندسة الأمان المخصصة. نتوقع الثغرات قبل استغلالها، محولين وجودك الرقمي من مسؤولية محتملة إلى أصل مرن وآمن.",
          missionText3: "نحن نمكّن عملاءنا من العمل بثقة، مع العلم أن بنيتهم التحتية الرقمية ليست مبتكرة وعالية الأداء فحسب، بل <1>آمنة بشكل لا هوادة فيه</1>.",
          
          aboutTitle: "نبذة.",
          aboutText1: "أنا طالب في المرحلة الثانوية أبلغ من العمر 18 عامًا، شغوف بالأمن السيبراني وصيانة الحواسيب. أعمل على تطوير مهاراتي من خلال الخبرة والممارسة، وأسعى لبناء مستقبل مهني في هذا المجال. أحمل شهادات مهنية من مايكروسوفت ومنصة سطر التعليمية.",

          skillsTitle: "القدرات الأساسية",
          cyberSecuritySkills: {
            "0": "اختبار اختراق الويب",
            "1": "التحقيق الجنائي الرقمي",
            "2": "المصادر المفتوحة",
            "3": "فحص الشبكات"
          },
          webDevelopmentSkills: {
            "0": "HTML",
            "1": "CSS",
            "2": "JavaScript"
          },
         
          footerTitle: "لنصنع المستقبل، بأمان.",
          footerSubtitle: "افتح قناة تواصل. مهمتك التالية تبدأ برسالة واحدة.",
          copyEmailLabel: "نسخ البريد الإلكتروني",
          emailCopied: "تم نسخ البريد الإلكتروني!",
          professionalLinks: "احترافي",
          socialLinks: "اجتماعي",
          linkedinLabel: "لينكدإن",
          githubLabel: "جيت هاب",
          twitterLabel: "تويتر",
          instagramLabel: "انستغرام",
          youtubeLabel: "يوتيوب",
          tiktokLabel: "تيك توك",
          telegramLabel: "تيليجرام",
          copyright: "صناعات rootx. جميع الحقوق محفوظة.",
          developedBy: "صمم وطور بواسطة"

        }
      }
    }
  });

export default i18n;
