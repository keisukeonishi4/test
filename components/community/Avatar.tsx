// ユーザーのアイコン（仮）。装飾なので読み上げない
export function Avatar({ size = "size-11" }: { size?: string }) {
  return (
    <span aria-hidden="true" className={`flex shrink-0 items-center justify-center rounded-full bg-ph ${size}`}>
      <svg viewBox="0 0 24 24" className="size-1/2 text-strong" fill="currentColor">
        <circle cx="12" cy="9" r="4" />
        <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7z" />
      </svg>
    </span>
  );
}
