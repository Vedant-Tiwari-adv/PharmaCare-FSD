export function BackgroundPattern() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="medical-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          {/* Pills pattern */}
          <circle cx="10" cy="10" r="3" fill="currentColor" />
          <circle cx="50" cy="50" r="3" fill="currentColor" />
          <circle cx="90" cy="90" r="3" fill="currentColor" />
          
          {/* Plus signs (medical cross) */}
          <g transform="translate(30, 70)">
            <rect x="-1" y="-5" width="2" height="10" fill="currentColor" />
            <rect x="-5" y="-1" width="10" height="2" fill="currentColor" />
          </g>
          
          <g transform="translate(70, 30)">
            <rect x="-1" y="-5" width="2" height="10" fill="currentColor" />
            <rect x="-5" y="-1" width="10" height="2" fill="currentColor" />
          </g>
        </pattern>
      </defs>
      <rect x="0" y="0" width="100%" height="100%" fill="url(#medical-pattern)" />
    </svg>
  );
}
