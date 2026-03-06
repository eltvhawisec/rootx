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

      /* ─────────────────────── ENGLISH ─────────────────────── */
      en: {
        translation: {

          /* ── Hero ── */
          heroSubtitle: 'Your trusted destination for cybersecurity services, technical consulting, and professional insights.',
          menuAriaLabel: 'Open Menu',
          toggleLanguage: 'العربية',

          /* ── Mission ── */
          missionTitle: 'Our Mission',
          missionText1:
            'I provide <1>expert cybersecurity solutions</1> and technical consulting designed to enhance digital security and empower individuals and organizations to protect their assets in the digital world.',
          missionText2:
            'My approach combines <1>proactive vulnerability analysis</1> and web application penetration testing — identifying security weaknesses before they can be exploited, transforming your digital presence into a resilient and secure asset.',
          missionText3:
            'Responsible for preparing and designing episode content from concept to production-ready stage — including in-depth research, crafting discussion topics and questions, and coordinating with the team to ensure content quality and accuracy before recording.',

          /* ── About ── */
          aboutTitle: 'About.',
          aboutText1:
            'I work as an intern in the field of cybersecurity and a penetration tester for web applications, where I analyze systems and identify security vulnerabilities to enhance security.',
          aboutText2:
            'I provide technical consulting to support the community and individuals, and I strive to raise digital awareness through training, presentations, and writing informative articles.',

          /* ── Skills ── */
          skillsTitle: 'Core Capabilities',
          cyberSecuritySkills: {
            '0': 'Web App Pentesting',
            '1': 'Vulnerability Analysis',
            '2': 'Digital Forensics',
            '3': 'OSINT',
            '4': 'Network Scanning',
            '5': 'Security Consulting',
            '6': 'Digital Awareness',
            '7': 'Cybersecurity Training',
          },
          webDevelopmentSkills: {
            '0': 'HTML',
            '1': 'CSS',
            '2': 'JavaScript',
            '3': 'Web Security',
            '4': 'Technical Writing',
          },

          /* ── Footer / Contact ── */
          contactLabel: 'Get in touch',
          footerTitle: "Let's",
          footerTitleOutline: 'Connect.',
          footerSubtitle:
            'Have a project in mind, need cybersecurity consulting, or just want to say hello? My inbox is always open.',
          copyEmailLabel: 'Copy email',
          emailCopied: 'Copied to clipboard!',
          professionalLinks: 'Professional',
          socialLinks: 'Social',
          linkedinLabel: 'LinkedIn',
          githubLabel: 'GitHub',
          twitterLabel: 'Twitter / X',
          instagramLabel: 'Instagram',
          youtubeLabel: 'YouTube',
          tiktokLabel: 'TikTok',
          telegramLabel: 'Telegram',
          copyright: 'Saleh Boukhder. All rights reserved.',
          developedBy: 'Built by',

          /* ── About extras ── */
          roleTrainer:       'Trainer',
          rolePentester:     'Penetration Tester',
          roleAnalyst:       'Security Analyst',
          statFollowers:     'Followers\nacross platforms',
          statVisitors:      'Site\nVisitors',
          statProjects:      'Competitions\n& Projects',
          tagPentesting:     'Web App Pentesting',
          tagVuln:           'Vulnerability Analysis',
          tagConsulting:     'Security Consulting',
          tagAwareness:      'Digital Awareness',
          footerTagline:     'security & precision',
          cardRole:          'Cybersecurity',
          availableLabel:    'Available for work',
          serviceWebPentest: 'Web Penetration Testing',
          serviceTraining:   'Security Training',
          serviceConsulting: 'Tech Consulting',
        },
      },

      /* ─────────────────────── ARABIC ─────────────────────── */
      ar: {
        translation: {

          /* ── Hero ── */
          heroSubtitle: 'وجهتك الموثوقة لخدمات الأمن السيبراني والاستشارات التقنية والرؤى المتخصصة.',
          menuAriaLabel: 'فتح القائمة',
          toggleLanguage: 'English',

          /* ── Mission ── */
          missionTitle: 'مهمتنا',
          missionText1:
            'أقدم <1>حلول أمن سيبراني متخصصة</1> واستشارات تقنية مصممة لتعزيز الأمن الرقمي وتمكين الأفراد والمؤسسات من حماية أصولهم في العالم الرقمي.',
          missionText2:
            'يجمع نهجي بين <1>تحليل الثغرات الاستباقي</1> واختبار اختراق تطبيقات الويب — للكشف عن نقاط الضعف الأمنية قبل استغلالها، وتحويل وجودك الرقمي إلى أصل مرن وآمن.',
          missionText3:
            'مسؤول عن إعداد وتصميم محتوى الحلقات من الفكرة حتى جاهزيتها للتنفيذ، والبحث المتعمق في المواضيع، وصياغة محاور الحوار والأسئلة في التنسيق مع فريق العمل لضمان جودة المحتوى ودقته قبل التسجيل.',

          /* ── About ── */
          aboutTitle: 'نبذة.',
          aboutText1:
            'أعمل متدرباً في مجال الأمن السيبراني ومختبراً لاختراق تطبيقات الويب، حيث أحلل الأنظمة وأحدد الثغرات الأمنية لتعزيز الحماية.',
          aboutText2:
            'أقدم استشارات تقنية لدعم المجتمع والأفراد، وأسعى لرفع الوعي الرقمي من خلال التدريب والمحاضرات وكتابة المقالات التثقيفية.',
            
          /* ── Skills ── */
          skillsTitle: 'القدرات الأساسية',
          cyberSecuritySkills: {
            '0': 'اختبار اختراق الويب',
            '1': 'تحليل الثغرات',
            '2': 'التحقيق الجنائي الرقمي',
            '3': 'المصادر المفتوحة',
            '4': 'فحص الشبكات',
            '5': 'الاستشارات الأمنية',
            '6': 'الوعي الرقمي',
            '7': 'تدريب الأمن السيبراني',
          },
          webDevelopmentSkills: {
            '0': 'HTML',
            '1': 'CSS',
            '2': 'JavaScript',
            '3': 'أمن الويب',
            '4': 'الكتابة التقنية',
          },

          /* ── Footer / Contact ── */
          contactLabel: 'تواصل معي',
          footerTitle: 'لنبدأ',
          footerTitleOutline: 'التواصل.',
          footerSubtitle:
            'لديك مشروع، أو تحتاج استشارة أمنية، أو فقط تريد التواصل؟ صندوق الوارد مفتوح دائماً.',
          copyEmailLabel: 'نسخ البريد الإلكتروني',
          emailCopied: 'تم النسخ!',
          professionalLinks: 'احترافي',
          socialLinks: 'اجتماعي',
          linkedinLabel: 'لينكدإن',
          githubLabel: 'جيت هاب',
          twitterLabel: 'تويتر / X',
          instagramLabel: 'انستغرام',
          youtubeLabel: 'يوتيوب',
          tiktokLabel: 'تيك توك',
          telegramLabel: 'تيليجرام',
          copyright: 'صالح بوخضر. جميع الحقوق محفوظة.',
          developedBy: 'تطوير',

          /* ── About extras ── */
          roleTrainer:       'مدرب',
          rolePentester:     'مختبر اختراق',
          roleAnalyst:       'محلل أمني',
          statFollowers:     'متابع\nعبر المنصات',
          statVisitors:      'زيارة\nللموقع',
          statProjects:      'مسابقة\nومشروع',
          tagPentesting:     'اختبار اختراق الويب',
          tagVuln:           'تحليل الثغرات',
          tagConsulting:     'الاستشارات الأمنية',
          tagAwareness:      'الوعي الرقمي',
          footerTagline:     'الأمن والدقة',
          cardRole:          'أمن سيبراني',
          availableLabel:    'متاح للعمل',
          serviceWebPentest: 'اختبار اختراق الويب',
          serviceTraining:   'تدريب أمني',
          serviceConsulting: 'استشارات تقنية',
        },
      },
    },
  });

export default i18n;