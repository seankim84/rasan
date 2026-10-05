import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { Match } from "@/domain/types/match";
import { MatchList } from "@/features/matches/components/match-list";
import { getMessages } from "@/lib/i18n/messages";

const match: Match = {
  id: "match-1",
  venueName: "Sân bóng Thảo Điền",
  district: "Quận 2",
  districtSlug: "quan-2",
  startsAt: "2026-10-03T19:00:00+07:00",
  durationMinutes: 90,
  format: "5v5",
  feeVnd: 120_000,
  spotsLeft: 2,
  status: "open",
  onsitePayment: false,
  facilities: ["indoor", "parking"],
  surface: "indoor",
};

describe("MatchList", () => {
  it("renders the scannable match facts", () => {
    render(<MatchList matches={[match]} locale="vi" messages={getMessages("vi")} onReset={vi.fn()} />);
    expect(screen.getByText("19:00")).toBeInTheDocument();
    expect(screen.getByText("Sân bóng Thảo Điền")).toBeInTheDocument();
    expect(screen.getByText(/120\.000/)).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/vi/matches/match-1");
  });

  it("shows a useful empty state", () => {
    const onReset = vi.fn();
    render(<MatchList matches={[]} locale="ko" messages={getMessages("ko")} onReset={onReset} />);
    expect(screen.getByText("조건에 맞는 경기가 없습니다")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "필터 초기화" }));
    expect(onReset).toHaveBeenCalledOnce();
  });

  it("labels a closed match as closed instead of available", () => {
    render(
      <MatchList
        matches={[{ ...match, status: "closed", spotsLeft: 4 }]}
        locale="vi"
        messages={getMessages("vi")}
        onReset={vi.fn()}
      />,
    );
    expect(screen.getByText("Đã đóng")).toBeInTheDocument();
    expect(screen.queryByText("Còn 4 chỗ")).not.toBeInTheDocument();
  });
});
