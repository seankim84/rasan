"use client";

import { AlertTriangle, RotateCcw } from "lucide-react";
import { useParams } from "next/navigation";
import { isLocale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const params = useParams<{ locale: string }>();
  const locale = isLocale(params.locale) ? params.locale : "vi";
  const messages = getMessages(locale);

  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 text-center">
      <div className="max-w-md rounded-2xl border border-[#DEE3DF] bg-white p-8">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-[#FFF0EB] text-[#D94242]">
          <AlertTriangle aria-hidden="true" size={26} />
        </div>
        <h1 className="mt-5 text-xl font-black">{messages.matches.errorTitle}</h1>
        <p className="mt-2 text-sm text-[#606964]">{messages.matches.errorDescription}</p>
        <button type="button" onClick={reset} className="mx-auto mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#18211F] px-5 text-sm font-bold text-white">
          <RotateCcw aria-hidden="true" size={17} />
          {messages.matches.retry}
        </button>
      </div>
    </main>
  );
}
