const Tooltip = ({ tooltip, className = "left-full top-1/2 -translate-y-1/2 ml-3" }) => (
    <div className={`absolute ${className} px-3 py-1 bg-[#2C2C2C] text-white text-xs rounded-md shadow-lg opacity-0 group-hover:opacity-100 hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none border border-white/10`}>
        {tooltip}
    </div>
);

export default Tooltip;
