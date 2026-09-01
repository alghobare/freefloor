const statNumbers = document.querySelectorAll(".stat-number[data-value]");
statNumbers.forEach((el) => {
  const target = Number(el.dataset.value || 0);
  const suffix = el.dataset.suffix || "";
  const start = performance.now();
  const duration = 1200;

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4);
    const value = Math.round(target * eased);
    el.textContent = `${value}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(tick);
    }
  };

  requestAnimationFrame(tick);
});

const revealTargets = document.querySelectorAll(
  ".phase, .lecture, .flow-card, .stat",
);
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

revealTargets.forEach((el) => observer.observe(el));

// ===== SCROLL TO TOP BUTTON =====
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollToTopBtn.classList.add("visible");
  } else {
    scrollToTopBtn.classList.remove("visible");
  }
});

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// ===== LECTURE ACTION BUTTONS =====
const playButtons = document.querySelectorAll(".action-play");

// ===== ASSIGN A YOUTUBE VIDEO TO EACH LECTURE HERE =====
// Key = lecture number, Value = full YouTube link of that lecture's video
const lectureVideos = {
  1: "https://www.youtube.com/watch?v=n7y4uTE6lrM&list=PLPpFxfIemTzg&index=2", // Lecture 01
  2: "https://www.youtube.com/watch?v=SI0iRaHXAzs&list=PLPpFxfIemTzg&index=2&t=2956s", // Lecture 02
  3: "https://www.youtube.com/watch?v=vQj_XEQcn6E&list=PLPpFxfIemTzg&index=3&t=5219s", // Lecture 03 - paste link here
  4: "", // Lecture 04
  5: "", // Lecture 05
  6: "", // Lecture 06
  7: "", // Lecture 07
  8: "", // Lecture 08
  9: "", // Lecture 09
  10: "", // Lecture 10
  11: "", // Lecture 11
  12: "", // Lecture 12
  13: "", // Lecture 13
  14: "", // Lecture 14
  15: "", // Lecture 15
  16: "", // Lecture 16
  17: "", // Lecture 17
  18: "", // Lecture 18
  19: "", // Lecture 19
  20: "", // Lecture 20
  21: "", // Lecture 21
  22: "", // Lecture 22
  23: "", // Lecture 23
  24: "", // Lecture 24
  25: "", // Lecture 25
  26: "", // Lecture 26
  27: "", // Lecture 27
  28: "", // Lecture 28
  29: "", // Lecture 29
  30: "", // Lecture 30
  31: "", // Lecture 31
  32: "", // Lecture 32
  33: "", // Lecture 33
  34: "", // Lecture 34
  35: "", // Lecture 35
  36: "", // Lecture 36
  37: "", // Lecture 37
  38: "", // Lecture 38
  39: "", // Lecture 39
  40: "", // Lecture 40
  41: "", // Lecture 41
  42: "", // Lecture 42
  43: "", // Lecture 43
  44: "", // Lecture 44
  45: "", // Lecture 45
  46: "", // Lecture 46
  47: "", // Lecture 47
  48: "", // Lecture 48
  49: "", // Lecture 49
  50: "", // Lecture 50
  51: "", // Lecture 51
  52: "", // Lecture 52
  53: "", // Lecture 53
  54: "", // Lecture 54
  55: "", // Lecture 55
  56: "", // Lecture 56
  57: "", // Lecture 57
  58: "", // Lecture 58
  59: "", // Lecture 59
  60: "", // Lecture 60
  61: "", // Lecture 61
  62: "", // Lecture 62
  63: "", // Lecture 63
};

// Extract the video ID from any YouTube URL format
function getVideoId(url) {
  if (!url) return null;
  let match = url.match(/[?&]v=([\w-]{11})/); // youtube.com/watch?v=...
  if (match) return match[1];
  match = url.match(/youtu\.be\/([\w-]{11})/); // youtu.be/...
  if (match) return match[1];
  match = url.match(/embed\/([\w-]{11})/); // youtube.com/embed/...
  if (match) return match[1];
  match = url.match(/shorts\/([\w-]{11})/); // youtube.com/shorts/...
  if (match) return match[1];
  return null;
}

playButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const lectureEl = btn.closest(".lecture");
    const lectureNum = lectureEl
      ? lectureEl.querySelector(".lecture-number").textContent.trim()
      : "1";

    const videoUrl = lectureVideos[Number(lectureNum)] || "";
    const videoId = getVideoId(videoUrl);

    // If no video assigned yet, alert the user
    if (!videoId) {
      alert("الفيديو ده لسه مش متضاف — قريبًا! 🎬");
      return;
    }

    // Create modal with video player
    const modal = document.createElement("div");
    modal.className = "video-modal";

    modal.innerHTML = `
        <div class="video-modal-content">
          <button class="video-modal-close" aria-label="Close video">&times;</button>

          <div class="video-player">
            <iframe
              src="https://www.youtube.com/embed/${videoId}"
              title="Lecture ${lectureNum}"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen>
            </iframe>
          </div>

          <div class="video-modal-footer">
            <p>Lecture ${lectureNum}</p>

            <a
              href="https://www.youtube.com/watch?v=${videoId}"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-youtube">
              Open on YouTube →
            </a>
          </div>
        </div>
      `;

    document.body.appendChild(modal);
    document.body.style.overflow = "hidden";

    const closeBtn = modal.querySelector(".video-modal-close");
    closeBtn.addEventListener("click", () => {
      modal.remove();
      document.body.style.overflow = "auto";
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.remove();
        document.body.style.overflow = "auto";
      }
    });
  });
});
// ===== SUMMARY MODALS =====
// اكتب ملخص كل محاضرة هنا — المفتاح = رقم المحاضرة، القيمة = نص الملخص
// لما تسيبها فاضية "" الزرار هيقول إن الملخص لسه مش متضاف
const lectureSummaries = {
  1: `110 مشاهدات  19‏/08‏/2026  #Linux #ComputerNetworks #WindowsServer

لتحميل جميع البرامج والمحاكيات من قناة التليجرام هنا مباشر:
https://t.me/+KFh57bIoTzYyMDA0

-------------------------------
دورة علم الشبكات والبنية التحتية | من الصفر إلى الاحتراف

"عاهدتُ نفسي أن أخدمَ الإنسانية.. ولا أرقى من محاربة الجهل.. بنشر المعرفة."

مرحبًا بك في دورة علم الشبكات والبنية التحتية (Networking & IT Infrastructure)، دورة عملية تبدأ معك من الصفر، ثم تأخذك خطوة بخطوة إلى فهم الشبكات وتصميمها وإدارتها وتأمينها، وصولًا إلى التعامل مع السيرفرات والبنية التحتية الحديثة.

الدورة ليست مجرد حفظ أوامر Cisco، وإنما محاولة لفهم كيف تعمل الشبكات فعلًا؟ ولماذا تعمل بهذه الطريقة؟ وكيف نبني شبكة حقيقية ونتعامل مع مشاكلها؟

سنبدأ من أبسط سؤال: يعني إيه شبكة؟
ثم نبني أول شبكة بأيدينا، وننتقل تدريجيًا إلى الـ Subnetting والـ Routing والـ VLANs والأمان والسيرفرات والـ Virtualization والـ Cloud والـ SDN، مع التركيز على الجانب العملي وبناء الـ Labs.

🟢 الباب الأول: مدخل إلى علم الشبكات

1️⃣ التعريف بالكورس
- محتوى الدورة وطريقة الدراسة.
- ماذا ستتعلم خلال الرحلة؟
- الأدوات والبرامج المستخدمة.

2️⃣ يعني إيه شبكات؟
- يعني إيه Network؟
- لماذا نستخدم الشبكات؟
- أنواع الشبكات: LAN / MAN / WAN
- الإنترنت: Physical Infrastructure
- كيف تنتقل البيانات عبر البنية التحتية الحقيقية للإنترنت؟

3️⃣ يلا نعمل أول شبكة
- شروط اتصال الأجهزة ببعضها.
- MAC Address
- IPv4 / IPv6
- Subnet
- الكابلات والاتصال اللاسلكي.
- الكابل المحوري Coaxial
- أساسيات كابلات الشبكات.
- تأريج كابل Cat 5.
- Star Topology وأشكال توصيل الأجهزة.
- مقدمة مبسطة عن Mesh Topology.
- Network Architectures
- الفرق بين Centralized و Workgroup
- ما هو الـ Ping وكيف نستخدمه؟
- الإنترنت: Logical Infrastructure

4️⃣ أول شبكة حقيقية
- HUB / SWITCH / ROUTER / MODEM / SERVER / NIC / FIREWALL
- Lab عملي: Switch + 3 Computers

🔵 الباب الثاني: التعمق في البنية التحتية للشبكات

5️⃣ Subnetting
6️⃣ VLSM
7️⃣ Router Configuration
8️⃣ بناء شبكة متعددة (3 شبكات: Router + Switch + 3 Computers)
9️⃣ DHCP Configuration
🔟 Routing Protocols: Static / RIP / EIGRP / OSPF
1️⃣1️⃣ Redundancy Protocols
1️⃣2️⃣ Access Control List (ACL)
1️⃣3️⃣ Extended Access List
1️⃣4️⃣ NAT (Static / Dynamic)
1️⃣5️⃣ NTP
1️⃣6️⃣ Securing Routers
1️⃣7️⃣ VLAN
1️⃣8️⃣ VLAN Types
1️⃣9️⃣ Inter-VLAN Routing
2️⃣0️⃣ Port Security
2️⃣1️⃣ STP
2️⃣2️⃣ IPv6 Routing
2️⃣3️⃣ Wireless Networks
2️⃣4️⃣ EtherChannel
2️⃣5️⃣ DHCP Spoofing
2️⃣6️⃣ CDP & LLDP
2️⃣7️⃣ SNMP & Syslog
2️⃣8️⃣ OSI Model
2️⃣9️⃣ Quality of Service (QoS)
3️⃣0️⃣ Virtualization (VMware)
3️⃣1️⃣ Cloud Computing
3️⃣2️⃣ Software-Defined Networking (SDN)

🟣 الباب الثالث: إدارة السيرفرات
Servers & Systems Administration

🔴 الباب الرابع: مشاريع عملية متكاملة
Networking + Infrastructure + Servers + Security + Virtualization

🎯 هدف الدورة
"لماذا حدثت المشكلة؟ وكيف أعرف مكانها؟ وكيف أصمم الحل؟"
الفهم + التطبيق + بناء الـ Labs + تحليل المشاكل

📚 المحتوى قابل للتحديث — إبدأ من أول فيديو، وابنِ معرفتك من الصفر.

#Networking #CCNA #Cisco #ITInfrastructure #NetworkEngineering #ComputerNetworks #Servers #CyberSecurity #Virtualization #CloudComputing #SDN #Subnetting #Routing #VLAN #Linux #WindowsServer`,
  2: `# 🖥️ تجهيز بيئة العمل للشبكات | Packet Tracer + GNS3 + VMware + VS Code

في الفيديو الثاني من دورة «أسهل الكورسات في علم الشبكات» نبدأ الجزء العملي بتجهيز جهازك بكل الأدوات والبرامج التي سنحتاج إليها خلال رحلتنا في دراسة الشبكات وعلوم الـ IT Infrastructure.

سنقوم بتحميل وتثبيت أهم المحاكيات والبرامج التي ستساعدنا على بناء معامل شبكات افتراضية، وتجربة إعدادات الشبكات، والتعامل مع أنظمة التشغيل والأكواد.

📚 محتويات الفيديو

00:00:00 — مقدمة الفيديو بالكامل
00:02:49 — تحميل محاكي Cisco Packet Tracer
00:08:07 — تحميل وتثبيت VMware Workstation
00:10:42 — تحميل وتثبيت محاكي GNS3
00:34:59 — تحميل وتثبيت محرر الأكواد Sublime Text
00:35:59 — تحميل وتثبيت Visual Studio Code (VS Code)
01:03:04 — تنزيل أنظمة التشغيل ISO
01:09:14 — خاتمة الفيديو

جميع فيديوهات الدورة على الرابط ده:
https://www.youtube.com/playlist?list=PLPpFxfIemTzg

📥 تحميل البرامج والمحاكيات

يمكنك تحميل جميع البرامج والمحاكيات المستخدمة في الدورة من قناة التليجرام الرسمية المخصصة للتحميل:

🔗 قناة Networking Programs | Download:
https://t.me/networking66

القناة مخصصة لتوفير البرامج والمحاكيات المطلوبة لدورة «أسهل الكورسات في علم الشبكات».

🎯 ماذا سنتعلم في هذا الفيديو؟

بنهاية الفيديو ستكون قد جهزت بيئة العمل الأساسية التي سنستخدمها في الدروس القادمة، ومنها:

🔹 Cisco Packet Tracer لمحاكاة شبكات Cisco
🔹 GNS3 لبناء معامل شبكات أكثر احترافية
🔹 VMware لتشغيل أنظمة التشغيل والأجهزة الافتراضية
🔹 VS Code وSublime Text لتحرير الأكواد والملفات
🔹 أنظمة التشغيل ISO لاستخدامها داخل المعامل الافتراضية

🌐 عن دورة «أسهل الكورسات في علم الشبكات»

هذه الدورة تهدف إلى تقديم علم الشبكات بطريقة مبسطة ومنظمة، بدايةً من أساسيات الشبكات وصولًا إلى المفاهيم والتطبيقات العملية التي يحتاجها مهندس الشبكات وموظف الـ IT.

📌 إذا كنت مبتدئًا في مجال الشبكات، فأنصحك بمتابعة الدروس بالترتيب وعدم تخطي الأجزاء الأساسية.

📌 لا تنسَ

👍 اضغط إعجاب إذا استفدت من الفيديو
🔔 اشترك في القناة وفعل جرس التنبيهات
💬 اكتب سؤالك أو استفسارك في التعليقات
📤 شارك الفيديو مع أي شخص مهتم بتعلم الشبكات

«عاهدتُ نفسي أن أخدم الإنسانية.. ولا أرقى من محاربة الجهل.. بنشر المعرفة.» ❤️

#Networking #CCNA #Cisco #PacketTracer #GNS3 #VMware #VSCode #ComputerNetworks #NetworkEngineer #IT #NetworkEngineering #الشبكات #CCNA #مهندس_شبكات`, // Lecture 02
  3: `🌐 الإنترنت من السنترال لحد جهازك — إزاي الإنترنت بيوصل لبيتك؟ | Networking من الصفر

هل عمرك سألت نفسك: إيه اللي بيحصل من لحظة ما تطلب خدمة الإنترنت، لحد ما تفتح موقع أو فيديو على جهازك؟

في المحاضرة دي هتشوف الإنترنت بشكل مختلف تمامًا! مش مجرد Router وWi-Fi وكابل… لكن رحلة كاملة تبدأ من مزود خدمة الإنترنت ISP والسنترال وتوصل لحد جهازك، مع فهم ما يحدث في الخلفية من توصيلات وتجهيزات وLogical Structure وConfiguration.

وفي نفس الوقت، هنبدأ من الأساسيات ونشرح مفهوم الشبكات وأنواعها بشكل علمي وعملي، بحيث تكون الصورة عندك كاملة قبل ما ندخل في التفاصيل المتقدمة.

🔥 المحاضرة مدتها حوالي ساعتين، وهي المحاضرة رقم 3 ضمن دورة علم الشبكات والبنية التحتية | من الصفر إلى الاحتراف.

━━━━━━━━━━━━━━━━━━━━

📚 محتوى المحاضرة:

00:00 تعريف الشبكات بشكل علمي
ما هي الشبكة؟ ولماذا نحتاج إلى الشبكات؟ وكيف يتم التواصل بين الأجهزة؟

15:41 أنواع الشبكات LAN / MAN / WAN
التعرف على أنواع الشبكات واختلافها من حيث النطاق والاستخدام والبنية.

44:22 الإنترنت | الجزء الأول
رحلة الإنترنت من السنترال إلى بيت العميل، وأنواع التوصيلات وأشكال الخطوط المستخدمة.

1:05:15 الإنترنت | الجزء الثاني
ماذا يحدث داخل بيت العميل؟ التوصيلات المختلفة، أنواعها، والأدوات والأجهزة المستخدمة.

1:25:03 الإنترنت | الجزء الثالث
Logical Structure
فهم البنية المنطقية للإنترنت وما يحدث خلف الكواليس.

1:55:31 الإنترنت | الجزء الرابع
Logical Cycle & Configuration
كيف تتم دورة التشغيل والـ Configuration؟ وكيف يتم التعامل مع العميل داخل البنية التحتية لمزود الخدمة؟

━━━━━━━━━━━━━━━━━━━━

💡 ليه المحاضرة دي مختلفة؟

كل كورس CCNA حضرته تقريبًا، لما كان بيوصل لجزئية "إزاي الإنترنت بيشتغل؟" كنت بحس إن الصورة مش كاملة، وإن فيه تفاصيل كتير بتحصل على أرض الواقع ومش بيتم توضيحها بالشكل الكافي.

فقلت: ليه ما نشرحهاش من البداية للنهاية؟

وهنا بدأت فكرة المحاضرة.

هنبدأ من السنترال ومزود خدمة الإنترنت ISP، ونمشي خطوة بخطوة لحد التوصيلات الموجودة داخل بيت العميل، ونحاول نفهم كمان الأجزاء اللي بتحصل في الـ Background، من Logical Structure وConfiguration والأنظمة والسيرفرات المرتبطة بتقديم الخدمة.

والهدف مش إنك تحفظ المعلومة…

🎯 الهدف إنك تفهم الصورة كاملة.

لأن لما تفهم الصورة، هتبدأ تفهم Networking بشكل مختلف تمامًا.

━━━━━━━━━━━━━━━━━━━━

🚀 ودي مجرد بداية!

المحاضرة دي ليست دورة منفصلة، لكنها المحاضرة رقم 3 فقط من دورة:

🌐 دورة علم الشبكات والبنية التحتية | من الصفر إلى الاحتراف

الدورة مبنية على سنوات من الشغف والتعلم والتطبيق والاستمتاع الحقيقي بعالم الشبكات، وهدفها إننا نمشي مع بعض خطوة بخطوة من الأساسيات، وصولًا إلى المستويات المتقدمة في Networking & IT Infrastructure.

ولسه قدامنا الكثير… ومع وصولنا لاحقًا إلى مجالات مثل Cyber Security وCEH، هنبدأ ندخل في مستويات وتفاصيل أعمق بكثير. 🔥🛡️

━━━━━━━━━━━━━━━━━━━━

📺 باقي فيديوهات دورة الشبكات:

https://www.youtube.com/playlist?list=PLPpFxfIemTzg

📢 قناة التليجرام:

https://t.me/networking66

━━━━━━━━━━━━━━━━━━━━

❤️ لو استفدت من الفيديو، متبخلش علينا بـ Like 👍 واشترك في القناة وفعل 🔔 جرس التنبيهات عشان يوصلك كل جديد من الدورة.

ولو عندك سؤال أو نقطة حابب نناقشها، اكتبها في التعليقات.

عاهدتُ نفسي أن أخدمَ الإنسانية.. ولا أرقى من محاربة الجهل.. بنشر المعرفة.

🌐 Networking | IT Infrastructure | Cyber Security

#Networking #NetworkEngineering #ComputerNetworks #ITInfrastructure #CCNA #Cisco #Internet #HowInternetWorks #InternetInfrastructure #LAN #MAN #WAN #ISP #NetworkEngineer #NetworkAdministrator #IT #InformationTechnology #CyberSecurity #CEH #NetworkSecurity #PacketTracer #CiscoNetworking #NetworkingBasics #LearnNetworking #NetworkTutorial #علم_الشبكات #هندسة_الشبكات #شبكات #الشبكات #البنية_التحتية #أمن_المعلومات #الأمن_السيبراني #CCNA_بالعربي #تعلم_الشبكات #عبدالرحمن_الغباري`, // Lecture 03
  4: "", // Lecture 04
  5: "", // Lecture 05
  6: "", // Lecture 06
  7: "", // Lecture 07
  8: "", // Lecture 08
  9: "", // Lecture 09
  10: "", // Lecture 10
  11: "", // Lecture 11
  12: "", // Lecture 12
  13: "", // Lecture 13
  14: "", // Lecture 14
  15: "", // Lecture 15
  16: "", // Lecture 16
  17: "", // Lecture 17
  18: "", // Lecture 18
  19: "", // Lecture 19
  20: "", // Lecture 20
  21: "", // Lecture 21
  22: "", // Lecture 22
  23: "", // Lecture 23
  24: "", // Lecture 24
  25: "", // Lecture 25
  26: "", // Lecture 26
  27: "", // Lecture 27
  28: "", // Lecture 28
  29: "", // Lecture 29
  30: "", // Lecture 30
  31: "", // Lecture 31
  32: "", // Lecture 32
  33: "", // Lecture 33
  34: "", // Lecture 34
  35: "", // Lecture 35
  36: "", // Lecture 36
  37: "", // Lecture 37
  38: "", // Lecture 38
  39: "", // Lecture 39
  40: "", // Lecture 40
  41: "", // Lecture 41
  42: "", // Lecture 42
  43: "", // Lecture 43
  44: "", // Lecture 44
  45: "", // Lecture 45
  46: "", // Lecture 46
  47: "", // Lecture 47
  48: "", // Lecture 48
  49: "", // Lecture 49
  50: "", // Lecture 50
  51: "", // Lecture 51
  52: "", // Lecture 52
  53: "", // Lecture 53
  54: "", // Lecture 54
  55: "", // Lecture 55
  56: "", // Lecture 56
  57: "", // Lecture 57
  58: "", // Lecture 58
  59: "", // Lecture 59
  60: "", // Lecture 60
  61: "", // Lecture 61
  62: "", // Lecture 62
  63: "", // Lecture 63
};

// كل زرار Summary في الصفحة
const summaryButtons = document.querySelectorAll(".action-summary");

summaryButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();

    const lectureEl = btn.closest(".lecture");
    const lectureNum = lectureEl
      ? lectureEl.querySelector(".lecture-number").textContent.trim()
      : "1";

    const summaryText = lectureSummaries[Number(lectureNum)] || "";

    // لو الملخص فاضي
    if (!summaryText.trim()) {
      alert("الملخص ده لسه مش متضاف — قريبًا! 📄");
      return;
    }

    // نافذة الملخص (نفس ستايل نافذة اليوتيوب)
    const modal = document.createElement("div");
    modal.className = "video-modal summary-modal";

    modal.innerHTML = `
      <div class="video-modal-content summary-modal-content">
        <button class="video-modal-close" aria-label="Close summary">&times;</button>

        <div class="summary-modal-header">
          <span class="summary-icon">📄</span>
          <div>
            <h3>Summary — Lecture ${lectureNum}</h3>
            <p>ملخص المحاضرة — تقدر تحمّله كملف نصي من تحت</p>
          </div>
        </div>

        <div class="summary-modal-body">
          <pre class="summary-text"></pre>
        </div>

        <div class="video-modal-footer summary-modal-footer">
          <p>Lecture ${lectureNum} — Summary</p>
          <button class="btn-youtube summary-download-btn">
            ⬇ Download Summary (.txt)
          </button>
        </div>
      </div>
    `;

    // نحط النص كـ textContent عشان يظهر زي ما هو بالظبط
    modal.querySelector(".summary-text").textContent = summaryText;

    document.body.appendChild(modal);
    document.body.style.overflow = "hidden";

    // زرار التحميل — ينزل ملف txt
    modal
      .querySelector(".summary-download-btn")
      .addEventListener("click", () => {
        const blob = new Blob([summaryText], {
          type: "text/plain;charset=utf-8",
        });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `Lecture-${lectureNum}-Summary.txt`;
        link.click();
        URL.revokeObjectURL(link.href);
      });

    // الإغلاق
    const closeModal = () => {
      modal.remove();
      document.body.style.overflow = "auto";
    };

    modal
      .querySelector(".video-modal-close")
      .addEventListener("click", closeModal);
    modal.addEventListener("click", (ev) => {
      if (ev.target === modal) closeModal();
    });
  });
});

// ===== TOPIC LINKS (Wikipedia) — DISABLED =====
// الكود ده كان بيحول كل .topic للينك ويكيبيديا — تم تعطيله بطلبك
// لو حبيت ترجعه، فعل السطر اللي تحت:
// enableTopicLinks();

function enableTopicLinks() {
  const wikipediaSearchUrl = (topicName) =>
    "https://en.wikipedia.org/w/index.php?search=" +
    encodeURIComponent(topicName) +
    "&fulltext=1";

  document.querySelectorAll(".topic").forEach((topicEl) => {
    const name = topicEl.textContent.trim();
    if (!name) return;

    const link = document.createElement("a");
    link.href = wikipediaSearchUrl(name);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.className = topicEl.className;
    link.textContent = name;
    link.title = `Search "${name}" on Wikipedia`;

    topicEl.replaceWith(link);
  });
}
