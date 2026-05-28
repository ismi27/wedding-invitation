"use client"

import FallingPetals from "@/components/FallingPetals"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react";
import { MoveHorizontal } from "lucide-react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css";
import Image from "next/image"
import {
  CalendarDays,
  MapPin,
  Heart,
  Send,
  GitBranch,
  Music2,
  PauseCircle,
  PlayCircle,
  Gift,
  Copy,
} from "lucide-react"

export default function WeddingInvitation() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert("✨ Berhasil disalin")
  }
  const handleImageLoad = (key: string) => {
    setImagesLoaded((prev) => ({
      ...prev,
      [key]: true,
    }))
  }
  const [opened, setOpened] = useState(false)
  const [guestName, setGuestName] = useState("")
  const weddingDate = new Date("2026-06-28T09:00:00")
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [formData, setFormData] = useState({
    nama: "",
    kehadiran: "Akan Hadir",
    jumlahTamu: "",
    ucapan: "",
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [imagesLoaded, setImagesLoaded] = useState<
    Record<string, boolean>
  >({})
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const allowedGuests = [
    "Randi",
    "Budi",
    "Nadia",
    "Asep",
  ]
  const [isValidGuest, setIsValidGuest] = useState(false)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const to = params.get("to")

    if (to) {
      setGuestName(to)

      const valid = allowedGuests.includes(to)
      setIsValidGuest(valid)
    }

  }, [])



  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = weddingDate.getTime() - now

      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
      )

      const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) /
        (1000 * 60)
      )

      const seconds = Math.floor(
        (distance % (1000 * 60)) / 1000
      )

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()

    if (
      !formData.nama ||
      !formData.kehadiran ||
      !formData.jumlahTamu ||
      !formData.ucapan
    ) {
      alert("Mohon isi semua form ❤️")
      return
    }

    setLoading(true)

    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbzwzrvzjBWRh7jmqdngS5SUlIigveZR6w_sPngDFC65pWDeHwYqYaMGhcffBu-WjyIA/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
          }),
        }
      )

      setSuccess(true)
      const whatsappMessage = [
        "Halo Abdul Haris & Ismi ✨",
        "",
        "Saya telah mengisi RSVP untuk acara pernikahan.",
        "",
        `Nama:\n${formData.nama}`,
        "",
        `Kehadiran:\n${formData.kehadiran}`,
        "",
        `Jumlah Tamu:\n${formData.jumlahTamu} Orang`,
        "",
        `Ucapan:\n${formData.ucapan}`,
      ].join("\n")


      window.open(
        `https://wa.me/6285928052074?text=${encodeURIComponent(
          whatsappMessage
        )}`,
        "_blank"
      )

      setFormData({
        nama: "",
        kehadiran: "Akan Hadir",
        jumlahTamu: "",
        ucapan: "",
      })

    } catch (error) {
      console.error(error)
      alert("Gagal mengirim RSVP")
    }

    setLoading(false)
  }

  return (
    <>
      {!isValidGuest ? (
        <div className="min-h-[100svh] bg-[#140F22] text-white flex items-center justify-center text-center px-6">
          <div className="max-w-md">
            <h1 className="text-3xl md:text-4xl font-semibold text-[#FFF8F0]">
              Undangan Tidak Valid
            </h1>

            <p className="mt-4 text-[#FFF8F0]/70 leading-relaxed">
              Mohon gunakan link undangan resmi
              yang telah diberikan kepada Bapak/Ibu/Saudara/i.
            </p>
          </div>
        </div>
      ) : (
        <>
          <audio ref={audioRef} loop>
            <source src="/music/wedding.mp3" type="audio/mpeg" />
          </audio>

          {!opened ? (
            <div className="relative min-h-[100svh] text-white flex items-center justify-center px-6 overflow-hidden">

              <div
                className="absolute inset-0 -z-10"
              >
                {/* Desktop */}
                <div
                  className="
      hidden md:block
      absolute inset-0
      bg-cover bg-center bg-no-repeat
    "
                  style={{
                    backgroundImage: "url('/images/gate-bg2.png')",
                  }}
                />

                {/* Mobile */}
                <div
                  className="
      block md:hidden
      absolute inset-0
      bg-cover bg-center bg-no-repeat
    "
                  style={{
                    backgroundImage: "url('/images/mobile-gate-bg2.png')",
                  }}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-[#1A1721]/52" />
              </div>

              {/* DARK OVERLAY */}
              <div className="absolute inset-0 bg-[#221B1A]/38" />

              {/* PINK GLOW */}
              <div className="absolute left-[-120px] top-[10%] w-[220px] h-[220px] md:w-[400px] md:h-[400px] bg-[#E6D5C8]/16 blur-[120px] rounded-full" />

              <div className="absolute right-[-120px] bottom-[10%] w-[220px] h-[220px] md:w-[400px] md:h-[400px] bg-[#7B5A67]/12 blur-[120px] rounded-full" />

              {/* CONTENT */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="relative z-10 text-center max-w-2xl"
              >
                <p className="text-[#E7C7D1] font-mono mb-4 tracking-widest">
            // marriage release v1.0.0
                </p>

                <div className="mb-6">
                  <p className="text-[#FFF8F0] italic text-xl md:text-2xl md:text-3xl md:text-4xl font-light tracking-wide">
                    The Wedding Of
                  </p>

                  {/* ORNAMENT */}
                  <div className="flex items-center justify-center gap-4 mt-3">
                    <div className="w-20 h-[1px] bg-gradient-to-r from-transparent to-[#E6D5C8]/70" />

                    <div className="text-[#D8C2C7] text-xl">
                      ✦
                    </div>

                    <div className="w-20 h-[1px] bg-gradient-to-l from-transparent to-[#E6D5C8]/70" />
                  </div>
                </div>

                <h1 className="text-3xl md:text-4xl sm:text-5xl md:text-8xl font-light leading-tight text-[#FFF8F0] drop-shadow-[0_0_24px_rgba(120,82,96,0.22)]">


                  Abdul Haris

                  <div className="flex justify-center my-6">
                    <Heart
                      size={28}
                      className="text-[#E6C9D2]" fill="currentColor"
                    />
                  </div>

                  Ismi Rizki Sopiyanti
                </h1>

                <div className="mt-10 space-y-3">

                  <p className="text-[#F3E5DA]/75 tracking-[0.25em] uppercase text-sm">
                    Kepada Yth.
                  </p>

                  <div className="inline-block px-8 py-4 rounded-2xl bg-[#F5E8DC]/8 border border-[#E6D5C8]/20 backdrop-blur-xl shadow-lg shadow-[#CDA27E]/10">
                    <p className="text-xl md:text-2xl md:text-3xl font-semibold text-white">
                      {guestName}
                    </p>
                  </div>

                  <p className="text-[#F3E5DA]/75 text-lg leading-relaxed max-w-lg mx-auto">
                    Bismillah, dengan penuh kebahagiaan,
                    kami mengundang Bapak/Ibu/Saudara/i untuk hadir
                    dalam hari istimewa kami.
                  </p>

                </div>
                <button
                  onClick={() => {
                    setOpened(true)

                    if (audioRef.current) {
                      audioRef.current.volume = 0.4

                      audioRef.current
                        .play()
                        .then(() => {
                          setMusicPlaying(true)
                        })
                        .catch((err) => {
                          console.log("Autoplay gagal:", err)
                        })
                    }
                  }}
                  className="
mt-10

bg-[#E8C7D0]

text-[#2A1E24]

px-7 py-3
md:px-10 md:py-4

rounded-2xl

font-semibold

shadow-xl
shadow-[#E8C7D0]/25

hover:bg-[#EFD5DC]
hover:scale-105

transition-all
duration-300
"            >
                  Buka Undangan
                </button>
              </motion.div>
            </div>
          ) : (

            <main className="relative min-h-[100svh] text-white overflow-hidden">
              <FallingPetals />
              {/* GLOBAL BACKGROUND */}
              <div className="fixed inset-0 -z-10">

                {/* DESKTOP BACKGROUND */}
                <div
                  className="
      hidden md:block
      absolute inset-0
      bg-cover bg-center bg-no-repeat
    "
                  style={{
                    backgroundImage: "url('/images/fantasy-bg2.png')",
                    backgroundAttachment: "fixed",
                  }}
                />

                {/* MOBILE BACKGROUND */}
                <div
                  className="
      block md:hidden
      absolute inset-0
      bg-cover bg-top bg-no-repeat
    "
                  style={{
                    backgroundImage: "url('/images/mobile-fantasy-bg2.png')",
                  }}
                />

                {/* DARK OVERLAY */}
                <div className="absolute inset-0 bg-[#201A1C]/45" />
                {/* GLOW EFFECT */}
                <div className="absolute left-[-200px] top-[10%] w-[500px] h-[500px] bg-[#E8DCD2]/10 blur-[140px] rounded-full" />

                <div className="absolute right-[-200px] bottom-[10%] w-[500px] h-[500px] bg-[#E8DCD2]/10 blur-[140px] rounded-full" />
              </div>
              <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#E8DCD2]/10 blur-[140px] rounded-full" />

              <div className="absolute bottom-0 right-0 w-[220px] h-[220px] md:w-[400px] md:h-[400px] bg-[#7C5A66]/10 blur-[120px] rounded-full" />
              {/* HERO */}
              <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="relative min-h-[100svh] flex flex-col items-center justify-center text-center px-6 overflow-hidden"          >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#E9D8D2,transparent_40%)] opacity-30" />
                {/* LEFT GLOW */}
                <div className="absolute left-[-100px] top-[20%] w-[220px] h-[220px] md:w-[400px] md:h-[400px] bg-[#E8DCD2]/10 blur-[120px] rounded-full" />

                {/* RIGHT GLOW */}
                <div className="absolute right-[-100px] bottom-[10%] w-[220px] h-[220px] md:w-[400px] md:h-[400px] bg-[#E8DCD2]/10 blur-[120px] rounded-full" />


                <div className="absolute top-6 md:p-6 md:p-6 md:p-6 md:p-6 md:p-8 left-8 flex items-center justify-center gap-2 text-[#E7C7D1] font-mono text-sm z-20">
                  <span>👑</span>
                  <span>// marriage.release v1.0.0</span>
                </div>

                <h1 className="text-3xl md:text-4xl sm:text-5xl md:text-8xl font-light mt-6 leading-tight z-10">
                  Abdul Haris
                  <div className="flex justify-center my-6">
                    <Heart
                      size={28}
                      className="text-[#E6C9D2]" fill="currentColor"
                    />
                  </div>
                  Ismi Rizki Sopiyanti
                </h1>

                <p className="mt-8 text-[#D7DEDC] max-w-xl leading-relaxed z-10">
                  Setelah perjalanan panjang yang penuh cerita,
                  kami siap memulai perjalanan baru bersama.
                </p>

                <div className="grid grid-cols-4 gap-4 mt-12 z-10">
                  <div className="bg-white/10 border border-[#E7D7CF]/15 backdrop-blur-xl rounded-2xl p-4">
                    <p className="text-xl md:text-2xl md:text-3xl font-light">
                      {timeLeft.days}
                    </p>
                    <p className="text-sm text-[#D7DEDC] mt-1">
                      Hari
                    </p>
                  </div>

                  <div className="bg-white/10 border border-[#E7D7CF]/15 backdrop-blur-xl rounded-2xl p-4">
                    <p className="text-xl md:text-2xl md:text-3xl font-light">
                      {timeLeft.hours}
                    </p>
                    <p className="text-sm text-[#D7DEDC] mt-1">
                      Jam
                    </p>
                  </div>

                  <div className="bg-white/10 border border-[#E7D7CF]/15 backdrop-blur-xl rounded-2xl p-4">
                    <p className="text-2xl md:text-3xl font-light">
                      {timeLeft.minutes}
                    </p>
                    <p className="text-sm text-[#D7DEDC] mt-1">
                      Menit
                    </p>
                  </div>

                  <div className="bg-white/10 border border-[#E7D7CF]/15 backdrop-blur-xl rounded-2xl p-4">
                    <p className="text-2xl md:text-3xl font-light">
                      {timeLeft.seconds}
                    </p>
                    <p className="text-sm text-[#D7DEDC] mt-1">
                      Detik
                    </p>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}>

                </motion.div>


                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="mt-10 flex items-center gap-3 text-[#D7DEDC] z-10"
                >
                  {/* <span> Tanggal Resepsi: 28 Juni 2026</span> */}
                </motion.div>
              </motion.section>
              <section className="px-6 py-12">
                <div className="max-w-3xl mx-auto flex justify-center">

                  <div className="relative">

                    {/* LOADER */}
                    {!imagesLoaded["prewed"] && (
                      <div
                        className="
        absolute inset-0
        animate-pulse
        bg-[#E8C7D0]/10
        backdrop-blur-sm
        rounded-t-[80px] md:rounded-t-[120px]
        rounded-b-[20px]
      "
                      />
                    )}

                    <Image
                      src="/images/fotoberdua6.jpg"
                      alt="Prewedding"
                      width={900}
                      height={1200}
                      onLoad={() => handleImageLoad("prewed")}
                      className={`
      w-full
      h-auto
      object-contain
      block
      transition-opacity duration-700

      rounded-t-[80px] md:rounded-t-[120px]
      rounded-b-[20px]

      ${imagesLoaded["prewed"]
                          ? "opacity-100"
                          : "opacity-0"
                        }
    `}
                    />
                  </div>

                </div>
              </section>
              <section className="px-6 py-14 md:py-20">
                <div className="max-w-5xl mx-auto text-center border border-[#E7D7CF]/15 bg-white/5 backdrop-blur-xl rounded-[28px] md:rounded-[40px] px-6 md:px-10 py-10 md:py-16 shadow-2xl shadow-[#CDA27E]/10 relative overflow-hidden">
                  <div className="text-lg md:text-2xl leading-relaxed text-[#D7DEDC] font-light">

                    <p className="text-[#D7B49E] text-xl md:text-2xl leading-loose font-arabic">
                      وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُمْ مِنْ أَنْفُسِكُمْ أَزْوَاجًا
                      لِتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَوَدَّةً وَرَحْمَةً
                    </p>

                    <p className="mt-6 text-[#F5E7D8] text-sm md:text-lg leading-8 max-w-3xl mx-auto">
                      “Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia
                      menciptakan pasangan-pasangan untukmu dari jenismu sendiri,
                      agar kamu cenderung dan merasa tenteram kepadanya, dan Dia
                      menjadikan di antaramu rasa kasih dan sayang.”
                    </p>

                  </div>
                  <div className="absolute top-0 left-0 w-40 h-40 bg-pink-300/10 blur-3xl rounded-t-[140px] rounded-b-[30px]" />
                  <div className="absolute bottom-0 right-0 w-40 h-40 bg-fuchsia-300/10 blur-3xl rounded-t-[140px] rounded-b-[30px]" />

                  <p className="mt-8 text-[#E7C7D1] font-mono">
                    Surah Ar-Ruum : 21
                  </p>

                </div>
              </section>

              <section className="px-6 py-24">
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16">

                  {/* Pengantin Pria */}
                  <div className="text-center">
                    <div className="w-56 h-56 mx-auto rounded-t-[140px] rounded-b-[30px] border-pink-200/30 shadow-2xl shadow-[#CDA27E]/20 overflow-hidden border-4 border-white/10 relative">
                      <Image
                        src="/images/haris.jpg"
                        alt="Pengantin Pria"
                        fill
                        className="object-cover"
                      />
                    </div>

                    <h2 className="text-xl md:text-4xl font-light mt-8">
                      Abdul Haris
                    </h2>

                    <p className="mt-4 text-[#D7DEDC]">
                      Putra pertama dari keluarga
                    </p>

                    <p className="text-l mt-2">
                      Bpk. Lukmanil Hakim
                      <br />
                      & Ibu. Nurmawilis
                    </p>

                    <a
                      href="https://instagram.com/abdharis97"
                      target="_blank"
                      className="
    mt-6
    inline-flex
    items-center
    gap-2
    text-[#E7C7D1]
    font-mono
    hover:text-[#FFF8F0]
    transition
  "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                        <path d="M16 11.37a4 4 0 1 1-4.63-4.63 4 4 0 0 1 4.63 4.63z" />
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                      </svg>

                      abdharis97
                    </a>
                  </div>
                  {/* Pengantin Wanita */}
                  <div className="text-center">
                    <div className="w-44 h-44 md:w-56 md:h-56 mx-auto rounded-t-[140px] rounded-b-[30px] border-pink-200/30 shadow-2xl shadow-[#CDA27E]/20 overflow-hidden border-4 border-white/10 relative">
                      <Image
                        src="/images/ismi.jpg"
                        alt="Pengantin Wanita"
                        fill
                        className="object-cover"
                      />
                    </div>

                    <h2 className="text-xl md:text-4xl font-light mt-8">
                      Ismi Rizki Sopiyanti
                    </h2>

                    <p className="mt-4 text-[#D7DEDC]">
                      Putri pertama dari keluarga
                    </p>

                    <p className="text-l mt-2">
                      Bpk. Abdul Rozak
                      <br />
                      & Ibu. Sopikha
                    </p>

                    <a
                      href="https://instagram.com/itsmerizzkis"
                      target="_blank"
                      className="
    mt-6
    inline-flex
    items-center
    gap-2
    text-[#E7C7D1]
    font-mono
    hover:text-[#FFF8F0]
    transition
  "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                        <path d="M16 11.37a4 4 0 1 1-4.63-4.63 4 4 0 0 1 4.63 4.63z" />
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                      </svg>

                      itsmerizzkis
                    </a>
                  </div>
                </div>
              </section>

              {/* QUOTE */}
              <section className="px-6 py-12">
                <div className="max-w-4xl mx-auto border border-white/10 rounded-3xl p-6 md:p-6 md:p-6 md:p-6 md:p-6 md:p-10 bg-white/5 backdrop-blur-sm">
                  <p className="text-center text-xl md:text-3xl font-light leading-relaxed text-gray-100">
                    “Two souls,
                    <br />
                    one future.”
                  </p>

                  <p
                    className="
    mt-3
    text-sm
    md:text-base
    font-mono
    tracking-[0.3em]
    uppercase

    text-[#D8BEC8]
text-center
    drop-shadow-[0_0_10px_rgba(255,192,203,0.45)]
  "
                  >
                    status: ready for forever
                  </p>
                </div>
              </section>

              {/* EVENT */}
              <section className="px-6 py-20 relative">

                <div className="max-w-6xl mx-auto">

                  {/* TITLE */}
                  <div className="text-center mb-10">
                    <p className="text-[#E7C7D1] font-mono tracking-[0.3em] text-sm md:text-base">
                      ----✦ Save Our Date ✦----
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">

                    {/* AKAD */}
                    <div
                      className="
    relative overflow-hidden

    rounded-[32px]

    border border-[#E7D7CF]/15

bg-white/5
    backdrop-blur-xl

    px-6 py-8

    shadow-[0_0_35px_rgba(255,105,180,0.08)]
  "
                    >

                      {/* CONTENT */}
                      <div className="flex flex-col gap-6">

                        {/* TOP */}
                        <div className="flex items-center gap-7 md:gap-10 px-2 md:px-4">
                          {/* ICON */}
                          <div className="
  relative

  w-[95px] h-[95px]
  md:w-[170px] md:h-[170px]

  flex-shrink-0

  ml-2 md:ml-4
">          {!imagesLoaded["akad"] && (
                              <div className="absolute inset-0 rounded-full bg-[#E8C7D0]/10 animate-pulse" />
                            )}

                            <Image
                              src="/images/icons/akad4.png"
                              alt="Akad"
                              fill
                              onLoad={() => handleImageLoad("akad")}
                              className={`
      object-contain
      transition-opacity duration-500
      ${imagesLoaded["akad"]
                                  ? "opacity-100"
                                  : "opacity-0"
                                }
    `}
                            />
                          </div>

                          {/* TITLE + INFO */}
                          <div className="flex-1 pr-2">
                            <h2
                              className="
            text-2xl
            md:text-4xl

            font-semibold
            text-[#FFF8F0]

            mb-4
          "
                            >
                              Akad
                            </h2>

                            <div
                              className="
            space-y-3

            text-[#FFF8F0]/90

            text-base
            md:text-xl
          "
                            >

                              <p className="flex items-start gap-3">
                                <CalendarDays
                                  size={18}
                                  className="text-[#D8BEC8] mt-1 flex-shrink-0"
                                />
                                Jum&apos;at, 26 Juni 2026
                              </p>

                              <p className="flex items-start gap-3">
                                <span className="mt-1">🕘</span>
                                14.00 WIB - selesai
                              </p>

                            </div>

                          </div>
                        </div>

                        {/* ADDRESS */}
                        <div
                          className="
        text-[#FFF8F0]/90

        text-base
        md:text-lg

        leading-relaxed
      "
                        >
                          <p>
                            Jl. Raya Kayu Tinggi No.7 3, RT.3/RW.3,
                            Cakung Tim., Kec. Cakung,
                            Kota Jakarta Timur,
                            Daerah Khusus Ibukota Jakarta 13910
                          </p>
                        </div>

                        {/* BUTTON */}
                        <div>
                          <a
                            href="https://maps.app.goo.gl/3bKrRfVPNDVDbZcm7"
                            target="_blank"
                            className="
          inline-flex items-center gap-2

          px-7 py-4

          rounded-full

          bg-[#E8C7D0]

          text-[#2b173b]

          font-semibold

          shadow-lg shadow-[#E8C7D0]/15

          hover:scale-105

          transition-all
        "
                          >
                            <MapPin size={18} />
                            Lihat Lokasi
                          </a>
                        </div>

                      </div>
                    </div>

                    {/* RESEPSI */}
                    <div
                      className="
    relative overflow-hidden

    rounded-[32px]

    border border-white/10

    bg-white/5

    backdrop-blur-2xl

    px-6 py-8

    shadow-[0_0_35px_rgba(255,105,180,0.08)]
  "
                    >

                      {/* SPARKLES */}
                      <div
                        className="absolute top-6 left-10 text-[#E7C7D1]/70 text-xl z-20 pointer-events-none"
                        style={{
                          animation: "twinkle 2.5s ease-in-out infinite",
                        }}
                      >
                        ✦
                      </div>

                      <div
                        className="absolute top-10 right-16 text-[#FFF8F0]/70 text-lg z-20 pointer-events-none"
                        style={{
                          animation: "twinkle 3s ease-in-out infinite",
                          animationDelay: "1s",
                        }}
                      >
                        ✦
                      </div>

                      <div
                        className="absolute top-1/2 left-6 text-[#D8BEC8]/70 text-sm z-20 pointer-events-none"
                        style={{
                          animation: "twinkle 2.8s ease-in-out infinite",
                          animationDelay: "2s",
                        }}
                      >
                        ✦
                      </div>

                      <div
                        className="absolute bottom-10 left-1/4 text-[#E7C7D1]/60 text-lg z-20 pointer-events-none"
                        style={{
                          animation: "twinkle 3.2s ease-in-out infinite",
                          animationDelay: "1.5s",
                        }}
                      >
                        ✦
                      </div>

                      <div
                        className="absolute bottom-6 right-10 text-[#FFF8F0]/60 text-xl z-20 pointer-events-none"
                        style={{
                          animation: "twinkle 2.2s ease-in-out infinite",
                          animationDelay: "2.3s",
                        }}
                      >
                        ✦
                      </div>

                      <div
                        className="absolute top-1/3 right-1/3 text-[#D8BEC8]/50 text-sm z-20 pointer-events-none"
                        style={{
                          animation: "twinkle 3.5s ease-in-out infinite",
                          animationDelay: "1.8s",
                        }}
                      >
                        ✦
                      </div>

                      <div
                        className="absolute bottom-1/3 right-20 text-[#E7C7D1]/70 text-base z-20 pointer-events-none"
                        style={{
                          animation: "twinkle 2.7s ease-in-out infinite",
                          animationDelay: "0.8s",
                        }}
                      >
                        ✦
                      </div>

                      <div
                        className="absolute top-20 left-1/2 text-[#FFF8F0]/60 text-xs z-20 pointer-events-none"
                        style={{
                          animation: "twinkle 4s ease-in-out infinite",
                          animationDelay: "2.7s",
                        }}
                      >
                        ✦
                      </div>

                      <div
                        className="absolute bottom-16 left-12 text-[#E7C7D1]/50 text-sm z-20 pointer-events-none"
                        style={{
                          animation: "twinkle 3.8s ease-in-out infinite",
                          animationDelay: "1.1s",
                        }}
                      >
                        ✦
                      </div>

                      <div
                        className="absolute top-14 right-1/3 text-[#FFF8F0]/40 text-xs z-20 pointer-events-none"
                        style={{
                          animation: "twinkle 2.9s ease-in-out infinite",
                          animationDelay: "0.5s",
                        }}
                      >
                        ✦
                      </div>

                      {/* CONTENT */}
                      <div className="flex flex-col gap-6">

                        {/* TOP */}
                        <div className="flex items-center gap-7 md:gap-10 px-2 md:px-4">

                          {/* TEXT */}
                          <div className="flex-1 pr-2">

                            <h2
                              className="
            text-2xl
            md:text-4xl

            font-semibold
            text-[#FFF8F0]

            mb-5
          "
                            >
                              Resepsi
                            </h2>

                            <div
                              className="
            space-y-4

            text-[#FFF8F0]/90

            text-base
            md:text-xl
          "
                            >

                              <p className="flex items-start gap-3">
                                <CalendarDays
                                  size={18}
                                  className="text-[#D8BEC8] mt-1 flex-shrink-0"
                                />
                                Minggu, 28 Juni 2026
                              </p>

                              <p className="flex items-start gap-3">
                                <span className="mt-1">🕘</span>
                                11.00 WIB - selesai
                              </p>

                            </div>

                          </div>

                          {/* ICON */}
                          <div
                            className="
          relative

          w-[95px] h-[95px]
          md:w-[170px] md:h-[170px]

          flex-shrink-0

          mr-2 md:mr-4
        "
                          >
                            <Image
                              src="/images/icons/resepsi4.png"
                              alt="Resepsi"
                              fill
                              className="object-contain"
                            />
                          </div>

                        </div>

                        {/* ADDRESS */}
                        <div
                          className="
        text-[#FFF8F0]/90

        text-base
        md:text-lg

        leading-relaxed

        px-2 md:px-4
      "
                        >
                          <p>
                            Jl. Pabrik Kulit No.101,
                            RT.16/RW.4,
                            Cakung Bar.,
                            Kec. Cakung,
                            Kota Jakarta Timur,
                            Daerah Khusus Ibukota Jakarta 13910
                          </p>
                        </div>

                        {/* BUTTON */}
                        <div className="px-2 md:px-4">
                          <a
                            href="https://maps.app.goo.gl/3bKrRfVPNDVDbZcm7"
                            target="_blank"
                            className="
          inline-flex items-center gap-2

          px-7 py-4

          rounded-full

          bg-[#E8C7D0]

          text-[#2b173b]

          font-semibold

          shadow-lg shadow-[#E8C7D0]/15

          hover:scale-105

          transition-all
        "
                          >
                            <MapPin size={18} />
                            Lihat Lokasi
                          </a>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="px-6 py-12">
                <div className="max-w-5xl mx-auto">
                  <div className="
  flex items-center justify-center gap-2
  text-white
  text-sm md:text-base
  mb-8
  drop-shadow-[0_0_10px_rgba(255,255,255,0.35)]
">
                    <GitBranch size={16} />
                    <p className="
  text-base md:text-lg
  tracking-[0.2em]
  text-white
  font-mono
  drop-shadow-[0_0_10px_rgba(255,255,255,0.35)]
">
                      relationship-history.git
                    </p>   </div>

                  <div className="space-y-8">
                    {[
                      {
                        year: "Mei 2024",
                        title: "first_meet()",
                        image: "/images/1st_meet.JPG",
                        desc: "Awal pertama kali bertemu, foto hanyalah napak tilas. Namun yang benar-benar terekam adalah malam itu—aku bersama anggota Saber duduk di angkringan, bermain kartu Uno di bawah lampu temaram, ditemani gelak tawa yang hangat. Disela-sela itu, kami asyik mengobrol tentang dunia pekerjaan kami",
                      },
                      {
                        year: "Juli 2025",
                        title: "becoming_close()",
                        images: [
                          "/images/2nd_meet.JPG",
                          "/images/2nd_meet4.JPG",
                          "/images/2nd_meet3.JPG",
                        ],
                        desc: "Mulai saling mengenal lebih dekat, bukan hanya lewat langkah mendaki Gunung Slamet bersama—aku yang baru pertama kali menjejak jalur pendakian, dan dia yang baru pertama kali menapaki lantai Perpustakaan Nasional. Dari sana, ia mengenalkan aku pada Sobat Teladan, lingkaran sahabatnya, dan mengajak liburan bersama mereka. Seolah semesta merangkai pertemuan ini dengan cara yang sederhana, tapi penuh makna.",
                      },
                      {
                        year: "November 2025",
                        title: "falling_in_love()",
                        images: [
                          "/images/3rd_meet.JPG",
                          "/images/3rd_meet4.JPG",
                          "/images/3rd_meet3.JPG",
                        ],
                        desc: "Jatuh cinta ibarat mengemudi kapal di lautan—kadang goyah, kadang diterpa masalah, kadang pula dipenuhi cahaya kebahagiaan. Dari setiap pertikaian lahir kesepakatan, dan dari setiap badai kita belajar bahwa kita memang diciptakan untuk terus bersama mengarungi dunia ini. Ada saat aku mendorongnya menjauh, namun ia selalu menarikku kembali, memastikan aku tetap di sisinya.",
                      },
                      {
                        year: "Juni 2026",
                        title: "marriage_release_v1.0.0",
                        image: "/images/fotoberdua5.jpg",
                        desc: "Siap menapaki perjalanan baru bersama. Tak terasa, segala riuh dan rumitnya persiapan ini telah membawa kami sampai di gerbang pernikahan.",
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                        className="
relative overflow-hidden
bg-white/10
border border-white/10
backdrop-blur-xl
rounded-[28px]
p-6 md:p-8
"                      >
                        {item.images ? (
                          <div className="relative">

                            <Swiper
                              modules={[Autoplay, Pagination]}
                              spaceBetween={14}
                              slidesPerView={1.15}
                              centeredSlides={false}
                              loop={true}
                              speed={800}
                              autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                              }}
                              pagination={{
                                clickable: true,
                              }}
                              breakpoints={{
                                768: {
                                  slidesPerView: 2.2,
                                },
                              }}
                              className="w-full"
                            >
                              {item.images.map((img, imgIndex) => (
                                <SwiperSlide key={imgIndex}>
                                  <div
                                    className="
            relative
            h-[420px]
            md:h-[500px]
            overflow-hidden
            rounded-2xl
          "
                                  >
                                    <Image
                                      src={img}
                                      alt={item.title}
                                      fill
                                      className="
              object-cover
              hover:scale-105
              transition
              duration-700
            "
                                    />
                                  </div>
                                </SwiperSlide>
                              ))}
                            </Swiper>

                            {/* swipe hint */}
                            <div
                              className="
      md:hidden
      absolute
      bottom-5
      left-1/2
      -translate-x-1/2
      z-20

      flex items-center gap-2

      px-4 py-2

      rounded-full

      bg-black/30
      backdrop-blur-md

      text-[#FFF8F0]
      text-xs
      font-mono

      pointer-events-none
      animate-pulse
    "
                            >
                              <MoveHorizontal size={14} />
                              Geser
                            </div>

                          </div>
                        ) : (
                          <div
                            className="
      relative
      h-[320px]
      md:h-[420px]
      overflow-hidden
      rounded-2xl
    "
                          >
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              className={`
        object-cover
        hover:scale-105
        transition
        duration-700
        ${item.title === "marriage_release_v1.0.0"
                                  ? "object-[center_68%]"
                                  : "object-center"
                                }
      `}
                            />
                          </div>
                        )}

                        <div className="p-6 md:p-6 md:p-6 md:p-6 md:p-5 md:p-8 flex flex-col justify-center">
                          <p className="text-[#E7C7D1] font-mono">
                            {item.year}
                          </p>

                          <h3 className="text-lg md:text-xl md:text-2xl mt-3 font-semibold">
                            {item.title}
                          </h3>

                          <p className="mt-4 text-[#D7DEDC] leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>

              {/* RSVP */}
              <section className="px-6 py-24">
                <div className="max-w-3xl mx-auto bg-white/10 border border-[#E7D7CF]/15 backdrop-blur-xl rounded-3xl p-6 md:p-6 md:p-6 md:p-6 md:p-10">
                  <div className="text-center">
                    <p className="text-[#E7C7D1] font-mono">
              // kindly rsvp
                    </p>

                    <h2 className="text-3xl md:text-3xl md:text-4xl font-light mt-4">
                      Konfirmasi Kehadiran
                    </h2>

                    <p className="mt-4 text-[#D7DEDC]">
                      Kehadiran dan doa Bapak/Ibu/Saudara/i sangat berarti bagi kami.
                    </p>
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    className="mt-10 space-y-5"
                  >
                    <input
                      type="text"
                      placeholder="Nama Lengkap"
                      value={formData.nama}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          nama: e.target.value,
                        })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-pink-300 transition"
                    />

                    <select
                      value={formData.kehadiran}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          kehadiran: e.target.value,
                        })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-pink-300 transition"
                    >
                      <option>Akan Hadir</option>
                      <option>Tidak Bisa Hadir</option>
                    </select>

                    <input
                      type="number"
                      placeholder="Jumlah Tamu"
                      min={1}
                      max={10}
                      value={formData.jumlahTamu}
                      onChange={(e) => {
                        const value = Number(e.target.value)

                        if (value <= 10) {
                          setFormData({
                            ...formData,
                            jumlahTamu: e.target.value,
                          })
                        }
                      }}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-pink-300 transition"
                    />

                    <textarea
                      placeholder="Ucapan & Doa"
                      rows={5}
                      value={formData.ucapan}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          ucapan: e.target.value,
                        })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-pink-300 transition"
                    />

                    <button
                      type="submit"
                      className="w-full bg-[#E8C7D0] text-black py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition"
                    >
                      <Send size={18} />
                      {loading ? "Mengirim..." : "Kirim RSVP"}                </button>
                  </form>
                  {success && (
                    <div className="mt-6 text-center">
                      <p className="text-[#E7C7D1] text-lg">
                        RSVP berhasil dikirim ✨
                      </p>

                      <p className="mt-2 text-[#FFF8F0]/70 text-sm">
                        Terima kasih atas sudah mengisi form ini ❤️
                      </p>
                    </div>
                  )}
                </div>
              </section>

              {/* FOOTER */}
              <footer className="pb-16 px-6">
                <div className="text-center text-gray-500 text-sm">
                  <p
                    className="
    text-2xl
    md:text-3xl

    text-[#FFF8F0]

    font-light

    tracking-wide

    leading-relaxed

    drop-shadow-[0_0_14px_rgba(255,192,203,0.3)]
  "
                  >
                    Thank you for being part of our story.
                  </p>
                  <div className="mt-2 font-mono text-[#E7C7D1]">
                    <p
                      className="
      mt-3
      text-lg md:text-2xl
      font-mono
      font-semibold
      tracking-wide
      text-black-100
      drop-shadow-[0_0_12px_rgba(255,192,203,0.35)]
    "
                    >
                      marriage.release() → success ❤️
                    </p>
                  </div>
                </div>
              </footer>
              <button
                onClick={() => {
                  if (!audioRef.current) return

                  if (musicPlaying) {
                    audioRef.current.pause()
                  } else {
                    audioRef.current.play()
                  }

                  setMusicPlaying(!musicPlaying)
                }}
                className="fixed top-4 right-4 md:top-6 md:right-6 z-50 bg-[#E8C7D0]/10 border border-[#E7D7CF]/15 backdrop-blur-xl rounded-full px-4 py-2 md:px-5 md:py-3 flex items-center gap-3 text-[#FFF8F0] shadow-lg shadow-[#CDA27E]/10"
              >
                <>
                  <Music2 size={18} />

                  <span className="text-sm">
                    Our Love Song
                  </span>

                  {musicPlaying ? (
                    <PauseCircle size={18} />
                  ) : (
                    <PlayCircle size={18} />
                  )}
                </>
              </button>
              <section className="relative z-10 px-5 md:px-10 py-14 md:py-20">
                <div className="max-w-6xl mx-auto">

                  {/* CARD */}
                  <div className="relative overflow-hidden rounded-[28px] md:rounded-[40px] border border-pink-200/10 bg-white/5 backdrop-blur-2xl shadow-[0_0_80px_rgba(236,72,153,0.08)] p-8 md:p-14">

                    {/* GLOW */}
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-400/5 via-transparent to-purple-500/5 pointer-events-none" />

                    {/* TITLE */}
                    <div className="text-center relative z-10">
                      <p className="text-[#E7C7D1]/70 tracking-[0.3em] text-sm font-mono">
          // wedding gift
                      </p>

                      <h2 className="mt-4 text-lg md:text-2xl sm:text-3xl md:text-5xl font-light text-white">
                        ✨ Send Your Blessing
                      </h2>

                      {/* <p className="mt-6 text-sm md:text-base text-[#FFF8F0]/70 leading-relaxed px-2 max-w-2xl mx-auto">
                        Kehadiran dan doa Anda adalah hadiah terindah bagi kami.
                        Namun jika ingin mengirim tanda kasih,
                        kami dengan senang hati menerimanya.
                      </p> */}
                    </div>

                    {/* CONTENT */}
                    <div
                      className="
    grid
    grid-cols-1
lg:grid-cols-2
    gap-6 md:gap-8
    mt-12 md:mt-14
    relative z-10
  "
                    >
                      {/* DIGITAL GIFT */}
                      <div
                        className="
    rounded-3xl
    border border-pink-200/10
    bg-[#ffffff08]
    backdrop-blur-xl
    p-5 md:p-8
    h-full
  "
                      >
                        {/* TITLE */}
                        <div className="flex items-center gap-3 text-[#E7C7D1]">
                          <Gift />

                          <h3 className="text-xl md:text-2xl font-semibold">
                            Digital Gift
                          </h3>
                        </div>

                        <p className="mt-4 text-sm text-[#FFF8F0]/60 leading-relaxed">
                          Kirim tanda kasih secara digital melalui rekening berikut ✨
                        </p>

                        {/* LIST REKENING */}
                        <div className="mt-8 space-y-5">

                          {[
                            {
                              bank: "BCA Digital",
                              logo: "/images/banks/blu.png",
                              name: "a.n Ismi Rizki Sopiyanti",
                              number: "006183203745",
                            },
                            {
                              bank: "SeaBank",
                              logo: "/images/banks/seabank2.png",
                              name: "a.n Ismi Rizki Sopiyanti",
                              number: "901639849849",
                            },
                            {
                              bank: "SeaBank",
                              logo: "/images/banks/seabank2.png",
                              name: "a.n Abdul Haris",
                              number: "901256972345",
                            },
                            {
                              bank: "BNI",
                              logo: "/images/banks/bni2.png",
                              name: "a.n Abdul Haris",
                              number: "1775493133",
                            },
                          ].map((item, index) => (
                            <div
                              key={index}
                              className="
          rounded-2xl
          border border-[#D6BFA7]/10
          bg-black/10
          p-5
          md:p-6
        "
                            >
                              <div className="flex items-center gap-3">

                                <div className="
  w-10 h-10
  rounded-xl
  bg-white/10
  flex items-center justify-center
  overflow-hidden
  border border-white/10
  shadow-lg shadow-[#CDA27E]/10
">
                                  <Image
                                    src={item.logo}
                                    alt={item.bank}
                                    width={28}
                                    height={28}
                                    className="object-contain"
                                  />
                                </div>

                                <div>
                                  <p className="text-sm text-[#FFF8F0]/50">
                                    {item.bank}
                                  </p>

                                  <p className="text-sm text-white/80">
                                    {item.name}
                                  </p>
                                </div>

                              </div>
                              <h4
                                className="
            mt-3
            text-xl md:text-2xl
            font-bold
            tracking-widest
            text-white
            break-all
          "
                              >
                                {item.number}
                              </h4>

                              <button
                                onClick={() =>
                                  copyToClipboard(item.number)
                                }
                                className="
  mt-5
  w-full
  px-4 py-3
  rounded-2xl
  bg-[#E8C7D0]
  text-[#2B1F24]
  font-medium
  hover:bg-[#F1D7DE]
  transition-all
  duration-300
"
                              >
                                <div className="flex items-center justify-center gap-2">
                                  <Copy size={18} />
                                  Salin Rekening
                                </div>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* RIGHT COLUMN */}
                      <div className="flex flex-col gap-6 md:gap-8">

                        {/* QR GIFT */}
                        <div
                          className="
      rounded-3xl
      border border-pink-200/10
      bg-[#ffffff08]
      backdrop-blur-xl
      p-5 md:p-8
      flex flex-col
      items-center
      text-center
    "
                        >
                          <div>
                            <div className="flex items-center justify-center gap-3 text-[#E7C7D1]">
                              <Gift />

                              <h3 className="text-xl md:text-2xl font-semibold">
                                Instant QR Gift
                              </h3>
                            </div>

                            <p className="mt-4 text-sm text-[#FFF8F0]/60 leading-relaxed">
                              Scan QR berikut untuk mengirim tanda kasih secara praktis ✨
                            </p>
                          </div>

                          <div className="mt-10 flex justify-center">
                            <div className="bg-white p-4 rounded-3xl shadow-2xl shadow-[#CDA27E]/10">
                              <Image
                                src="/images/qris.png"
                                alt="QRIS"
                                width={220}
                                height={220}
                                className="rounded-2xl"
                              />
                            </div>
                          </div>

                          <p className="mt-8 text-sm text-[#FFF8F0]/50 text-center">
                            ABDUL HARIS, DIGITAL & KREATIF
                          </p>
                        </div>

                        {/* PHYSICAL GIFT */}
                        <div
                          className="
      rounded-3xl
      border border-pink-200/10
      bg-[#ffffff08]
      backdrop-blur-xl
      p-5 md:p-8
      flex-1
    "
                        >
                          <div className="flex items-center gap-3 text-[#E7C7D1]">
                            <MapPin />

                            <h3 className="text-xl md:text-2xl font-semibold">
                              Physical Gift
                            </h3>
                          </div>

                          <p className="mt-4 text-sm text-[#FFF8F0]/60 leading-relaxed">
                            Untuk pengiriman hadiah fisik ✨
                          </p>

                          <div
                            className="
        mt-8
        rounded-2xl
        border border-[#D6BFA7]/10
        bg-black/10
        p-5 md:p-6
      "
                          >

                            <p className="mt-4 text-sm md:text-base text-white leading-relaxed">
                              Jl. Cakung Cilincing Barat No.22, RT 004 RW 016 Kel. Cakung Barat Kec. Cakung
                              <br />
                              Jakarta Timur 13910
                            </p>

                            <a
                              href="https://maps.google.com"
                              target="_blank"
                              className="
          inline-flex
          items-center
          justify-center
          mt-5
          w-full
          px-4 py-3
          rounded-2xl
          bg-white/10
          border border-pink-200/10
          text-[#FFF8F0]
          hover:bg-white/20
          transition-all
        "
                            >
                              Lihat Lokasi
                            </a>
                            <button
                              onClick={() =>
                                copyToClipboard(
                                  "Jl. Cakung Cilincing Barat No.22, RT 004 RW 016 Kel. Cakung Barat Kec. Cakung Jakarta Timur 13910"
                                )
                              }
                              className="
    inline-flex
    items-center
    justify-center
    mt-4
    w-full
    px-4 py-3
    rounded-2xl
    bg-[#E8C7D0]
    text-[#2B1F24]
    font-medium
    hover:bg-[#F1D7DE]
    transition-all
  "
                            >
                              <Copy size={18} className="mr-2" />
                              Salin Alamat
                            </button>
                          </div>
                        </div>

                      </div>

                    </div>


                    {/* FOOTER */}
                    <div className="mt-14 text-center relative z-10">
                      <p
                        className="
    text-xl
    md:text-3xl

    text-[#FFF8F0]

    font-medium

    tracking-wide

    leading-relaxed

    drop-shadow-[0_0_16px_rgba(255,192,203,0.35)]
  "
                      >
                        ✨ Every blessing means the world to us ✨
                      </p>
                    </div>
                  </div>
                  <p
                    className="
        mt-10

        text-sm
        md:text-base

        text-[#FFF8F0]/60

        font-mono

        tracking-[0.2em]
      "
                  >
                    © 2026 Ismi & Haris — Powered by Love
                  </p>
                </div>
              </section>
            </main>
          )}
        </>
      )}
    </>
  )
}
