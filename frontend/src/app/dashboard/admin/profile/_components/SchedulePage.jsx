import SlotRatingsTable from './SlotRatingsTable'

export default function SchedulePage() {
  return (
    <div className="w-full  mx-auto">
      <h1 className="text-2xl text-[#240066] font-bold text-center">Расписание — анализ пригодности слотов</h1>
      <SlotRatingsTable />
    </div>
  )
}
