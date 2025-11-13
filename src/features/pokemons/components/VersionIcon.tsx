interface VersionIconProps {
  versionName: string;
  color?: 'blue' | 'red';
}

export const VersionIcon = ({ versionName, color = 'blue' }: VersionIconProps) => {
  const baseColor = color === 'blue' ? '#30A7D7' : '#EF5350';

  return (
    <span
      className="relative flex items-center justify-center transition-all rounded-full"
      aria-label={`Version: ${versionName}`}
      title={versionName}
      style={{
        width: '32px',
        height: '32px',
      }}>
      <div
        className="rounded-full flex items-center justify-center relative"
        style={{
          width: '32px',
          height: '32px',
          backgroundColor: baseColor,
        }}>
        <div
          className="absolute rounded-full border-2 border-white"
          style={{
            width: '24px',
            height: '24px',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}>
          <div
            className="absolute rounded-full border-white border-2"
            style={{
              width: '8px',
              height: '8px',
              backgroundColor: baseColor,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 2,
            }}
          />
          <div
            className="absolute bg-white"
            style={{
              width: '18px',
              height: '2px',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 1,
            }}
          />
        </div>
      </div>
    </span>
  );
};
