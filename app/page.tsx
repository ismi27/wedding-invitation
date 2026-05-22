"use client"

import { QRCodeSVG } from "qrcode.react"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import {
  CalendarDays,
  MapPin,
  Heart,
  Send,
  GitBranch,
  Volume2,
  VolumeX,
  Music2,
  PauseCircle,
  PlayCircle,
} from "lucide-react"

export default function WeddingInvitation() {
  const [generatedGuestId, setGeneratedGuestId] =
    useState("")
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
      const guestId =
        Math.random().toString(36).substring(2, 8).toUpperCase()
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
            guestId,
          }),
        }
      )

      setSuccess(true)
      setGeneratedGuestId(guestId)

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
            <h1 className="text-3xl md:text-4xl font-semibold text-pink-100">
              Undangan Tidak Valid
            </h1>

            <p className="mt-4 text-pink-100/70 leading-relaxed">
              Mohon gunakan link undangan resmi
              yang telah diberikan kepada Anda.
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

              {/* BACKGROUND IMAGE */}
              <div
                className="absolute inset-0 bg-cover bg-top md:bg-center bg-no-repeat"
                style={{
                  backgroundImage: "url('/images/gate-bg.png')",
                }}
              />

              {/* DARK OVERLAY */}
              <div className="absolute inset-0 bg-[#140F22]/55" />

              {/* PINK GLOW */}
              <div className="absolute left-[-120px] top-[10%] w-[220px] h-[220px] md:w-[400px] md:h-[400px] bg-pink-400/20 blur-[120px] rounded-full" />

              <div className="absolute right-[-120px] bottom-[10%] w-[220px] h-[220px] md:w-[400px] md:h-[400px] bg-fuchsia-400/20 blur-[120px] rounded-full" />

              {/* CONTENT */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="relative z-10 text-center max-w-2xl"
              >
                <p className="text-pink-200 font-mono mb-4 tracking-widest">
            // marriage release v1.0.0
                </p>

                <div className="mb-6">
                  <p className="text-pink-100 italic text-xl md:text-2xl md:text-3xl md:text-4xl font-light tracking-wide">
                    The Wedding Of
                  </p>

                  {/* ORNAMENT */}
                  <div className="flex items-center justify-center gap-4 mt-3">
                    <div className="w-20 h-[1px] bg-gradient-to-r from-transparent to-pink-200/70" />

                    <div className="text-pink-200 text-xl">
                      ✦
                    </div>

                    <div className="w-20 h-[1px] bg-gradient-to-l from-transparent to-pink-200/70" />
                  </div>
                </div>

                <h1 className="text-3xl md:text-4xl sm:text-5xl md:text-8xl font-light leading-tight text-pink-100 drop-shadow-[0_0_20px_rgba(255,192,203,0.45)]">


                  Abdul Haris

                  <div className="flex justify-center my-6">
                    <Heart
                      size={28}
                      className="text-pink-200"
                      fill="currentColor"
                    />
                  </div>

                  Ismi Rizki Sopiyanti
                </h1>

                <div className="mt-10 space-y-3">

                  <p className="text-pink-100/80 tracking-[0.25em] uppercase text-sm">
                    Kepada Yth.
                  </p>

                  <div className="inline-block px-8 py-4 rounded-2xl bg-white/10 border border-pink-200/20 backdrop-blur-xl shadow-lg shadow-pink-500/10">
                    <p className="text-xl md:text-2xl md:text-3xl font-semibold text-white">
                      {guestName}
                    </p>
                  </div>

                  <p className="text-pink-100/80 text-lg leading-relaxed max-w-lg mx-auto">
                    Dengan penuh kebahagiaan,
                    kami mengundang Anda untuk hadir
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
                  className="mt-10 bg-gradient-to-r from-pink-200 to-fuchsia-200 text-[#1B1527] px-7 py-3 md:px-10 md:py-4 rounded-2xl font-semibold hover:scale-105 transition-all duration-300 shadow-2xl shadow-pink-300/40"            >
                  Buka Undangan
                </button>
              </motion.div>
            </div>
          ) : (

            <main className="relative min-h-[100svh] text-white overflow-hidden">

              {/* GLOBAL BACKGROUND */}
              <div
                className="fixed inset-0 -z-10 bg-cover bg-top md:bg-center bg-no-repeat"
                style={{
                  backgroundImage: "url('/images/fantasy-bg.png')",
                  backgroundAttachment: "fixed",
                }}
              >
                {/* DARK OVERLAY */}
                <div className="absolute inset-0 bg-[#140F22]/70" />

                {/* EXTRA GLOW */}
                <div className="absolute left-[-200px] top-[10%] w-[500px] h-[500px] bg-pink-400/20 blur-[140px] rounded-full" />

                <div className="absolute right-[-200px] bottom-[10%] w-[500px] h-[500px] bg-fuchsia-400/20 blur-[140px] rounded-full" />
              </div>
              <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-pink-300/20 blur-[140px] rounded-full" />

              <div className="absolute bottom-0 right-0 w-[220px] h-[220px] md:w-[400px] md:h-[400px] bg-fuchsia-300/20 blur-[120px] rounded-full" />
              {/* HERO */}
              <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="relative min-h-[100svh] flex flex-col items-center justify-center text-center px-6 overflow-hidden"          >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#F9A8D4,transparent_40%)] opacity-30" />
                {/* LEFT GLOW */}
                <div className="absolute left-[-100px] top-[20%] w-[220px] h-[220px] md:w-[400px] md:h-[400px] bg-pink-400/20 blur-[120px] rounded-full" />

                {/* RIGHT GLOW */}
                <div className="absolute right-[-100px] bottom-[10%] w-[220px] h-[220px] md:w-[400px] md:h-[400px] bg-fuchsia-400/20 blur-[120px] rounded-full" />

                {/* STARS */}
                <div className="absolute inset-0 opacity-30 bg-[url('/images/stars.png')] bg-cover" />

                <div className="absolute top-6 md:p-6 md:p-6 md:p-6 md:p-6 md:p-8 left-8 flex items-center gap-2 text-pink-200 font-mono text-sm z-20">
                  <span>👑</span>
                  <span>// marriage.release v1.0.0</span>
                </div>

                <h1 className="text-3xl md:text-4xl sm:text-5xl md:text-8xl font-light mt-6 leading-tight z-10">
                  Abdul Haris
                  <div className="flex justify-center my-6">
                    <Heart
                      size={28}
                      className="text-pink-200"
                      fill="currentColor"
                    />
                  </div>
                  Ismi Rizki Sopiyanti
                </h1>

                <p className="mt-8 text-gray-400 max-w-xl leading-relaxed z-10">
                  Setelah perjalanan panjang yang penuh cerita,
                  kami siap memulai perjalanan baru bersama.
                </p>

                <div className="grid grid-cols-4 gap-4 mt-12 z-10">
                  <div className="bg-white/10 border border-pink-200/20 backdrop-blur-xl rounded-2xl p-4">
                    <p className="text-xl md:text-2xl md:text-3xl font-light">
                      {timeLeft.days}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      Hari
                    </p>
                  </div>

                  <div className="bg-white/10 border border-pink-200/20 backdrop-blur-xl rounded-2xl p-4">
                    <p className="text-xl md:text-2xl md:text-3xl font-light">
                      {timeLeft.hours}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      Jam
                    </p>
                  </div>

                  <div className="bg-white/10 border border-pink-200/20 backdrop-blur-xl rounded-2xl p-4">
                    <p className="text-2xl md:text-3xl font-light">
                      {timeLeft.minutes}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      Menit
                    </p>
                  </div>

                  <div className="bg-white/10 border border-pink-200/20 backdrop-blur-xl rounded-2xl p-4">
                    <p className="text-2xl md:text-3xl font-light">
                      {timeLeft.seconds}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
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
                  className="mt-10 flex items-center gap-3 text-gray-300 z-10"
                >
                  {/* <span> Tanggal Resepsi: 28 Juni 2026</span> */}
                </motion.div>
              </motion.section>
              <section className="px-6 py-12">
                <div className="max-w-3xl mx-auto">

                  <div className="relative bg-white p-4 rounded-t-[200px] overflow-hidden border-[6px] border-white/10 h-[380px] md:h-[600px]">
                    <Image
                      src="/images/sample_images.png"
                      alt="Couple"
                      fill
                      className="object-contain" />
                  </div>

                </div>
              </section>
              <section className="px-6 py-20">
                <div className="max-w-5xl mx-auto text-center border border-pink-200/20 bg-white/5 backdrop-blur-xl rounded-[40px] px-6 md:px-10 py-10 md:py-16 shadow-2xl shadow-pink-500/10 relative overflow-hidden">
                  <p className="text-lg md:text-2xl leading-relaxed text-gray-300 font-light">
                    “Dan di antara tanda-tanda (kebesaran)-Nya ialah
                    Dia menciptakan pasangan-pasangan untukmu dari
                    jenismu sendiri, agar kamu cenderung dan merasa
                    tenteram kepadanya, dan Dia menjadikan di antaramu
                    rasa kasih dan sayang.”
                  </p>
                  <div className="absolute top-0 left-0 w-40 h-40 bg-pink-300/10 blur-3xl rounded-t-[140px] rounded-b-[30px]" />
                  <div className="absolute bottom-0 right-0 w-40 h-40 bg-fuchsia-300/10 blur-3xl rounded-t-[140px] rounded-b-[30px]" />

                  <p className="mt-8 text-pink-200 font-mono">
                    Surah Ar-Ruum : 21
                  </p>

                </div>
              </section>

              <section className="px-6 py-24">
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16">

                  {/* Pengantin Wanita */}
                  <div className="text-center">
                    <div className="w-44 h-44 md:w-56 md:h-56 mx-auto rounded-t-[140px] rounded-b-[30px] border-pink-200/30 shadow-2xl shadow-pink-500/20 overflow-hidden border-4 border-white/10 relative">
                      <Image
                        src="/images/sample_images.png"
                        alt="Pengantin Wanita"
                        fill
                        className="object-cover"
                      />
                    </div>

                    <h2 className="text-3xl md:text-4xl font-light mt-8">
                      Ismi Rizki Sopiyanti
                    </h2>

                    <p className="mt-4 text-gray-400">
                      Putri dari keluarga
                    </p>

                    <p className="text-xl mt-2">
                      Bpk. [Nama Ayah]
                      <br />
                      & Ibu. [Nama Ibu]
                    </p>

                    <p className="mt-6 text-pink-200 font-mono">
                      @instagram_ismi
                    </p>
                  </div>

                  {/* Pengantin Pria */}
                  <div className="text-center">
                    <div className="w-56 h-56 mx-auto rounded-t-[140px] rounded-b-[30px] border-pink-200/30 shadow-2xl shadow-pink-500/20 overflow-hidden border-4 border-white/10 relative">
                      <Image
                        src="/images/sample_images.png"
                        alt="Pengantin Pria"
                        fill
                        className="object-cover"
                      />
                    </div>

                    <h2 className="text-3xl md:text-4xl font-light mt-8">
                      Abdul Haris
                    </h2>

                    <p className="mt-4 text-gray-400">
                      Putra dari keluarga
                    </p>

                    <p className="text-xl mt-2">
                      Bpk. [Nama Ayah]
                      <br />
                      & Ibu. [Nama Ibu]
                    </p>

                    <p className="mt-6 text-pink-200 font-mono">
                      @instagram_haris
                    </p>
                  </div>

                </div>
              </section>

              {/* QUOTE */}
              <section className="px-6 py-12">
                <div className="max-w-4xl mx-auto border border-white/10 rounded-3xl p-6 md:p-6 md:p-6 md:p-6 md:p-6 md:p-10 bg-white/5 backdrop-blur-sm">
                  <p className="text-center text-2xl md:text-3xl font-light leading-relaxed text-gray-100">
                    “Two souls,
                    <br />
                    one future.”
                  </p>

                  <p className="mt-6 text-center text-gray-400 font-mono text-sm">
                    status: ready for forever ❤️
                  </p>
                </div>
              </section>

              {/* EVENT */}
              <section className="px-6 py-24 relative">
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
                  <div className="bg-white/10 border border-pink-200/20 backdrop-blur-xl rounded-3xl p-6 md:p-6 md:p-6 md:p-6 md:p-6 md:p-8">
                    <div className="flex items-center gap-3 text-pink-200">
                      <CalendarDays />
                      <h2 className="text-lg md:text-2xl font-semibold">Akad Nikah</h2>
                    </div>

                    <div className="mt-6 space-y-2 text-gray-300">
                      <p>Minggu, 28 Juni 2026</p>
                      <p>09.00 WIB</p>
                    </div>
                  </div>

                  <div className="bg-white/10 border border-pink-200/20 backdrop-blur-xl rounded-3xl p-6 md:p-6 md:p-6 md:p-6 md:p-8">
                    <div className="flex items-center gap-3 text-pink-200">
                      <MapPin />
                      <h2 className="text-lg md:text-2xl font-semibold">Resepsi</h2>
                    </div>

                    <div className="mt-6 space-y-2 text-gray-300">
                      <p>Gedung Serbaguna Bandung</p>
                      <p>11.00 WIB - selesai</p>

                      <a
                        href="https://maps.app.goo.gl/3bKrRfVPNDVDbZcm7"
                        target="_blank"
                        className="inline-flex items-center gap-2 mt-4 bg-pink-200 text-[#1B1527] px-5 py-3 rounded-xl font-semibold hover:opacity-90 transition shadow-lg shadow-pink-300/30"                  >
                        <MapPin size={18} />
                        Lihat Lokasi
                      </a>
                    </div>
                  </div>
                </div>
              </section>

              <section className="px-6 py-12">
                <div className="max-w-5xl mx-auto">
                  <div className="flex items-center gap-2 text-gray-400 text-sm mb-8">
                    <GitBranch size={16} />
                    relationship-history.git
                  </div>

                  <div className="space-y-8">
                    {[
                      {
                        year: "2021",
                        title: "first_meet()",
                        image: "/images/sample_images.png",
                        desc: "Awal pertama kali bertemu.",
                      },
                      {
                        year: "2022",
                        title: "becoming_close()",
                        image: "/images/sample_image.jpg",
                        desc: "Mulai mengenal satu sama lain lebih dekat.",
                      },
                      {
                        year: "2023",
                        title: "falling_in_love()",
                        image: "/images/sample_image.jpg",
                        desc: "Perjalanan penuh cerita dan kebahagiaan.",
                      },
                      {
                        year: "2026",
                        title: "marriage_release_v1.0.0",
                        image: "/images/sample_image.jpg",
                        desc: "Siap memulai perjalanan baru bersama.",
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                        className="grid md:grid-cols-2 gap-6 bg-white/10 border border-pink-200/20 backdrop-blur-xl rounded-3xl overflow-hidden"
                      >
                        <div className="relative h-[220px] md:h-[300px]">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover hover:scale-105 transition duration-700"
                          />
                        </div>

                        <div className="p-6 md:p-6 md:p-6 md:p-6 md:p-5 md:p-8 flex flex-col justify-center">
                          <p className="text-pink-200 font-mono">
                            {item.year}
                          </p>

                          <h3 className="text-lg md:text-xl md:text-2xl mt-3 font-semibold">
                            {item.title}
                          </h3>

                          <p className="mt-4 text-gray-400 leading-relaxed">
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
                <div className="max-w-3xl mx-auto bg-white/10 border border-pink-200/20 backdrop-blur-xl rounded-3xl p-6 md:p-6 md:p-6 md:p-6 md:p-10">
                  <div className="text-center">
                    <p className="text-pink-200 font-mono">
              // kindly rsvp
                    </p>

                    <h2 className="text-3xl md:text-3xl md:text-4xl font-light mt-4">
                      Konfirmasi Kehadiran
                    </h2>

                    <p className="mt-4 text-gray-400">
                      Kehadiran dan doa Anda sangat berarti bagi kami.
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
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-green-300 transition"
                    />

                    <select
                      value={formData.kehadiran}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          kehadiran: e.target.value,
                        })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-green-300 transition"
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
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-green-300 transition"
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
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-green-300 transition"
                    />

                    <button
                      type="submit"
                      className="w-full bg-pink-200 text-black py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition"
                    >
                      <Send size={18} />
                      {loading ? "Mengirim..." : "Kirim RSVP"}                </button>
                  </form>
                  {success && (
                    <div className="mt-8 text-center">

                      <p className="text-pink-200">
                        RSVP berhasil dikirim ❤️
                      </p>

                      <div className="mt-6 flex justify-center">
                        <div className="bg-white p-4 rounded-2xl">
                          <QRCodeSVG
                            value={`https://domainlu.com/checkin/${generatedGuestId}`}
                            size={220}
                          />
                        </div>
                      </div>

                      <p className="mt-4 text-pink-100/70 text-sm">
                        Tunjukkan QR ini saat menghadiri acara
                      </p>

                    </div>
                  )}
                </div>
              </section>

              {/* FOOTER */}
              <footer className="pb-16 px-6">
                <div className="text-center text-gray-500 text-sm">
                  <p>Thank you for being part of our story.</p>

                  <p className="mt-2 font-mono text-pink-200">
                    marriage.release() → success ❤️
                  </p>
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
                className="fixed top-4 right-4 md:top-6 md:right-6 z-50 bg-pink-200/10 border border-pink-200/20 backdrop-blur-xl rounded-full px-4 py-2 md:px-5 md:py-3 flex items-center gap-3 text-pink-100 shadow-lg shadow-pink-500/10"
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
            </main>
          )}
        </>
      )}
    </>
  )
}
