import { ArrowDown, Sparkles } from "lucide-react";
import type { Messages } from "@/lib/i18n/messages";

export function Hero({ messages }: { messages: Messages }) {
  return (
    <section className="court-grid relative isolate min-h-[202px] overflow-hidden rounded-[24px] bg-[#101817] px-6 py-7 text-white sm:min-h-[260px] sm:px-10 sm:py-10 lg:min-h-[306px] lg:px-14 lg:py-12">
      <div className="absolute -right-18 -top-28 size-72 rounded-full border-[34px] border-[#FF5A36]/90 sm:size-96" aria-hidden="true" />
      <div className="absolute -bottom-24 right-[18%] size-52 rounded-full border border-white/15" aria-hidden="true" />
      <div className="absolute bottom-0 right-8 h-[74%] w-[34%] border-x border-t border-white/12" aria-hidden="true" />
      <div className="relative z-10 flex h-full max-w-2xl flex-col items-start">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-3 py-1.5 text-xs font-bold tracking-wide text-[#FFB39F]">
          <Sparkles aria-hidden="true" size={14} />
          {messages.matches.heroBadge}
        </div>
        <h1
          className="max-w-xl text-[30px] font-black leading-[1.16] tracking-[-0.045em] text-white sm:text-5xl lg:text-[54px]"
          style={{ fontFamily: "system-ui, sans-serif" }}
        >
          {messages.matches.heroTitle}
        </h1>
        <p className="mt-3 max-w-lg text-sm leading-6 text-white/72 sm:mt-5 sm:text-base">
          {messages.matches.heroDescription}
        </p>
        <a
          className="mt-6 hidden min-h-11 items-center gap-2 rounded-xl bg-[#FF5A36] px-4 text-sm font-extrabold sm:inline-flex"
          href="#matches"
          style={{ color: "#101817" }}
        >
          {messages.common.explore}
          <ArrowDown aria-hidden="true" size={17} />
        </a>
      </div>
    </section>
  );
}
