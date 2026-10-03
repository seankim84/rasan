import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DateStrip } from "@/features/matches/components/date-strip";
import { getMessages } from "@/lib/i18n/messages";

describe("DateStrip", () => {
  it("exposes selection and supports changing it", () => {
    const onSelect = vi.fn();
    render(
      <DateStrip
        dates={["2026-10-03", "2026-10-04"]}
        selectedDate="2026-10-03"
        locale="vi"
        messages={getMessages("vi")}
        onSelect={onSelect}
      />,
    );

    expect(screen.getAllByRole("option")[0]).toHaveAttribute("aria-selected", "true");
    fireEvent.click(screen.getAllByRole("option")[1]);
    expect(onSelect).toHaveBeenCalledWith("2026-10-04");
  });
});
