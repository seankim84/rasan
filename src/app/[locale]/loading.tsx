export default function Loading() {
  return (
    <main className="mx-auto max-w-[1180px] px-4 py-5 sm:px-6 lg:px-8" aria-busy="true" aria-label="Loading matches">
      <div className="h-[202px] animate-pulse rounded-[24px] bg-[#18211F]/90 sm:h-[306px]" />
      <div className="mt-9 h-8 w-56 animate-pulse rounded-lg bg-[#DEE3DF]" />
      <div className="mt-4 flex gap-2 overflow-hidden">
        {Array.from({ length: 7 }, (_, index) => (
          <div key={index} className="h-[72px] min-w-[64px] animate-pulse rounded-2xl bg-white" />
        ))}
      </div>
      <div className="mt-5 grid max-w-4xl gap-3">
        {Array.from({ length: 3 }, (_, index) => (
          <div key={index} className="h-40 animate-pulse rounded-2xl border border-[#DEE3DF] bg-white" />
        ))}
      </div>
    </main>
  );
}
