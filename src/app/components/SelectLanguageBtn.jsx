import { useLanguage } from "../LanguageContext";
const SelectLanguageBtn = () => {
  const { isEn, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="p-2 bg-gray-600 text-white rounded"
    >
      {isEn ? "Switch to German" : "Switch to English"}
    </button>
  );
};

export default SelectLanguageBtn;
