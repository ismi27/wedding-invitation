export default function CheckinPage({
  params,
}: {
  params: { id: string }
}) {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">

        <h1 className="text-4xl font-bold">
          Undangan Valid ✅
        </h1>

        <p className="mt-4">
          Guest ID:
        </p>

        <p className="text-pink-300 text-2xl mt-2">
          {params.id}
        </p>

      </div>
    </div>
  )
}