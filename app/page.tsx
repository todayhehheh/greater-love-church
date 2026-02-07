"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { MapPin, Clock, Phone, ChevronDown, Heart } from "lucide-react";

export default function Home() {
  const containerRef = useRef(null);

  // Section 2: Image Transition
  const messageRef = useRef(null);
  const isMessageInView = useInView(messageRef, { margin: "-20% 0px -20% 0px" });

  // Section 1: Typing Effect
  const [textStage, setTextStage] = useState(0);
  const [typedText, setTypedText] = useState("");

  const fullText1 = "긍휼이 풍성하신 하나님이...";
  const fullText2 = "우리를 사랑하신 그...";

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (textStage === 0) {
      if (typedText.length < fullText1.length) {
        timeout = setTimeout(() => setTypedText(fullText1.slice(0, typedText.length + 1)), 100);
      } else {
        timeout = setTimeout(() => { setTextStage(1); setTypedText(""); }, 1500);
      }
    } else if (textStage === 1) {
      if (typedText.length < fullText2.length) {
        timeout = setTimeout(() => setTypedText(fullText2.slice(0, typedText.length + 1)), 100);
      } else {
        timeout = setTimeout(() => setTextStage(2), 1000);
      }
    }
    return () => clearTimeout(timeout);
  }, [typedText, textStage]);

  return (
    <main ref={containerRef} className="bg-[#FDFBF7] text-[#3A3430] font-pretendard selection:bg-[#D97706] selection:text-white overflow-hidden">

      {/* 1. Intro Section: Typing & Warmth */}
      <section className="h-screen relative flex flex-col items-center justify-center text-center px-4 bg-gradient-to-b from-[#FFFDF9] to-[#FDFBF7]">

        <div className="absolute top-0 left-0 w-full h-full opacity-50 overflow-hidden pointer-events-none">
          <div className="absolute top-[20%] left-[10%] w-[30vw] h-[30vw] bg-orange-100 rounded-full blur-[100px]" />
          <div className="absolute bottom-[20%] right-[10%] w-[40vw] h-[40vw] bg-yellow-100 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 h-[200px] flex flex-col items-center justify-center">
          {textStage < 2 ? (
            <h1 className="font-gowun text-3xl md:text-5xl font-bold min-h-[60px] text-gray-400">
              {typedText}<span className="animate-pulse">|</span>
            </h1>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              <h1 className="font-gowun text-6xl md:text-9xl font-bold text-[#3A3430] mb-4">
                크신 사랑
              </h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="font-gowun text-xl md:text-2xl text-[#D97706]"
              >
                당신을 향한 가장 큰 사랑, 여기서 시작됩니다.
              </motion.p>
            </motion.div>
          )}
        </div>

        {textStage === 2 && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
            className="mt-16 bg-[#3A3430] text-white px-8 py-3 rounded-full font-medium shadow-lg hover:bg-[#D97706] transition-colors flex items-center gap-2"
          >
            예배 시간 확인하기 <ChevronDown className="w-4 h-4" />
          </motion.button>
        )}
      </section>


      {/* 2. The Message: Pastor's Welcome */}
      <section ref={messageRef} className="py-32 px-6 md:px-20 relative bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* Dynamic Image: B&W -> Color */}
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/pastor.png"
              alt="Pastor An"
              fill
              className={`object-cover transition-all duration-1000 ease-out ${isMessageInView ? 'grayscale-0 scale-100' : 'grayscale scale-110'}`}
            />
            <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur px-6 py-2 rounded-full shadow-sm">
              <span className="font-gowun text-sm font-bold">담임목사 안광성</span>
            </div>
          </div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="font-gowun text-3xl md:text-5xl font-bold leading-tight">
              "안녕하세요,<br />
              <span className="text-[#D97706]">크신 사랑</span>을 전합니다."
            </h2>
            <div className="space-y-6 text-lg leading-relaxed text-gray-600 font-gowun">
              <p>
                세상은 빠르게 변하고, 때로는 그 속도에 지쳐 넘어지기도 합니다.
                하지만 변하지 않는 것이 딱 하나 있습니다.
                바로 당신을 향한 하나님의 '크신 사랑'입니다.
              </p>
              <p>
                우리 교회는 화려한 프로그램보다 진실한 위로를,
                복잡한 절차보다 따뜻한 환대를 약속합니다.
                당신의 있는 모습 그대로를 환영합니다.
              </p>
            </div>
            <div className="p-6 bg-[#FDFBF7] rounded-xl border border-[#D97706]/20">
              <p className="font-gowun text-[#D97706] text-center italic">
                "사랑 안에 두려움이 없고 온전한 사랑이 두려움을 내쫓나니" (요일 4:18)
              </p>
            </div>
          </motion.div>
        </div>
      </section>


      {/* 3. Our Values: Card Flip */}
      <section className="py-32 bg-[#FDFBF7]">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="font-gowun text-3xl md:text-4xl font-bold mb-16">복음의 핵심 가치</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FlipCard
              title="TRUTH"
              subtitle="진리"
              content="진리를 알지니 진리가 너희를 자유롭게 하리라 (요 8:32) - 변치 않는 복음의 가치를 따릅니다."
            />
            <FlipCard
              title="GRACE"
              subtitle="은혜"
              content="너희는 그 은혜에 의하여 믿음으로 말미암아 구원을 받았으니 (엡 2:8) - 자격 없는 자에게 주시는 선물입니다."
            />
            <FlipCard
              title="LOVE"
              subtitle="사랑"
              content="하나님이 우리를 사랑하시는 사랑을 우리가 알고 믿었노니 (요일 4:16) - 우리는 서로 사랑함으로 제자가 됩니다."
            />
          </div>
        </div>
      </section>


      {/* 4. Info & Map: Warm Invitation */}
      <section className="py-32 px-6 bg-[#3A3430] text-white">
        <div className="max-w-5xl mx-auto rounded-3xl bg-white text-[#3A3430] p-10 md:p-16 shadow-2xl relative overflow-hidden">

          {/* Decorative Background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-100 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="font-gowun text-3xl md:text-4xl font-bold mb-6">
                이번 주 일요일,<br />
                <span className="text-[#D97706]">따뜻한 차 한 잔</span> 어때요?
              </h2>
              <p className="text-gray-500 mb-10">
                부담 없이 편하게 오셔서 쉼을 얻어가세요.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-[#FDFBF7] flex items-center justify-center group-hover:bg-[#D97706] group-hover:text-white transition-colors">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold">When</p>
                    <p className="text-gray-600">매주 일요일 오후 3시</p>
                    <p className="text-xs text-[#D97706]">늦잠 자고 와도 괜찮아요!</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-[#FDFBF7] flex items-center justify-center group-hover:bg-[#D97706] group-hover:text-white transition-colors">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold">Where</p>
                    <p className="text-gray-600">서울 노원구 동일로173가길 69, 2층</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-[#FDFBF7] flex items-center justify-center group-hover:bg-[#D97706] group-hover:text-white transition-colors">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold">Contact</p>
                    <p className="text-gray-600">010-2947-2071</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-full flex flex-col justify-end">
              <div className="bg-gray-100 rounded-xl h-48 md:h-64 mb-6 flex items-center justify-center text-gray-400">
                {/* Map Placeholder */}
                <span className="font-gowun">지도 영역 (Kakao Map)</span>
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=크신사랑교회"
                target="_blank"
                rel="noreferrer"
                className="w-full block py-4 bg-[#4285F4] text-white text-center font-bold rounded-xl hover:bg-[#3367D6] transition-colors shadow-sm"
              >
                구글 맵으로 길찾기 🗺️
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 text-center text-gray-400 text-sm bg-[#3A3430]">
        &copy; 2026 GREATER LOVE CHURCH. All Rights Reserved.
      </footer>
    </main>
  );
}

interface FlipCardProps {
  title: string;
  subtitle: string;
  content: string;
}

function FlipCard({ title, subtitle, content }: FlipCardProps) {
  return (
    <div className="group h-[320px] perspective-1000 cursor-pointer">
      <div className="relative w-full h-full duration-500 transform-style-3d group-hover:rotate-y-180 group-focus:rotate-y-180">
        {/* Front */}
        <div className="absolute w-full h-full bg-white rounded-2xl shadow-xl flex flex-col items-center justify-center backface-hidden border border-gray-100">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6 text-[#D97706]">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-3xl font-bold text-[#3A3430] p-4">{title}</h3>
          <p className="text-gray-500">{subtitle}</p>
        </div>

        {/* Back (Rotated) */}
        <div className="absolute w-full h-full bg-[#3A3430] text-white rounded-2xl shadow-xl flex flex-col items-center justify-center p-8 backface-hidden rotate-y-180">
          <p className="font-gowun text-lg leading-relaxed mb-4">
            "{content.split(' - ')[0]}"
          </p>
          <div className="w-8 h-[1px] bg-[#D97706] mb-4" />
          <p className="text-sm text-gray-300">
            {content.split(' - ')[1]}
          </p>
        </div>
      </div>
    </div>
  );
}
