interface AboutInfo {
  title: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const InputBox = ({ title, type,value,onChange }: AboutInfo) => {
  return (
    <div className=" space-y-3 pt-3 mt-3 mx-3">
      <label
        htmlFor="Username"
        className="relative block rounded-md border pt-2 border-gray-200 shadow-sm focus-within:border-blue-600 
        focus-within:ring-1 focus-within:ring-blue-600"
      >
        <input
          id="Username"
          className="peer border-none bg-transparent w-full p-3 placeholder-transparent focus:border-transparent
          focus:outline-none focus:ring-0"
          placeholder={title}
          value={value}
          onChange={onChange}
          type={type}
        />

        <span
          className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2
         bg-white dark:bg-black p-0.5 text-xs text-gray-700 dark:text-white transition-all peer-placeholder-shown:top-1/2 
         peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
        >
          {title}
        </span>
      </label>
    </div>
  );
};

export default InputBox;
