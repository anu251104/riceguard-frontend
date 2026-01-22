export const Slider = ({ min, max, step = 1, value, onChange }) => {
  const handleChange = (event) => {
    onChange(Number(event.target.value));
  };

  const progress = ((value - min) / (max - min)) * 100;

  return (
    <div className="relative">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className="relative h-1 w-full appearance-none rounded-full bg-[#1F242D] focus-visible:outline-none"
        style={{
          background: `linear-gradient(90deg, rgba(239,68,68,1) ${progress}%, rgba(31,36,45,1) ${progress}%)`,
        }}
      />
      <div className="mt-2 flex justify-between text-xs font-medium text-white/40">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
};
